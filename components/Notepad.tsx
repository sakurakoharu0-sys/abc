import React from 'react';

interface NotepadProps {
    notes: string;
    onNotesChange: (notes: string) => void;
    onClose: () => void;
}

const Notepad: React.FC<NotepadProps> = ({ notes, onNotesChange, onClose }) => {
    return (
        <div className="modal-backdrop animate-fade-in" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <header className="modal-header">
                    <h2 className="text-xl font-bold text-[var(--color-text-accent)]">My Notes</h2>
                    <button onClick={onClose} className="modal-close-button" aria-label="Close notes">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </header>
                <div className="modal-body p-0 flex">
                    <textarea
                        value={notes}
                        onChange={(e) => onNotesChange(e.target.value)}
                        placeholder="Jot down vocabulary, grammar rules, or anything you want to remember..."
                        className="w-full h-full flex-grow bg-transparent p-6 resize-none focus:outline-none placeholder:text-[var(--color-text-secondary)]"
                    />
                </div>
            </div>
        </div>
    );
};

export default Notepad;
