export type DeckId =
  | 'full-stack'
  | 'icebreakers'
  | 'deep-dive'
  | 'family'
  | 'fun-whacky'
  | 'politics';

export type DeckTheme = 'pink' | 'mint' | 'yellow' | 'blue' | 'orange' | 'purple';

export interface DeckDefinition {
  id: DeckId;
  title: string;
  description: string;
  theme: DeckTheme;
  questions: readonly string[];
}

const ICEBREAKERS_QUESTIONS = [
  'What’s a tiny win you’ve had recently?',
  'What’s your go-to comfort snack?',
  'If your day had a soundtrack, what genre is it?',
  'What’s a hobby you’d try if you had a free weekend?',
  'What’s a “small luxury” you genuinely love?',
  'What’s your most used emoji (and why)?',
  'Coffee, tea, or “whatever has caffeine”?',
  'What’s a movie you can rewatch anytime?',
  'What’s a smell that instantly makes you happy?',
  'If you could instantly master one skill, what is it?',
  'What’s the best compliment you’ve ever gotten?',
  'What’s something you learned this year that surprised you?',
  'What’s a song you’d put on at a party?',
  'What’s your ideal “doing nothing” activity?',
  'Morning person, night owl, or permanently confused?',
  'What’s a simple tradition you enjoy?',
  'What’s a food combo you swear by that others judge?',
  'What’s your favorite way to spend 30 minutes?',
  'What’s something you’re looking forward to?',
  'What’s one thing you’d put in your “starter pack”?'
] as const;

const DEEP_DIVE_QUESTIONS = [
  'What belief have you changed your mind about in the last few years?',
  'What’s something you’re proud of that no one sees?',
  'What’s a boundary you learned to set (and why)?',
  'What does “feeling safe” look like to you?',
  'When do you feel most like yourself?',
  'What’s a lesson you had to learn the hard way?',
  'What’s a relationship skill you’re actively practicing?',
  'What’s something you wish people asked you more often?',
  'What’s a fear you’ve gotten better at living with?',
  'What’s a moment that changed your perspective?',
  'What do you want more of in your life this year?',
  'What do you want less of in your life this year?',
  'What’s a value you won’t compromise on?',
  'What’s a compliment you have trouble accepting?',
  'What’s a memory you revisit when you need strength?',
  'How do you know when you’re burnt out?',
  'What’s something you’re unlearning right now?',
  'What kind of support helps you the most?',
  'What’s your favorite way to reconnect after a hard day?',
  'What’s a future version of you you’re excited to meet?'
] as const;

const FAMILY_QUESTIONS = [
  'What’s a family tradition you’d like to keep (or start)?',
  'What’s a meal that tastes like home to you?',
  'Who in your family is the “unofficial historian”?',
  'What’s a funny story your family tells repeatedly?',
  'What’s a value you learned from your caregivers?',
  'What’s a lesson you learned from siblings/cousins (or chosen family)?',
  'What’s something you admired about a grandparent (or elder)?',
  'What’s a family habit you’re glad you didn’t inherit?',
  'What’s a family habit you secretly did inherit?',
  'What’s your favorite holiday memory?',
  'What’s a small gesture that shows love in your family?',
  'What’s something you want future generations to know about you?',
  'What’s a skill someone in your family taught you?',
  'What’s the best advice you’ve gotten from family?',
  'What’s a time your family surprised you (in a good way)?',
  'What’s a place that feels like “family territory”?',
  'What’s a tradition you’d happily retire?',
  'What’s a family story you wish you knew more about?',
  'How does your family handle conflict—what works and what doesn’t?',
  'What does “chosen family” mean to you?'
] as const;

