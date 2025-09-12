import React from 'react';

interface HeaderProps {
    onHomeClick: () => void;
    onMyListClick: () => void;
    onNotepadClick: () => void;
    onSettingsClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onHomeClick, onMyListClick, onNotepadClick, onSettingsClick }) => {
  return (
    <header className="py-4 px-4 md:px-8 text-center sticky top-0 z-10 flex justify-between items-center">
      <button 
        onClick={onHomeClick}
        title="Go Home"
        className="w-10 h-10 flex items-center justify-center bg-[var(--color-bg-tertiary)]/50 hover:bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-accent)] rounded-full transition-colors"
        aria-label="Go to home screen"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      </button>
      <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-gradient-from)] to-[var(--color-gradient-to)]">
        LingoPad AI
      </h1>
      <div className="flex items-center gap-2">
         <button 
            onClick={onMyListClick}
            title="My Saved List"
            className="w-10 h-10 flex items-center justify-center bg-[var(--color-bg-tertiary)]/50 hover:bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-accent)] rounded-full transition-colors"
            aria-label="Open my saved list"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
          <button 
            onClick={onNotepadClick}
            title="My Notes"
            className="w-10 h-10 flex items-center justify-center bg-[var(--color-bg-tertiary)]/50 hover:bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-accent)] rounded-full transition-colors"
            aria-label="Open my notes"
          >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
           <button 
            onClick={onSettingsClick}
            title="Settings"
            className="w-10 h-10 flex items-center justify-center bg-[var(--color-bg-tertiary)]/50 hover:bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-accent)] rounded-full transition-colors"
            aria-label="Open settings"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
      </div>
    </header>
  );
};

export default Header;