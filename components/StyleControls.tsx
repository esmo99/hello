import React from 'react';
import { GreetingStyle } from '../types';
import { Sparkles, Globe, Code, User, Rocket } from 'lucide-react';

interface StyleControlsProps {
  currentStyle: GreetingStyle;
  onStyleChange: (style: GreetingStyle) => void;
  isLoading: boolean;
}

const styles = [
  { id: GreetingStyle.STANDARD, icon: User, label: 'Standard' },
  { id: GreetingStyle.NORWEGIAN, icon: Globe, label: 'Norwegian' },
  { id: GreetingStyle.CODE, icon: Code, label: 'Code' },
  { id: GreetingStyle.PIRATE, icon: Rocket, label: 'Pirate' }, // Using Rocket as placeholder for fun
  { id: GreetingStyle.ALIEN, icon: Sparkles, label: 'Alien' },
  { id: GreetingStyle.CORPORATE, icon: User, label: 'Corporate' },
  { id: GreetingStyle.RANDOM, icon: Sparkles, label: 'Surprise Me' },
];

export const StyleControls: React.FC<StyleControlsProps> = ({ currentStyle, onStyleChange, isLoading }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mt-12 max-w-4xl px-4">
      {styles.map((style) => {
        const Icon = style.icon;
        const isActive = currentStyle === style.id;
        
        return (
          <button
            key={style.id}
            onClick={() => onStyleChange(style.id)}
            disabled={isLoading}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300
              border border-transparent
              ${isActive 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105' 
                : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700 hover:text-white hover:border-slate-600'
              }
              ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <Icon size={16} className={isActive ? 'animate-pulse' : ''} />
            {style.label}
          </button>
        );
      })}
    </div>
  );
};