export type IngredientId =
  | 'bottom_bun'
  | 'lettuce'
  | 'tomato'
  | 'cheese'
  | 'patty'
  | 'top_bun';

export type WrongItemId =
  | 'pizza'
  | 'fries'
  | 'apple'
  | 'soda'
  | 'donut'
  | 'chilli';

export type PowerUpId = 'slow_mo' | 'extra_life' | 'double_score';

export type ItemType = 'ingredient' | 'wrong' | 'powerup';

export interface IngredientDef {
  id: IngredientId;
  name: string;
  emoji: string;
  color: string;
  description: string;
}

export interface WrongItemDef {
  id: WrongItemId;
  name: string;
  emoji: string;
  color: string;
}

export interface PowerUpDef {
  id: PowerUpId;
  name: string;
  emoji: string;
  color: string;
  durationMs: number;
  description: string;
}

export const BURGER_RECIPE: IngredientDef[] = [
  { id: 'bottom_bun', name: 'Bottom Bun', emoji: '🍞', color: '#E5A65D', description: 'Toasted bun base' },
  { id: 'lettuce', name: 'Crispy Lettuce', emoji: '🥬', color: '#4ADE80', description: 'Fresh curly greens' },
  { id: 'tomato', name: 'Juicy Tomato', emoji: '🍅', color: '#EF4444', description: 'Ripe red slice' },
  { id: 'cheese', name: 'Cheddar Cheese', emoji: '🧀', color: '#FACC15', description: 'Melted golden slice' },
  { id: 'patty', name: 'Grilled Patty', emoji: '🍖', color: '#78350F', description: 'Savory grilled beef' },
  { id: 'top_bun', name: 'Sesame Top Bun', emoji: '🍞', color: '#D97706', description: 'Golden seeded crown' },
];

export const INGREDIENTS_MAP: Record<IngredientId, IngredientDef> = {
  bottom_bun: { id: 'bottom_bun', name: 'Bottom Bun', emoji: '🍞', color: '#E5A65D', description: 'Toasted bun base' },
  lettuce: { id: 'lettuce', name: 'Crispy Lettuce', emoji: '🥬', color: '#4ADE80', description: 'Fresh curly greens' },
  tomato: { id: 'tomato', name: 'Juicy Tomato', emoji: '🍅', color: '#EF4444', description: 'Ripe red slice' },
  cheese: { id: 'cheese', name: 'Cheddar Cheese', emoji: '🧀', color: '#FACC15', description: 'Melted golden slice' },
  patty: { id: 'patty', name: 'Grilled Patty', emoji: '🍖', color: '#78350F', description: 'Savory grilled beef' },
  top_bun: { id: 'top_bun', name: 'Sesame Top Bun', emoji: '🍞', color: '#D97706', description: 'Golden seeded crown' },
};

export interface BurgerLevelDef {
  level: number;
  name: string;
  badgeEmoji: string;
  taskGoal: string;
  tagline?: string;
  ingredients: IngredientId[];
  description: string;
  themeColor: string;
}