const FUN_WHACKY_QUESTIONS = [
  'If you were a mascot, what object would you be and why?',
  'What’s the funniest “wrong” lyric you’ve ever sung?',
  'If your life had a loading screen tip, what would it say?',
  'What’s your most controversial pizza topping opinion?',
  'If you had to name a new color, what would you call it?',
  'What animal would be the worst roommate?',
  'If you could add one button to your body, what would it do?',
  'What’s a totally useless superpower you’d still want?',
  'If you opened a themed café, what’s the theme?',
  'What would your signature dance move be called?',
  'If you were a candle scent, what would your label say?',
  'What’s a “two truths and a lie” that’s too powerful?',
  'If your pet could talk, what would they roast you for?',
  'What’s the most dramatic way to exit a room (without being rude)?',
  'If you could teleport to one very specific place, where is it?',
  'What’s a food you’d ban from first dates (for chaos reasons)?',
  'What’s an item you think should come with a user manual?',
  'If you had a personal jingle, how would it go?',
  'What’s the weirdest compliment you’d love to receive?',
  'If you could swap voices with someone for a day, who would it be?'
] as const;

const POLITICS_QUESTIONS = [
  'What does a “fair economy” mean to you in one sentence?',
  'What’s one policy area you wish people talked about with more nuance?',
  'How should a society balance individual freedom and collective care?',
  'What’s your view on paid family leave—what should the baseline be?',
  'What’s a climate action you support that feels realistic and effective?',
  'What’s one public service you’d happily fund more (and why)?',
  'How do you think healthcare should work at a basic level?',
  'What workplace rule would improve dignity and fairness for most people?',
  'What makes you trust (or distrust) institutions like media and government?',
  'What’s a voting reform you think would make democracy healthier?',
  'How do you decide which sources are credible when news is messy?',
  'What’s a community issue you’d like to see solved locally?',
  'What do you think “public safety” should include beyond policing?',
  'What’s a “good compromise” example you’ve seen or would accept?',
  'How should governments protect people from discrimination in daily life?',
  'What’s your view on student debt and access to education?',
  'What’s one way to reduce poverty that you find persuasive?',
  'How do you feel about unions and collective bargaining?',
  'What role should governments play in regulating big tech?',
  'What’s a civic habit you want to build (or already have)?'
] as const;

const FULL_STACK_QUESTIONS = [
  ...ICEBREAKERS_QUESTIONS,
  ...DEEP_DIVE_QUESTIONS,
  ...FAMILY_QUESTIONS,
  ...FUN_WHACKY_QUESTIONS,
  ...POLITICS_QUESTIONS
] as const;

export const DECKS: readonly DeckDefinition[] = [
  {
    id: 'full-stack',
    title: 'Full Stack',
    description: 'All decks combined—100 questions, totally randomized.',
    theme: 'purple',
    questions: FULL_STACK_QUESTIONS
  },
  {
    id: 'icebreakers',
    title: 'Icebreakers',
    description: 'Quick prompts to get the room talking (no pressure, just vibes).',
    theme: 'pink',
    questions: ICEBREAKERS_QUESTIONS
  },
  {
    id: 'deep-dive',
    title: 'Deep Dive',
    description: 'A little more thoughtful—still friendly, still optional.',
    theme: 'mint',
    questions: DEEP_DIVE_QUESTIONS
  },
  {
    id: 'family',
    title: 'Family',
    description: 'Stories, traditions, and the people who shaped you.',
    theme: 'yellow',
    questions: FAMILY_QUESTIONS
  },
  {
    id: 'fun-whacky',
    title: 'Fun & Whacky',
    description: 'Silly, creative, and slightly unhinged—in the best way.',
    theme: 'blue',
    questions: FUN_WHACKY_QUESTIONS
  },
  {
    id: 'politics',
    title: 'Politics (Friendly)',
    description:
      'Mild, respectful civic prompts—values, tradeoffs, and what “fair” means.',
    theme: 'orange',
    questions: POLITICS_QUESTIONS
  }
] as const;

export const DECKS_BY_ID: Readonly<Record<DeckId, DeckDefinition>> = DECKS.reduce(
  (acc, deck) => {
    acc[deck.id] = deck;
    return acc;
  },
  {} as Record<DeckId, DeckDefinition>
);
