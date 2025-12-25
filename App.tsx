import React, { useState, useEffect } from 'react';
import { GreetingCard } from './components/GreetingCard';
import { StyleControls } from './components/StyleControls';
import { generateGreeting } from './services/geminiService';
import { GreetingData, GreetingStyle } from './types';
import { Globe2 } from 'lucide-react';

const App: React.FC = () => {
  const [currentStyle, setCurrentStyle] = useState<GreetingStyle>(GreetingStyle.STANDARD);
  const [greetingData, setGreetingData] = useState<GreetingData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchGreeting = async (style: GreetingStyle) => {
    setIsLoading(true);
    setCurrentStyle(style);
    
    // Slight artificial delay for "Standard" to make it feel less jarring, 
    // real API calls take time naturally.
    if (style === GreetingStyle.STANDARD) {
        await new Promise(r => setTimeout(r, 600)); 
    }

    const data = await generateGreeting(style);
    setGreetingData(data);
    setIsLoading(false);
  };

  // Initial load
  useEffect(() => {
    fetchGreeting(GreetingStyle.STANDARD);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#0f172a] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-950 to-black text-slate-100 flex flex-col items-center relative overflow-x-hidden selection:bg-blue-500/30">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      {/* Header */}
      <header className="w-full p-6 flex items-center justify-between z-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Globe2 size={20} className="text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-200">HelloGen</span>
        </div>
        <div className="text-sm text-slate-500 font-medium">Powered by Gemini</div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col items-center justify-center p-4 z-10 py-12 md:py-20">
        
        <div className="mb-12 text-center max-w-xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
            Say it differently.
          </h2>
          <p className="text-slate-400 text-lg">
            Explore "Hello World" across languages, subcultures, and creative dimensions.
          </p>
        </div>

        <GreetingCard data={greetingData} isLoading={isLoading} />
        
        <StyleControls 
          currentStyle={currentStyle} 
          onStyleChange={fetchGreeting} 
          isLoading={isLoading}
        />

      </main>

      {/* Footer */}
      <footer className="w-full p-6 text-center text-slate-600 text-sm z-10">
        <p>&copy; {new Date().getFullYear()} Universal Hello World. Built with React & Tailwind.</p>
      </footer>
    </div>
  );
};

export default App;