export const BURGER_LEVEL_RECIPES: BurgerLevelDef[] = [
  {
    level: 1,
    name: 'Classic Cheeseburger',
    badgeEmoji: '🍔',
    taskGoal: 'Task: 5 layers - Bun, Crisp Lettuce, Cheddar, Patty & Top Bun!',
    ingredients: ['bottom_bun', 'lettuce', 'cheese', 'patty', 'top_bun'],
    description: 'Learn the fundamentals of burger craft with the legendary classic single.',
    themeColor: '#10B981',
  },
  {
    level: 2,
    name: 'Garden Fresh Deluxe',
    badgeEmoji: '🥗',
    taskGoal: 'Task: 6 layers - Add juicy red tomato slice into the fresh garden stack!',
    ingredients: ['bottom_bun', 'lettuce', 'tomato', 'cheese', 'patty', 'top_bun'],
    description: 'Farm-fresh crunch! Watch out for incoming junk snacks and decoys.',
    themeColor: '#3B82F6',
  },
  {
    level: 3,
    name: 'Double Cheesy Melt',
    badgeEmoji: '🧀',
    taskGoal: 'Task: 6 layers - Double cheese blanket hugging the savory patty!',
    ingredients: ['bottom_bun', 'cheese', 'patty', 'cheese', 'lettuce', 'top_bun'],
    description: 'Golden melted cheddar on both sides of the grilled patty for cheese lovers!',
    themeColor: '#F59E0B',
  },
  {
    level: 4,
    name: 'Double Decker Patty Feast',
    badgeEmoji: '🥩',
    taskGoal: 'Task: 7 layers - Stack TWO savory grilled meat patties with greens & tomato!',
    ingredients: ['bottom_bun', 'patty', 'cheese', 'lettuce', 'patty', 'tomato', 'top_bun'],
    description: 'A heavyweight burger for hungry customers! Double the meat, double the focus.',
    themeColor: '#EF4444',
  },
  {
    level: 5,
    name: 'The Big BBQ Tower',
    badgeEmoji: '🔥',
    taskGoal: 'Task: 7 layers - High speed BBQ flame stack with double cheese layers!',
    ingredients: ['bottom_bun', 'lettuce', 'cheese', 'patty', 'tomato', 'cheese', 'top_bun'],
    description: 'Flames are blazing hot! Use power-ups like Slow-Mo to maintain control.',
    themeColor: '#F97316',
  },
  {
    level: 6,
    name: 'Supreme Deluxe Stack',
    badgeEmoji: '👑',
    taskGoal: 'Task: 8 layers - 2x Patties, crisp double lettuce and melted cheddar!',
    ingredients: ['bottom_bun', 'lettuce', 'tomato', 'patty', 'cheese', 'lettuce', 'patty', 'top_bun'],
    description: 'Eight magnificent layers of pure culinary perfection at superfast speed!',
    themeColor: '#8B5CF6',
  },
  {
    level: 7,
    name: 'Spicy Monster King',
    badgeEmoji: '⚡',
    taskGoal: 'Task: 8 layers - Extreme fast drops! Stack dual patties & rich toppings!',
    ingredients: ['bottom_bun', 'cheese', 'patty', 'tomato', 'lettuce', 'cheese', 'patty', 'top_bun'],
    description: 'Kitchen pandemonium! Quick reflexes needed to catch exact falling ingredients.',
    themeColor: '#EC4899',
  },
  {
    level: 8,
    name: 'Royal Triple Tower',
    badgeEmoji: '🥓',
    taskGoal: 'Task: 9 layers - Triple grilled patties stacked with rich cheddar & fresh salad!',
    ingredients: ['bottom_bun', 'lettuce', 'patty', 'cheese', 'patty', 'tomato', 'patty', 'cheese', 'top_bun'],
    description: 'Triple the patties! Three hefty meats layered with melted cheese and fresh crisp lettuce.',
    themeColor: '#D97706',
  },
  {
    level: 9,
    name: 'Grand Gourmet Masterpiece',
    badgeEmoji: '💎',
    taskGoal: 'Task: 9 layers - Artisanal balance of double cheese, dual greens & juicy meats!',
    ingredients: ['bottom_bun', 'cheese', 'lettuce', 'patty', 'tomato', 'cheese', 'patty', 'lettuce', 'top_bun'],
    description: 'Chef signature special! Demands split-second reflex timing to assemble.',
    themeColor: '#059669',
  },
  {
    level: 10,
    name: 'The Ultimate Burger Legend',
    badgeEmoji: '🏆',
    taskGoal: 'Task: 10 layers - The Grand 10-Layer Royal Colossus of Legends!',
    ingredients: ['bottom_bun', 'lettuce', 'cheese', 'patty', 'tomato', 'cheese', 'patty', 'lettuce', 'patty', 'top_bun'],
    description: 'The crowning pinnacle of Burger Rush. Catch all 10 layers in sequence to win the game!',
    themeColor: '#F43F5E',
  },
];

export function getLevelBurger(level: number): BurgerLevelDef {
  const index = Math.max(1, Math.min(level, BURGER_LEVEL_RECIPES.length)) - 1;
  return BURGER_LEVEL_RECIPES[index] || BURGER_LEVEL_RECIPES[0];
}

export const WRONG_ITEMS: WrongItemDef[] = [
  { id: 'pizza', name: 'Pizza Slice', emoji: '🍕', color: '#F97316' },
  { id: 'fries', name: 'French Fries', emoji: '🍟', color: '#FBBF24' },
  { id: 'apple', name: 'Red Apple', emoji: '🍎', color: '#DC2626' },
  { id: 'soda', name: 'Fizzy Soda', emoji: '🥤', color: '#38BDF8' },
  { id: 'donut', name: 'Glazed Donut', emoji: '🍩', color: '#EC4899' },
  { id: 'chilli', name: 'Spicy Chilli', emoji: '🌶️', color: '#E11D48' },
];

