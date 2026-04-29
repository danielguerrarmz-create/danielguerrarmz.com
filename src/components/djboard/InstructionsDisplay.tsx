import { useEffect, useState } from 'react';

export interface InstructionsDisplayProps {
  message: string;
}

export function InstructionsDisplay({
  message,
}: InstructionsDisplayProps) {
  const [displayedLength, setDisplayedLength] = useState(message.length);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    setDisplayedLength(0);
    setShowCursor(true);
  }, [message]);

  useEffect(() => {
    if (displayedLength >= message.length) {
      const cursorTimer = setTimeout(() => setShowCursor(false), 1000);
      return () => clearTimeout(cursorTimer);
    }
    const t = setTimeout(() => setDisplayedLength((n) => n + 1), 18);
    return () => clearTimeout(t);
  }, [message, displayedLength]);

  const shown = message.slice(0, displayedLength);

  return (
    <div className="instructions">
      <div className="instructions-screen">
        <span className="instructions-prompt">&gt; daniel:</span>{' '}
        <span className="instructions-text">{shown}</span>
        {showCursor && <span className="instructions-cursor">▍</span>}
      </div>
    </div>
  );
}
