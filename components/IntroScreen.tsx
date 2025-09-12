import React from 'react';
import SakuraPetals from './SakuraPetals';

// FIX: Define props interface for the component
interface IntroScreenProps {
  onStart: () => void;
}

const YuiIllustration: React.FC = () => (
    <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto text-[var(--color-text-primary)]">
        {/* Sakura Tree Trunk */}
        <path d="M100 180 Q 90 130, 80 100 T 70 50 Q 75 40, 85 40 T 90 55" stroke="var(--color-text-secondary)" strokeWidth="4" fill="none" />
        {/* Sakura Branches */}
        <path d="M80 100 Q 60 90, 40 80" stroke="var(--color-text-secondary)" strokeWidth="3" fill="none" />
        <path d="M85 70 Q 110 60, 130 70" stroke="var(--color-text-secondary)" strokeWidth="3" fill="none" />
        {/* Blossoms */}
        <circle cx="40" cy="80" r="12" fill="var(--color-accent-secondary)" opacity="0.8" />
        <circle cx="55" cy="70" r="10" fill="var(--color-accent)" opacity="0.7" />
        <circle cx="130" cy="70" r="15" fill="var(--color-accent-secondary)" opacity="0.8" />
        <circle cx="115" cy="55" r="9" fill="var(--color-accent)" opacity="0.7" />
        <circle cx="90" cy="45" r="11" fill="var(--color-accent-secondary)" opacity="0.8" />
        {/* Yui */}
        <g transform="translate(10, 25)">
            <circle cx="100" cy="130" r="12" fill="currentColor" /> {/* Head */}
            <path d="M100 142 L 100 160 L 90 170 L 110 170 Z" fill="currentColor" /> {/* Body */}
            <rect x="95" y="142" width="10" height="5" fill="var(--color-bg-primary)" /> {/* Collar */}
        </g>
    </svg>
);


const IntroScreen: React.FC<IntroScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 overflow-hidden">
      
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-[var(--color-accent)]/10 blur-[200px]"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[var(--color-accent-secondary)]/10 blur-[200px]"></div>

      <main className="relative z-10 space-y-4 animate-fade-in-zoom">
        <YuiIllustration />
        <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-gradient-from)] to-[var(--color-gradient-to)]">
          LingoPad AI
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-[var(--color-text-secondary)]">
          Welcome! I'm Yui, your personal AI companion for language learning. Let's practice writing, vocabulary, grammar, and more together!
        </p>
        <div>
          <button
            onClick={onStart}
            className="px-10 py-4 bg-gradient-to-r from-[var(--color-gradient-from)] to-[var(--color-gradient-to)] text-white font-bold text-lg rounded-lg shadow-lg hover:scale-105 transition-transform"
          >
            Get Started
          </button>
        </div>
      </main>

      <footer className="absolute bottom-6 text-[var(--color-text-secondary)] text-sm z-10">
        &copy; {new Date().getFullYear()} LingoPad AI. All rights reserved.
      </footer>
    </div>
  );
};

export default IntroScreen;