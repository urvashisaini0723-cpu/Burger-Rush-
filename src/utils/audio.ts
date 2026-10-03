class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private musicGain: GainNode | null = null;

  private soundEnabled: boolean = true;
  private musicEnabled: boolean = true;
  private volume: number = 70; // 0 to 100

  // Music sequencer state
  private musicIntervalId: number | null = null;
  private musicStep: number = 0;
  private isMusicPlaying: boolean = false;

  // Listeners for state change
  private listeners: Array<() => void> = [];

  constructor() {
    if (typeof window !== 'undefined') {
      const savedSound = localStorage.getItem('burger_rush_sound');
      this.soundEnabled = savedSound !== null ? savedSound === 'true' : true;

      const savedMusic = localStorage.getItem('burger_rush_music');
      this.musicEnabled = savedMusic !== null ? savedMusic === 'true' : true;

      const savedVol = localStorage.getItem('burger_rush_volume');
      this.volume = savedVol !== null ? Math.max(0, Math.min(100, parseInt(savedVol, 10) || 70)) : 70;
    }
  }

  public subscribe(fn: () => void) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== fn);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => fn());
  }

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();

        // Master Gain
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.volume / 100, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);

        // SFX Gain
        this.sfxGain = this.ctx.createGain();
        this.sfxGain.gain.setValueAtTime(this.soundEnabled ? 1.0 : 0.0, this.ctx.currentTime);
        this.sfxGain.connect(this.masterGain);

        // Music Gain (kept soft & melodic)
        this.musicGain = this.ctx.createGain();
        this.musicGain.gain.setValueAtTime(this.musicEnabled ? 0.35 : 0.0, this.ctx.currentTime);
        this.musicGain.connect(this.masterGain);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Volume Controls (0 to 100)
  public getVolume(): number {
    return this.volume;
  }

  public setVolume(newVol: number) {
    this.volume = Math.max(0, Math.min(100, Math.round(newVol)));
    if (typeof window !== 'undefined') {
      localStorage.setItem('burger_rush_volume', String(this.volume));
    }
    if (this.ctx && this.masterGain) {
      this.masterGain.gain.setValueAtTime(this.volume / 100, this.ctx.currentTime);
    }
    this.notify();
  }

  // Volume Kam (Down)
  public volumeDown(step: number = 10) {
    this.setVolume(this.volume - step);
    this.playButtonClick();
  }

  // Volume Jada (Up)
  public volumeUp(step: number = 10) {
    this.setVolume(this.volume + step);
    this.playButtonClick();
  }

  // SFX Toggle
  public isSoundEnabled(): boolean {
    return this.soundEnabled;
  }

  public setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('burger_rush_sound', String(enabled));
    }
    if (this.ctx && this.sfxGain) {
      this.sfxGain.gain.setValueAtTime(enabled ? 1.0 : 0.0, this.ctx.currentTime);
    }
    if (enabled) {
      this.initCtx();
      this.playButtonClick();
    }
    this.notify();
  }

  public toggleSound(): boolean {
    const next = !this.soundEnabled;
    this.setSoundEnabled(next);
    return next;
  }

  // Music Toggle
  public isMusicEnabled(): boolean {
    return this.musicEnabled;
  }

  public setMusicEnabled(enabled: boolean) {
    this.musicEnabled = enabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('burger_rush_music', String(enabled));
    }
    if (this.ctx && this.musicGain) {
      this.musicGain.gain.setValueAtTime(enabled ? 0.35 : 0.0, this.ctx.currentTime);
    }
    if (enabled) {
      this.initCtx();
      this.startMusic();
    } else {
      this.pauseMusic();
    }
    this.notify();
  }

  public toggleMusic(): boolean {
    const next = !this.musicEnabled;
    this.setMusicEnabled(next);
    return next;
  }

  // Backward compatibility alias
  public isEnabled(): boolean {
    return this.soundEnabled;
  }

  public setEnabled(enabled: boolean) {
    this.setSoundEnabled(enabled);
  }

  // BACKGROUND MUSIC SEQUENCER (Retro Diner Chiptune Loop)
  public startMusic() {
    if (!this.musicEnabled) return;
    this.initCtx();
    if (!this.ctx || this.isMusicPlaying) return;

    this.isMusicPlaying = true;
    const tempoBpm = 132;
    const stepDurationMs = (60 / tempoBpm / 2) * 1000; // 8th note steps (~227ms)

    // Joyful melodic scale frequencies (C major / A minor upbeat diner motif)
    const melodyNotes = [
      523.25, 0, 659.25, 783.99, 880.0, 783.99, 659.25, 587.33,
      523.25, 0, 659.25, 0, 783.99, 880.0, 987.77, 1046.5,
      880.0, 0, 698.46, 783.99, 659.25, 0, 523.25, 587.33,
      659.25, 587.33, 523.25, 440.0, 493.88, 587.33, 523.25, 0,
    ];

    const bassNotes = [
      130.81, 0, 130.81, 196.0, 110.0, 0, 110.0, 164.81,
      87.31, 0, 87.31, 130.81, 98.0, 0, 98.0, 146.83,
      130.81, 0, 130.81, 196.0, 110.0, 0, 110.0, 164.81,
      87.31, 0, 87.31, 130.81, 98.0, 0, 98.0, 146.83,
    ];

    this.musicIntervalId = window.setInterval(() => {
      if (!this.ctx || !this.musicGain || !this.musicEnabled) return;

      const t = this.ctx.currentTime;
      const step = this.musicStep % melodyNotes.length;
      this.musicStep++;

      const freqMelody = melodyNotes[step];
      const freqBass = bassNotes[step];

      // Play melody note
      if (freqMelody > 0) {
        const osc = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freqMelody, t);

        noteGain.gain.setValueAtTime(0.2, t);
        noteGain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

        osc.connect(noteGain);
        noteGain.connect(this.musicGain);

        osc.start(t);
        osc.stop(t + 0.19);
      }

      // Play bass note
      if (freqBass > 0) {
        const bassOsc = this.ctx.createOscillator();
        const bassGain = this.ctx.createGain();

        bassOsc.type = 'sine';
        bassOsc.frequency.setValueAtTime(freqBass, t);

        bassGain.gain.setValueAtTime(0.25, t);
        bassGain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

        bassOsc.connect(bassGain);
        bassGain.connect(this.musicGain);

        bassOsc.start(t);
        bassOsc.stop(t + 0.23);
      }

      // Soft hi-hat tick every 2 steps
      if (step % 2 === 0) {
        const tickOsc = this.ctx.createOscillator();
        const tickGain = this.ctx.createGain();

        tickOsc.type = 'square';
        tickOsc.frequency.setValueAtTime(2400, t);
        tickOsc.frequency.exponentialRampToValueAtTime(800, t + 0.02);

        tickGain.gain.setValueAtTime(0.03, t);
        tickGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.03);

        tickOsc.connect(tickGain);
        tickGain.connect(this.musicGain);

        tickOsc.start(t);
        tickOsc.stop(t + 0.03);
      }
    }, stepDurationMs);
  }

  public pauseMusic() {
    if (this.musicIntervalId !== null) {
      clearInterval(this.musicIntervalId);
      this.musicIntervalId = null;
    }
    this.isMusicPlaying = false;
  }

  public resumeMusic() {
    if (this.musicEnabled && !this.isMusicPlaying) {
      this.startMusic();
    }
  }

  // SOUND EFFECTS (connected to sfxGain)

  // Pop sound for correct catch
  public playCorrectCatch() {
    if (!this.soundEnabled) return;
    this.initCtx();
    if (!this.ctx || !this.sfxGain) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(420, t);
    osc.frequency.exponentialRampToValueAtTime(820, t + 0.09);

    gain.gain.setValueAtTime(0.35, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.13);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(t);
    osc.stop(t + 0.13);
  }

  // Bonk/buzz sound for wrong catch
  public playWrongCatch() {
    if (!this.soundEnabled) return;
    this.initCtx();
    if (!this.ctx || !this.sfxGain) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(170, t);
    osc.frequency.linearRampToValueAtTime(80, t + 0.18);

    gain.gain.setValueAtTime(0.35, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(t);
    osc.stop(t + 0.2);
  }

  // Lost life sound (warning buzz)
  public playLifeLost() {
    if (!this.soundEnabled) return;
    this.initCtx();
    if (!this.ctx || !this.sfxGain) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(280, t);
    osc.frequency.linearRampToValueAtTime(110, t + 0.3);

    gain.gain.setValueAtTime(0.4, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(t);
    osc.stop(t + 0.35);
  }

  // Perfect Burger celebration fanfare
  public playPerfectBurger() {
    if (!this.soundEnabled) return;
    this.initCtx();
    if (!this.ctx || !this.sfxGain) return;

    const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5
    const t = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      if (!this.ctx || !this.sfxGain) return;
      const noteStart = t + idx * 0.08;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, noteStart);

      gain.gain.setValueAtTime(0.32, noteStart);
      gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.35);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(noteStart);
      osc.stop(noteStart + 0.35);
    });
  }

  // Level Up sound
  public playLevelUp() {
    if (!this.soundEnabled) return;
    this.initCtx();
    if (!this.ctx || !this.sfxGain) return;

    const t = this.ctx.currentTime;
    const chords = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    chords.forEach((freq, i) => {
      if (!this.ctx || !this.sfxGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t + i * 0.06);

      gain.gain.setValueAtTime(0.3, t + i * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.06 + 0.25);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t + i * 0.06);
      osc.stop(t + i * 0.06 + 0.25);
    });
  }

  // Power-up collected sound
  public playPowerUp() {
    if (!this.soundEnabled) return;
    this.initCtx();
    if (!this.ctx || !this.sfxGain) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(500, t);
    osc.frequency.exponentialRampToValueAtTime(1200, t + 0.16);

    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(t);
    osc.stop(t + 0.22);
  }

  // Game over sound
  public playGameOver() {
    if (!this.soundEnabled) return;
    this.initCtx();
    if (!this.ctx || !this.sfxGain) return;

    const t = this.ctx.currentTime;
    const notes = [392, 349.23, 329.63, 261.63]; // G4, F4, E4, C4
    notes.forEach((freq, i) => {
      if (!this.ctx || !this.sfxGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t + i * 0.18);

      gain.gain.setValueAtTime(0.3, t + i * 0.18);
      gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.18 + 0.4);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t + i * 0.18);
      osc.stop(t + i * 0.18 + 0.4);
    });
  }

  // UI click sound
  public playButtonClick() {
    if (!this.soundEnabled) return;
    this.initCtx();
    if (!this.ctx || !this.sfxGain) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, t);
    osc.frequency.exponentialRampToValueAtTime(400, t + 0.04);

    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(t);
    osc.stop(t + 0.05);
  }
}

export const sounds = new SoundEngine();