export const POWER_UPS: PowerUpDef[] = [
  { id: 'slow_mo', name: 'Slow Motion', emoji: '⚡', color: '#06B6D4', durationMs: 5000, description: 'Slows falling items for 5s' },
  { id: 'extra_life', name: 'Extra Life', emoji: '❤️', color: '#EF4444', durationMs: 0, description: 'Adds +1 life (max 3)' },
  { id: 'double_score', name: 'Double Score', emoji: '⭐', color: '#F59E0B', durationMs: 10000, description: '2x points for 10s' },
];

export interface FallingObject {
  id: string;
  type: ItemType;
  subId: string;
  x: number; // percentage 5% to 95%
  y: number; // percentage -10% to 110%
  speed: number;
  rotation: number;
  rotationSpeed: number;
  size: number;
  wobblePhase: number;
}

export interface FloatingText {
  id: string;
  text: string;
  x: number;
  y: number;
  type: 'correct' | 'wrong' | 'bonus' | 'powerup' | 'life';
  createdAt: number;
}

export type GameScreen = 'start' | 'playing' | 'paused' | 'game_over' | 'how_to_play' | 'settings' | 'levels';

export interface LevelConfig {
  level: number;
  name: string;
  tagline: string;
  speedMultiplier: number;
  spawnIntervalMs: number;
  description: string;
  badge: string;
  themeColor: string;
}

export const GAME_LEVELS: LevelConfig[] = [
  { level: 1, name: 'Morning Prep', tagline: 'Beginner kitchen pace', speedMultiplier: 1.0, spawnIntervalMs: 1100, description: 'Learn the sequence: Bun, Lettuce, Tomato, Cheese, Patty, Bun!', badge: '🍳', themeColor: '#10B981' },
  { level: 2, name: 'Lunch Rush', tagline: 'Customers are lining up!', speedMultiplier: 1.2, spawnIntervalMs: 960, description: 'Pace picks up. Dodge incoming fries, soda & pizza!', badge: '🥪', themeColor: '#3B82F6' },
  { level: 3, name: 'Dinner Frenzy', tagline: 'Peak diner hours', speedMultiplier: 1.4, spawnIntervalMs: 850, description: 'Fast orders, tricky decoys falling simultaneously.', badge: '🍔', themeColor: '#8B5CF6' },
  { level: 4, name: 'Weekend Special', tagline: 'Drive-thru packed!', speedMultiplier: 1.6, spawnIntervalMs: 760, description: 'Grab Slow-Mo and 2X stars to keep your combo alive!', badge: '⭐', themeColor: '#EC4899' },
  { level: 5, name: 'Master Grill', tagline: 'Flames at max heat', speedMultiplier: 1.8, spawnIntervalMs: 680, description: 'Fiery tempo! Only seasoned chefs maintain focus.', badge: '🔥', themeColor: '#F59E0B' },
  { level: 6, name: 'Midnight Shift', tagline: 'Non-stop night rush', speedMultiplier: 2.0, spawnIntervalMs: 610, description: 'Rapid drops with unpredictable bouncy trajectories.', badge: '🌙', themeColor: '#6366F1' },
  { level: 7, name: 'Burger Blitz', tagline: 'Pure adrenaline tempo', speedMultiplier: 2.3, spawnIntervalMs: 550, description: 'Fast reflex test. Keep your eyes on the next needed layer!', badge: '⚡', themeColor: '#E11D48' },
  { level: 8, name: 'Gourmet Chaos', tagline: 'Kitchen pandemonium', speedMultiplier: 2.6, spawnIntervalMs: 490, description: 'Extreme speed! Master tray movement with precision.', badge: '🌪️', themeColor: '#D97706' },
  { level: 9, name: 'Iron Chef Arena', tagline: 'Grand chef showdown', speedMultiplier: 2.9, spawnIntervalMs: 440, description: 'Supercharged speed! Every split second counts.', badge: '👑', themeColor: '#059669' },
  { level: 10, name: 'Burger Legend', tagline: 'Ultimate arcade mastery', speedMultiplier: 3.2, spawnIntervalMs: 390, description: 'The pinnacle of Burger Rush. Pure legend status!', badge: '🏆', themeColor: '#F43F5E' },
];

export interface GameStats {
  score: number;
  highScore: number;
  level: number;
  lives: number;
  burgerProgress: number; // 0 to 6
  burgersCompleted: number;
  currentBurgerStartTime: number;
}
