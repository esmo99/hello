export interface GreetingData {
  text: string;
  language: string;
  description: string;
  codeSnippet?: string;
}

export enum GreetingStyle {
  STANDARD = 'Standard',
  CODE = 'Code',
  PIRATE = 'Pirate',
  ALIEN = 'Alien',
  NORWEGIAN = 'Norwegian',
  CORPORATE = 'Corporate',
  POETIC = 'Poetic',
  RANDOM = 'Surprise Me'
}