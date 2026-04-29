import { useState } from 'react';

export interface AskBarProps {
  onSubmit: (question: string) => void;
  onFocus?: () => void;
}

export function AskBar({ onSubmit, onFocus }: AskBarProps) {
  const [value, setValue] = useState('');
  const handleSubmit = () => {
    const trimmed = value.trim();
    if (trimmed) {
      onSubmit(trimmed);
      setValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="ask">
      <div className="ask-screen">
        <span className="ask-prompt">&gt;</span>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={onFocus}
          placeholder="ask anything..."
          aria-label="Ask"
          className="ask-input"
        />
        <button type="button" className="ask-send" onClick={handleSubmit} aria-label="Send">
          <svg viewBox="0 0 12 12" width="11" height="11"><path d="M0 0 L12 6 L0 12 Z" fill="currentColor" /></svg>
        </button>
      </div>
    </div>
  );
}
