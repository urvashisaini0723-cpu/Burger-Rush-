import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  BURGER_RECIPE,
  WRONG_ITEMS,
  POWER_UPS,
  BURGER_LEVEL_RECIPES,
  getLevelBurger,
  FallingObject,
  FloatingText,
  GameScreen,
  IngredientId,
  WrongItemId,
  PowerUpId,
  ItemType,
} from './types';
import { sounds } from './utils/audio';
import { KitchenBackground } from './components/KitchenBackground';
import { BurgerCatcher } from './components/BurgerCatcher';
import { FoodGraphic } from './components/FoodGraphics';
import { HUD } from './components/HUD';
import { TouchControls } from './components/TouchControls';
import { CelebrationOverlay } from './components/CelebrationOverlay';
import { StartScreen } from './components/StartScreen';
import { LevelsModal } from './components/LevelsModal';
import { HowToPlayModal } from './components/HowToPlayModal';
import { SettingsModal } from './components/SettingsModal';
import { PauseModal } from './components/PauseModal';
import { GameOverModal } from './components/GameOverModal';

export default function App() {
  // Navigation & Screens
  const [screen, setScreen] = useState<GameScreen>('start');

  // Completed & Unlocked Levels State (persisted across sessions)
  const [completedLevels, setCompletedLevels] = useState<number[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('burger_rush_completed_levels');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) return parsed;
        }
      } catch {
        // ignore
      }
    }
    return [];
  });

  // All 10 levels are unlocked from the start (playable in any order)
  const [unlockedLevel, setUnlockedLevel] = useState<number>(10);

  const [selectedLevel, setSelectedLevel] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('burger_rush_selected_level');
      const num = saved ? parseInt(saved, 10) : 1;
      return num >= 1 && num <= 10 ? num : 1;
    }
    return 1;
  });

  // Gameplay State
  const [score, setScore] = useState<number>(0);
  const [level, setLevel] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('burger_rush_selected_level');
      const num = saved ? parseInt(saved, 10) : 1;
      return num >= 1 && num <= 10 ? num : 1;
    }
    return 1;
  });
  const [lives, setLives] = useState<number>(3);
  const [burgerProgress, setBurgerProgress] = useState<number>(0);
  const [burgersCompleted, setBurgersCompleted] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('burger_rush_highscore');
      return saved ? parseInt(saved, 10) || 0 : 0;
    }
    return 0;
  });
  const [isNewHighScore, setIsNewHighScore] = useState<boolean>(false);

  // Power-Ups Active Timers (in seconds)
  const [slowMoTime, setSlowMoTime] = useState<number>(0);
  const [doubleScoreTime, setDoubleScoreTime] = useState<number>(0);

  // Animations & Feedback
  const [catcherX, setCatcherX] = useState<number>(50); // percentage 0 to 100
  const [catcherBouncing, setCatcherBouncing] = useState<boolean>(false);
  const [catcherWrong, setCatcherWrong] = useState<boolean>(false);
  const [celebrating, setCelebrating] = useState<boolean>(false);
  const [celebrationBonus, setCelebrationBonus] = useState<number>(100);
  const [celebrationSpeedBonus, setCelebrationSpeedBonus] = useState<number>(0);
  const [levelUpToast, setLevelUpToast] = useState<boolean>(false);
  const [damageFlash, setDamageFlash] = useState<boolean>(false);

  // Sound & Audio Controls (Volume, SFX, BGM)
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => sounds.isSoundEnabled());
  const [musicEnabled, setMusicEnabled] = useState<boolean>(() => sounds.isMusicEnabled());
  const [volume, setVolumeState] = useState<number>(() => sounds.getVolume());

  useEffect(() => {
    return sounds.subscribe(() => {
      setSoundEnabled(sounds.isSoundEnabled());
      setMusicEnabled(sounds.isMusicEnabled());
      setVolumeState(sounds.getVolume());
    });
  }, []);

  // Falling Items & Floating Texts
  const [fallingItems, setFallingItems] = useState<FallingObject[]>([]);
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);

  // Current and Next Level Burger definitions (unique burger recipes per level)
  const currentBurger = useMemo(() => getLevelBurger(level), [level]);
  const nextBurger = useMemo(() => getLevelBurger(level + 1), [level]);
  const isFinalLevel = level >= BURGER_LEVEL_RECIPES.length;

  // Refs for Animation Frame Loop & High-Frequency State
  const gameStateRef = useRef({
    screen: 'start' as GameScreen,
    score: 0,
    level: 1,
    lives: 3,
    burgerProgress: 0,
    burgersCompleted: 0,
    catcherX: 50,
    slowMoActive: false,
    doubleScoreActive: false,
    lastSpawnTime: 0,
    spawnsSinceLastRequired: 0,
    roundStartTime: 0,
    celebrating: false,
  });

  // Track active input keys
  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const touchDirection = useRef<'left' | 'right' | null>(null);
  const arenaRef = useRef<HTMLDivElement | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const lastFrameTime = useRef<number>(performance.now());

  // Synchronize ref with React state
  useEffect(() => {
    gameStateRef.current.screen = screen;
    gameStateRef.current.score = score;
    gameStateRef.current.level = level;
    gameStateRef.current.lives = lives;
    gameStateRef.current.burgerProgress = burgerProgress;
    gameStateRef.current.burgersCompleted = burgersCompleted;
    gameStateRef.current.catcherX = catcherX;
    gameStateRef.current.slowMoActive = slowMoTime > 0;
    gameStateRef.current.doubleScoreActive = doubleScoreTime > 0;
    gameStateRef.current.celebrating = celebrating;
  }, [screen, score, level, lives, burgerProgress, burgersCompleted, catcherX, slowMoTime, doubleScoreTime, celebrating]);

  // Toggle Sound
  const handleToggleSound = useCallback(() => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sounds.setEnabled(next);
  }, [soundEnabled]);

  // Add Floating Text Feedback
  const addFloatingText = useCallback((text: string, x: number, y: number, type: FloatingText['type']) => {
    const id = `${Date.now()}_${Math.random()}`;
    setFloatingTexts((prev) => [...prev.slice(-8), { id, text, x, y, type, createdAt: Date.now() }]);
  }, []);

  // Clean up expired floating texts
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setFloatingTexts((prev) => prev.filter((ft) => now - ft.createdAt < 1000));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  // Power-up countdown intervals
  useEffect(() => {
    if (screen !== 'playing' || celebrating) return;

    const interval = setInterval(() => {
      setSlowMoTime((prev) => Math.max(0, prev - 0.1));
      setDoubleScoreTime((prev) => Math.max(0, prev - 0.1));
    }, 100);

    return () => clearInterval(interval);
  }, [screen, celebrating]);

  // Start / Play Game at specific level (DOES NOT RESET TO LEVEL 1)
  const startGame = useCallback((startAtLevel?: number) => {
    sounds.playButtonClick();
    const targetLevel = startAtLevel !== undefined ? startAtLevel : (selectedLevel || unlockedLevel || 1);

    setScore(0);
    setLevel(targetLevel);
    setSelectedLevel(targetLevel);
    setLives(3);
    setBurgerProgress(0);
    setBurgersCompleted(0);
    setIsNewHighScore(false);
    setSlowMoTime(0);
    setDoubleScoreTime(0);
    setFallingItems([]);
    setFloatingTexts([]);
    setCatcherX(50);
    setCelebrating(false);

    gameStateRef.current.score = 0;
    gameStateRef.current.level = targetLevel;
    gameStateRef.current.lives = 3;
    gameStateRef.current.burgerProgress = 0;
    gameStateRef.current.burgersCompleted = 0;
    gameStateRef.current.catcherX = 50;
    gameStateRef.current.lastSpawnTime = performance.now();
    gameStateRef.current.spawnsSinceLastRequired = 0;
    gameStateRef.current.roundStartTime = performance.now();
    gameStateRef.current.celebrating = false;

    setScreen('playing');
  }, [selectedLevel, unlockedLevel]);

  // Game Over Handler - keeps reached level!
  const triggerGameOver = useCallback((finalScore: number) => {
    sounds.playGameOver();
    setScreen('game_over');

    if (finalScore > highScore) {
      setHighScore(finalScore);
      setIsNewHighScore(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem('burger_rush_highscore', String(finalScore));
      }
    } else {
      setIsNewHighScore(false);
    }
  }, [highScore]);

  // Complete Burger Round -> Shows Level Complete Victory Menu (no black screen!)
  const handleBurgerCompleted = useCallback(() => {
    sounds.playPerfectBurger();
    setCelebrating(true);
    gameStateRef.current.celebrating = true;

    // Calculate speed bonus: completed in under 15 seconds
    const elapsedSeconds = (performance.now() - gameStateRef.current.roundStartTime) / 1000;
    let speedBonus = 0;
    if (elapsedSeconds < 10) {
      speedBonus = 50;
    } else if (elapsedSeconds < 16) {
      speedBonus = 25;
    }

    const roundBonus = 100;
    const totalBonus = roundBonus + speedBonus;
    setCelebrationBonus(roundBonus);
    setCelebrationSpeedBonus(speedBonus);

    const currentLvl = gameStateRef.current.level;
    const newScore = gameStateRef.current.score + totalBonus;
    const newCompleted = gameStateRef.current.burgersCompleted + 1;
    const nextLevel = currentLvl + 1;

    setScore(newScore);
    setBurgersCompleted(newCompleted);

    // Save completed level to state and localStorage (jo level complete ho gya h vo complete hi show ho)
    setCompletedLevels((prev) => {
      if (!prev.includes(currentLvl)) {
        const next = [...prev, currentLvl].sort((a, b) => a - b);
        if (typeof window !== 'undefined') {
          localStorage.setItem('burger_rush_completed_levels', JSON.stringify(next));
        }
        return next;
      }
      return prev;
    });

    const upcomingLevel = nextLevel <= BURGER_LEVEL_RECIPES.length ? nextLevel : 1;
    setSelectedLevel(upcomingLevel);
    if (typeof window !== 'undefined') {
      localStorage.setItem('burger_rush_selected_level', String(upcomingLevel));
    }

    // Update high score immediately if surpassed
    if (newScore > highScore) {
      setHighScore(newScore);
      if (typeof window !== 'undefined') {
        localStorage.setItem('burger_rush_highscore', String(newScore));
      }
    }

    // Clear falling items so nothing falls behind modal
    setFallingItems([]);
  }, [highScore]);

  // Spawn An Item for the current level's custom recipe!
  const spawnItem = useCallback((currentLevel: number, currentNeededIndex: number) => {
    const levelBurger = getLevelBurger(currentLevel);
    const currentNeededId = levelBurger.ingredients[currentNeededIndex] || levelBurger.ingredients[0];
    let type: ItemType = 'ingredient';
    let subId: string = currentNeededId;

    const rand = Math.random();
    const mustSpawnRequired = gameStateRef.current.spawnsSinceLastRequired >= 1;

    if (mustSpawnRequired || rand < 0.60) {
      // Spawn current required ingredient!
      type = 'ingredient';
      subId = currentNeededId;
      gameStateRef.current.spawnsSinceLastRequired = 0;
    } else if (rand < 0.88) {
      // Spawn wrong food item!
      type = 'wrong';
      const wrongChoice = WRONG_ITEMS[Math.floor(Math.random() * WRONG_ITEMS.length)];
      subId = wrongChoice.id;
      gameStateRef.current.spawnsSinceLastRequired += 1;
    } else if (rand < 0.96) {
      // Spawn lucky power-up!
      type = 'powerup';
      const powerChoices: PowerUpId[] = ['slow_mo', 'double_score'];
      // Only include extra life if lives < 3
      if (gameStateRef.current.lives < 3) {
        powerChoices.push('extra_life');
      }
      subId = powerChoices[Math.floor(Math.random() * powerChoices.length)];
      gameStateRef.current.spawnsSinceLastRequired += 1;
    } else {
      // Spawn other ingredient (acts as decoy if not currently needed)
      type = 'ingredient';
      const otherIngredients = levelBurger.ingredients.filter((id) => id !== currentNeededId);
      const chosenId =
        otherIngredients.length > 0
          ? otherIngredients[Math.floor(Math.random() * otherIngredients.length)]
          : 'tomato';
      subId = chosenId;
      gameStateRef.current.spawnsSinceLastRequired += 1;
    }

    // Random X between 8% and 92%
    const x = 8 + Math.random() * 84;
    // Speed increases slightly per level
    const baseSpeed = 0.28 + Math.min(currentLevel * 0.045, 0.45);

    const newItem: FallingObject = {
      id: `${Date.now()}_${Math.random()}`,
      type,
      subId,
      x,
      y: -8, // start above screen
      speed: baseSpeed,
      rotation: (Math.random() - 0.5) * 20,
      rotationSpeed: (Math.random() - 0.5) * 1.5,
      size: 58,
      wobblePhase: Math.random() * Math.PI * 2,
    };

    setFallingItems((prev) => [...prev, newItem]);
  }, []);

  // Main 60FPS Game Loop
  useEffect(() => {
    const loop = (currentTime: number) => {
      const deltaMs = Math.min(currentTime - lastFrameTime.current, 50); // cap delta to prevent leaps
      lastFrameTime.current = currentTime;

      if (gameStateRef.current.screen === 'playing' && !gameStateRef.current.celebrating) {
        // 1. Move Catcher based on active keyboard or touch buttons
        let moveDir = 0;
        if (keysPressed.current['ArrowLeft'] || keysPressed.current['a'] || keysPressed.current['A']) {
          moveDir -= 1;
        }
        if (keysPressed.current['ArrowRight'] || keysPressed.current['d'] || keysPressed.current['D']) {
          moveDir += 1;
        }
        if (touchDirection.current === 'left') {
          moveDir -= 1;
        } else if (touchDirection.current === 'right') {
          moveDir += 1;
        }

        if (moveDir !== 0) {
          const moveSpeed = 0.075 * deltaMs; // percentage units
          setCatcherX((prev) => {
            const next = Math.max(10, Math.min(90, prev + moveDir * moveSpeed));
            gameStateRef.current.catcherX = next;
            return next;
          });
        }

        // 2. Spawn Timer Check
        const lvl = gameStateRef.current.level;
        // Spawn rate speeds up gradually as level increases
        const spawnInterval = Math.max(750, 1450 - lvl * 70);
        if (currentTime - gameStateRef.current.lastSpawnTime > spawnInterval) {
          gameStateRef.current.lastSpawnTime = currentTime;
          spawnItem(lvl, gameStateRef.current.burgerProgress);
        }

        // 3. Update Falling Items & Handle Collisions
        const slowMoMultiplier = gameStateRef.current.slowMoActive ? 0.52 : 1.0;
        const catcherCenter = gameStateRef.current.catcherX;
        const catcherCatchY = 86; // Catch zone percentage
        const catcherHitRadius = 12; // Catcher catch radius in percentage
        const currentLvl = gameStateRef.current.level;
        const levelBurger = getLevelBurger(currentLvl);
        const requiredIndex = gameStateRef.current.burgerProgress;
        const requiredIngId = levelBurger.ingredients[requiredIndex];

        setFallingItems((prevItems) => {
          const survivingItems: FallingObject[] = [];

          for (const item of prevItems) {
            // Calculate new position
            const speedFactor = item.speed * slowMoMultiplier * (deltaMs / 16.66);
            const newY = item.y + speedFactor;
            const newRotation = item.rotation + item.rotationSpeed * (deltaMs / 16.66);

            // A. Check Collision with Catcher
            // Item reaches catch zone (between 80% and 92%)
            const isInCatchZone = newY >= 80 && newY <= 92;
            const horizontalDist = Math.abs(item.x - catcherCenter);
            const isCaught = isInCatchZone && horizontalDist <= catcherHitRadius;

            if (isCaught) {
              // Bounced catcher
              setCatcherBouncing(true);
              setTimeout(() => setCatcherBouncing(false), 200);

              if (item.type === 'ingredient') {
                if (item.subId === requiredIngId) {
                  // CORRECT INGREDIENT!
                  sounds.playCorrectCatch();
                  const scoreMultiplier = gameStateRef.current.doubleScoreActive ? 2 : 1;
                  const pts = 20 * scoreMultiplier;

                  setScore((s) => {
                    const updated = s + pts;
                    gameStateRef.current.score = updated;
                    return updated;
                  });

                  addFloatingText(`+${pts} GOOD!`, item.x, 78, 'correct');

                  const nextProgress = requiredIndex + 1;
                  setBurgerProgress(nextProgress);
                  gameStateRef.current.burgerProgress = nextProgress;

                  // Check if burger task is completed!
                  if (nextProgress >= levelBurger.ingredients.length) {
                    handleBurgerCompleted();
                  }
                } else {
                  // Wrong ingredient order (caught premature ingredient)
                  sounds.playWrongCatch();
                  setCatcherWrong(true);
                  setTimeout(() => setCatcherWrong(false), 300);

                  setScore((s) => {
                    const updated = Math.max(0, s - 10);
                    gameStateRef.current.score = updated;
                    return updated;
                  });
                  addFloatingText('-10 WRONG!', item.x, 78, 'wrong');
                }
              } else if (item.type === 'wrong') {
                // Caught junk/wrong item (pizza, fries, soda, etc.)
                sounds.playWrongCatch();
                setCatcherWrong(true);
                setTimeout(() => setCatcherWrong(false), 300);

                setScore((s) => {
                  const updated = Math.max(0, s - 10);
                  gameStateRef.current.score = updated;
                  return updated;
                });
                addFloatingText('-10 WRONG!', item.x, 78, 'wrong');
              } else if (item.type === 'powerup') {
                // Caught a power-up!
                sounds.playPowerUp();
                if (item.subId === 'slow_mo') {
                  setSlowMoTime(5);
                  addFloatingText('⚡ SLOW MOTION (5s)!', item.x, 78, 'powerup');
                } else if (item.subId === 'double_score') {
                  setDoubleScoreTime(10);
                  addFloatingText('⭐ 2X SCORE (10s)!', item.x, 78, 'powerup');
                } else if (item.subId === 'extra_life') {
                  setLives((l) => {
                    const nextLives = Math.min(3, l + 1);
                    gameStateRef.current.lives = nextLives;
                    return nextLives;
                  });
                  addFloatingText('❤️ EXTRA LIFE!', item.x, 78, 'life');
                }
              }

              // Do not keep caught item in surviving array
              continue;
            }

            // B. Check if item reached the bottom (> 98%)
            if (newY > 98) {
              // If it was the CURRENT REQUIRED ingredient and player missed it -> Lose 1 Life!
              if (item.type === 'ingredient' && item.subId === requiredIngId) {
                sounds.playLifeLost();
                setDamageFlash(true);
                setTimeout(() => setDamageFlash(false), 300);

                addFloatingText('MISSED! 💔', item.x, 92, 'wrong');

                const newLives = gameStateRef.current.lives - 1;
                setLives(newLives);
                gameStateRef.current.lives = newLives;

                if (newLives <= 0) {
                  triggerGameOver(gameStateRef.current.score);
                  return [];
                }
              }
              // Item falls off screen, do not survive
              continue;
            }

            // Still in flight
            survivingItems.push({
              ...item,
              y: newY,
              rotation: newRotation,
            });
          }

          return survivingItems;
        });
      }

      animationFrameId.current = requestAnimationFrame(loop);
    };

    animationFrameId.current = requestAnimationFrame(loop);
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [handleBurgerCompleted, spawnItem, triggerGameOver, addFloatingText]);

  // Keyboard Event Listeners for Desktop
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'p' || e.key === 'P') {
        if (screen === 'playing') {
          setScreen('paused');
        } else if (screen === 'paused') {
          setScreen('playing');
        }
        return;
      }
      keysPressed.current[e.key] = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [screen]);

  // Mouse & Touch Arena Tracking (smooth direct drag / slide movement)
  const handleArenaPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (screen !== 'playing' || celebrating) return;
    if (!arenaRef.current) return;

    const rect = arenaRef.current.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const percentX = (relativeX / rect.width) * 100;
    const clamped = Math.max(10, Math.min(90, percentX));

    setCatcherX(clamped);
    gameStateRef.current.catcherX = clamped;
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden flex flex-col justify-between bg-stone-950 font-['Fredoka']">
      {/* Red Damage Flash Screen Vignette */}
      {damageFlash && (
        <div className="absolute inset-0 z-40 bg-red-600/30 pointer-events-none transition-opacity duration-300 animate-pulse" />
      )}

      {/* Level Up Banner Toast */}
      {levelUpToast && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-40 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 text-amber-950 font-black text-xl sm:text-2xl px-6 py-2.5 rounded-full border-4 border-amber-600 shadow-2xl animate-bounce flex items-center gap-2">
          <span>🎉</span> LEVEL UP! LEVEL {level} <span>🚀</span>
        </div>
      )}

      {/* Background */}
      <KitchenBackground />

      {/* Top HUD (only visible during playing or paused) */}
      {(screen === 'playing' || screen === 'paused') && (
        <HUD
          score={score}
          level={level}
          lives={lives}
          burgerProgress={burgerProgress}
          highScore={highScore}
          volume={volume}
          musicEnabled={musicEnabled}
          soundEnabled={soundEnabled}
          slowMoRemaining={slowMoTime}
          doubleScoreRemaining={doubleScoreTime}
          currentBurger={currentBurger}
          onVolumeChange={(val) => sounds.setVolume(val)}
          onVolumeDown={() => sounds.volumeDown()}
          onVolumeUp={() => sounds.volumeUp()}
          onToggleMusic={() => sounds.toggleMusic()}
          onToggleSound={handleToggleSound}
          onPause={() => setScreen('paused')}
        />
      )}

      {/* GAME PLAY ARENA */}
      <div
        ref={arenaRef}
        id="game-arena"
        onPointerMove={handleArenaPointerMove}
        onPointerDown={handleArenaPointerMove}
        className="relative flex-1 w-full max-w-2xl mx-auto overflow-hidden touch-none select-none cursor-crosshair"
      >
        {/* Falling Food Items */}
        {(screen === 'playing' || screen === 'paused') &&
          fallingItems.map((item) => {
            const isCurrentTarget =
              item.type === 'ingredient' &&
              item.subId === currentBurger.ingredients[burgerProgress];

            return (
              <div
                key={item.id}
                className="absolute pointer-events-none transition-transform will-change-transform"
                style={{
                  left: `${item.x}%`,
                  top: `${item.y}%`,
                  transform: `translate(-50%, -50%) rotate(${item.rotation}deg)`,
                }}
              >
                <div className="relative flex flex-col items-center">
                  <FoodGraphic id={item.subId} size={item.size} />
                  {/* Visual glow indicator for target burger ingredient */}
                  {isCurrentTarget && (
                    <div className="absolute -inset-2.5 rounded-full border-2 border-amber-300/90 bg-amber-400/25 shadow-[0_0_12px_rgba(251,191,36,0.6)] animate-pulse -z-10" />
                  )}
                  {/* Visual glow indicator for power-ups */}
                  {item.type === 'powerup' && (
                    <div className="absolute -inset-2 bg-yellow-300/30 rounded-full blur-sm -z-10 animate-ping" />
                  )}
                </div>
              </div>
            );
          })}

        {/* Floating Feedback Texts (+20 GOOD!, -10 WRONG!, etc.) */}
        {floatingTexts.map((ft) => (
          <div
            key={ft.id}
            className={`absolute z-30 font-black text-sm sm:text-lg drop-shadow-md pointer-events-none animate-float-up ${
              ft.type === 'correct'
                ? 'text-emerald-300'
                : ft.type === 'bonus'
                ? 'text-yellow-300 text-xl font-black'
                : ft.type === 'life'
                ? 'text-rose-400'
                : ft.type === 'powerup'
                ? 'text-cyan-300'
                : 'text-rose-400'
            }`}
            style={{
              left: `${ft.x}%`,
              top: `${ft.y}%`,
            }}
          >
            {ft.text}
          </div>
        ))}

        {/* Burger Catcher Tray at Bottom with custom level recipe stacking */}
        {(screen === 'playing' || screen === 'paused') && (
          <BurgerCatcher
            xPercent={catcherX}
            burgerProgress={burgerProgress}
            recipe={currentBurger.ingredients}
            isBouncing={catcherBouncing}
            isWrong={catcherWrong}
          />
        )}

        {/* START SCREEN */}
        {(screen === 'start' || screen === 'levels') && (
          <StartScreen
            highScore={highScore}
            unlockedLevel={unlockedLevel}
            completedLevels={completedLevels}
            selectedLevel={selectedLevel}
            onSelectLevel={(lvl) => {
              setSelectedLevel(lvl);
              if (typeof window !== 'undefined') {
                localStorage.setItem('burger_rush_selected_level', String(lvl));
              }
            }}
            onOpenLevels={() => setScreen('levels')}
            onPlay={(startAtLvl) => startGame(startAtLvl)}
            onHowToPlay={() => setScreen('how_to_play')}
            onSettings={() => setScreen('settings')}
          />
        )}
      </div>

      {/* MOBILE / TABLET TOUCH CONTROLS (Pinned at Bottom) */}
      {(screen === 'playing' || screen === 'paused') && (
        <TouchControls
          onMoveLeftStart={() => {
            touchDirection.current = 'left';
          }}
          onMoveLeftEnd={() => {
            if (touchDirection.current === 'left') {
              touchDirection.current = null;
            }
          }}
          onMoveRightStart={() => {
            touchDirection.current = 'right';
          }}
          onMoveRightEnd={() => {
            if (touchDirection.current === 'right') {
              touchDirection.current = null;
            }
          }}
        />
      )}

      {/* CELEBRATION OVERLAY (LEVEL COMPLETE VICTORY MENU - NO BLACK SCREEN!) */}
      {celebrating && (
        <CelebrationOverlay
          bonus={celebrationBonus}
          speedBonus={celebrationSpeedBonus}
          level={level}
          currentBurger={currentBurger}
          nextBurger={nextBurger}
          isFinalLevel={isFinalLevel}
          onNextLevel={() => {
            setCelebrating(false);
            gameStateRef.current.celebrating = false;
            const nextLvl = level < BURGER_LEVEL_RECIPES.length ? level + 1 : 1;
            startGame(nextLvl);
          }}
          onPlayRandomLevel={() => {
            setCelebrating(false);
            gameStateRef.current.celebrating = false;
            const available = Array.from({ length: BURGER_LEVEL_RECIPES.length }, (_, i) => i + 1).filter((l) => l !== level);
            const randomLvl = available.length > 0 ? available[Math.floor(Math.random() * available.length)] : 1;
            startGame(randomLvl);
          }}
          onRetryLevel={() => {
            setCelebrating(false);
            gameStateRef.current.celebrating = false;
            startGame(level);
          }}
          onHome={() => {
            setCelebrating(false);
            gameStateRef.current.celebrating = false;
            const nextLvl = level < BURGER_LEVEL_RECIPES.length ? level + 1 : 1;
            setSelectedLevel(nextLvl);
            setScreen('start');
          }}
        />
      )}

      {/* HOW TO PLAY MODAL */}
      {screen === 'how_to_play' && (
        <HowToPlayModal onClose={() => setScreen('start')} />
      )}

      {/* LEVELS MODAL (OPENS FROM YELLOW BUTTON ON HOME PAGE) */}
      {screen === 'levels' && (
        <LevelsModal
          unlockedLevel={unlockedLevel}
          selectedLevel={selectedLevel}
          completedLevels={completedLevels}
          onSelectLevel={(lvl) => {
            setSelectedLevel(lvl);
            if (typeof window !== 'undefined') {
              localStorage.setItem('burger_rush_selected_level', String(lvl));
            }
          }}
          onPlayLevel={(lvl) => {
            setSelectedLevel(lvl);
            if (typeof window !== 'undefined') {
              localStorage.setItem('burger_rush_selected_level', String(lvl));
            }
            startGame(lvl);
          }}
          onClose={() => setScreen('start')}
        />
      )}

      {/* SETTINGS MODAL */}
      {screen === 'settings' && (
        <SettingsModal
          soundEnabled={soundEnabled}
          highScore={highScore}
          selectedLevel={selectedLevel}
          onToggleSound={handleToggleSound}
          onResetHighScore={() => {
            setHighScore(0);
            if (typeof window !== 'undefined') {
              localStorage.removeItem('burger_rush_highscore');
            }
          }}
          onResetProgress={() => {
            setCompletedLevels([]);
            setSelectedLevel(1);
            setLevel(1);
            if (typeof window !== 'undefined') {
              localStorage.removeItem('burger_rush_completed_levels');
              localStorage.setItem('burger_rush_selected_level', '1');
            }
          }}
          onClose={() => setScreen('start')}
        />
      )}

      {/* PAUSE MODAL */}
      {screen === 'paused' && (
        <PauseModal
          volume={volume}
          musicEnabled={musicEnabled}
          soundEnabled={soundEnabled}
          onVolumeChange={(val) => sounds.setVolume(val)}
          onVolumeDown={() => sounds.volumeDown()}
          onVolumeUp={() => sounds.volumeUp()}
          onToggleMusic={() => sounds.toggleMusic()}
          onToggleSound={handleToggleSound}
          onResume={() => setScreen('playing')}
          onRestart={() => startGame(level)}
          onMainMenu={() => {
            setSelectedLevel(level);
            setScreen('start');
          }}
        />
      )}

      {/* GAME OVER MODAL */}
      {screen === 'game_over' && (
        <GameOverModal
          score={score}
          highScore={highScore}
          isNewHighScore={isNewHighScore}
          burgersCompleted={burgersCompleted}
          highestLevel={level}
          onPlayAgain={() => startGame(level)}
          onMainMenu={() => {
            setSelectedLevel(level);
            setScreen('start');
          }}
        />
      )}
    </main>
  );
}
