import React from 'react';
import { GreetingData } from '../types';
import { Copy, Terminal } from 'lucide-react';

interface GreetingCardProps {
  data: GreetingData | null;
  isLoading: boolean;
}

export const GreetingCard: React.FC<GreetingCardProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="w-full max-w-2xl min-h-[400px] flex flex-col items-center justify-center p-12 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 shadow-2xl animate-pulse">
        <div className="h-16 w-3/4 bg-white/10 rounded-lg mb-8"></div>
        <div className="h-6 w-1/2 bg-white/5 rounded mb-4"></div>
        <div className="h-24 w-full bg-black/20 rounded-xl mt-8"></div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="relative w-full max-w-2xl flex flex-col items-center p-8 md:p-12 bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-slate-700 shadow-[0_0_50px_rgba(56,189,248,0.1)] overflow-hidden transition-all duration-500 hover:shadow-[0_0_80px_rgba(56,189,248,0.2)]">
      
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Language Badge */}
      <div className="mb-6 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs font-semibold tracking-wider uppercase text-blue-300">
        {data.language}
      </div>

      {/* Main Greeting */}
      <h1 className="text-5xl md:text-7xl font-extrabold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-slate-300 tracking-tight leading-tight drop-shadow-sm">
        {data.text}
      </h1>

      {/* Description */}
      <p className="text-slate-400 text-center text-lg mb-10 max-w-lg leading-relaxed">
        {data.description}
      </p>

      {/* Code Snippet (if available) */}
      {data.codeSnippet && (
        <div className="w-full bg-black/40 rounded-xl border border-slate-800 overflow-hidden group">
          <div className="flex items-center justify-between px-4 py-2 bg-slate-900/50 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Terminal size={14} className="text-slate-500" />
              <span className="text-xs text-slate-500 font-mono">output.txt</span>
            </div>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            </div>
          </div>
          <div className="p-6 overflow-x-auto relative">
            <pre className="font-mono text-sm md:text-base text-emerald-400">
              <code>{data.codeSnippet}</code>
            </pre>
            <button 
              onClick={() => navigator.clipboard.writeText(data.codeSnippet!)}
              className="absolute top-4 right-4 p-2 rounded-md bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
              title="Copy code"
            >
              <Copy size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};