import React from 'react';
import { THEMES } from '../constants';
import type { Theme, LayoutMode } from '../types';

type ThemeId = Theme['id'];

interface SettingsProps {
    currentTheme: ThemeId;
    onThemeChange: (themeId: ThemeId) => void;
    currentLayoutMode: LayoutMode;
    onLayoutModeChange: (mode: LayoutMode) => void;
    showPetals: boolean;
    onShowPetalsChange: (show: boolean) => void;
    defaultItemCount: number;
    onDefaultItemCountChange: (count: number) => void;
    onClearData: () => void;
    onClose: () => void;
}

const Switch: React.FC<{ checked: boolean; onChange: (checked: boolean) => void; }> = ({ checked, onChange }) => (
    <label className="switch-container">
        <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        <span className="switch-slider"></span>
    </label>
);


const Settings: React.FC<SettingsProps> = ({ 
    currentTheme, onThemeChange, 
    currentLayoutMode, onLayoutModeChange, 
    showPetals, onShowPetalsChange,
    defaultItemCount, onDefaultItemCountChange,
    onClearData,
    onClose 
}) => {
  return (
    <div className="modal-backdrop animate-fade-in" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <header className="modal-header">
          <h2 className="text-xl font-bold text-[var(--color-text-accent)]">Settings</h2>
          <button onClick={onClose} className="modal-close-button" aria-label="Close settings">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </header>
        <div className="modal-body space-y-8">
          
          {/* Appearance Section */}
          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">Appearance</h3>
            <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--color-text-secondary)]">Theme</label>
                <div className="flex justify-around items-center p-2 bg-[var(--color-bg-primary)]/50 rounded-xl border border-[var(--color-border)]">
                    {THEMES.map(theme => (
                        <button 
                        key={theme.id} 
                        title={theme.name} 
                        onClick={() => onThemeChange(theme.id)} 
                        className={`w-12 h-12 rounded-full text-2xl transition-transform hover:scale-110 flex items-center justify-center ${currentTheme === theme.id ? 'bg-[var(--color-accent)] ring-2 ring-offset-2 ring-offset-[var(--color-bg-secondary)] ring-[var(--color-accent)]' : 'bg-[var(--color-bg-tertiary)]'}`}
                        >
                        {theme.emoji}
                        </button>
                    ))}
                </div>
            </div>
             <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--color-text-secondary)]">Layout Mode</label>
                <div className="flex flex-col sm:flex-row gap-2 bg-[var(--color-bg-primary)]/50 p-2 rounded-xl border border-[var(--color-border)]">
                    {(['auto', 'compact', 'comfortable'] as LayoutMode[]).map(mode => (
                    <button 
                        key={mode} 
                        onClick={() => onLayoutModeChange(mode)}
                        className={`flex-1 p-3 text-center font-semibold rounded-lg transition-colors ${currentLayoutMode === mode ? 'bg-[var(--color-accent)] text-white' : 'bg-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]/50'}`}
                    >
                        {mode.charAt(0).toUpperCase() + mode.slice(1)}
                    </button>
                    ))}
                </div>
             </div>
             <div className="flex justify-between items-center bg-[var(--color-bg-primary)]/50 p-3 rounded-xl border border-[var(--color-border)]">
                <label htmlFor="petal-toggle" className="font-medium text-[var(--color-text-primary)]">Sakura Petal Effect</label>
                <Switch checked={showPetals} onChange={onShowPetalsChange} />
             </div>
          </section>

          {/* Practice Settings */}
          <section className="space-y-4">
             <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">Practice</h3>
             <div className="space-y-2 bg-[var(--color-bg-primary)]/50 p-3 rounded-xl border border-[var(--color-border)]">
                <div className="flex justify-between items-center text-sm">
                    <label htmlFor="item-count-slider" className="font-medium text-[var(--color-text-secondary)]">Default Items per Practice</label>
                    <span className="font-bold text-lg text-[var(--color-text-accent)]">{defaultItemCount}</span>
                </div>
                <input
                    id="item-count-slider"
                    type="range"
                    min="5"
                    max="25"
                    value={defaultItemCount}
                    onChange={e => onDefaultItemCountChange(parseInt(e.target.value))}
                />
             </div>
          </section>
          
          {/* Data Management Section */}
          <section className="border-t border-[var(--color-danger)]/30 pt-4 space-y-3">
             <h3 className="text-lg font-semibold text-[var(--color-danger)]">Danger Zone</h3>
             <div className="bg-[var(--color-bg-primary)]/50 p-3 rounded-xl border border-[var(--color-danger)]/50 flex justify-between items-center">
                <p className="text-sm text-[var(--color-text-secondary)]">Clear all saved items.</p>
                <button
                    onClick={onClearData}
                    className="px-4 py-2 font-semibold text-sm bg-red-800/50 text-red-300 border border-red-700 rounded-lg hover:bg-red-800/80 transition-colors"
                >
                    Clear Data
                </button>
             </div>
             <p className="text-xs text-center text-[var(--color-text-secondary)]">This will permanently delete your saved vocabulary and grammar. This action cannot be undone.</p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Settings;