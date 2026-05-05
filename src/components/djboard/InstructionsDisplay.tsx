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
      <div className="instructions-screen" style={{ fontFamily: 'inherit' }}>
        <span className="instructions-prompt" style={{ fontFamily: 'inherit' }}>
          &gt; daniel:
        </span>{' '}
        <span className="instructions-text" style={{ fontFamily: 'inherit' }}>
          {shown}
        </span>
        {showCursor && (
          <span className="instructions-cursor" style={{ fontFamily: 'inherit' }}>
            ▍
          </span>
        )}
      </div>
    </div>
  );
}
