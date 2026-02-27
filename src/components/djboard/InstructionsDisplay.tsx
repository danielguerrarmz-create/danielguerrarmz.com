import { useEffect, useState } from 'react';

export interface InstructionsDisplayProps {
  message: string;
  highlights?: string[];
  className?: string;
}

const MONO_FONT = "'SF Mono', 'Fira Code', 'Courier New', monospace";
const SCREEN_BG = '#f5f5f0';
const SCREEN_BORDER = '#d4d4d0';
const TEXT_PRIMARY = '#1a1a1a';
const ACCENT = '#dc2626';

export function InstructionsDisplay({
  message,
  highlights = [],
  className,
}: InstructionsDisplayProps) {
  const [displayedLength, setDisplayedLength] = useState(message.length);
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    setDisplayedLength(0);
    setIsTyping(true);
    setShowCursor(true);
  }, [message]);

  useEffect(() => {
    if (!isTyping) return;
    if (displayedLength >= message.length) {
      setIsTyping(false);
      const cursorTimer = setTimeout(() => setShowCursor(false), 1000);
      return () => clearTimeout(cursorTimer);
    }
    const t = setTimeout(() => setDisplayedLength((n) => n + 1), 25);
    return () => clearTimeout(t);
  }, [message, displayedLength, isTyping]);

  const displayedText = message.slice(0, displayedLength);
  const lines = displayedText.split('\n');

  const renderLine = (
    line: string,
    isLast: boolean,
    showCursorOnThisLine: boolean
  ) => {
    if (highlights.length === 0) {
      return (
        <span key={line + isLast.toString()}>
          <span style={{ color: TEXT_PRIMARY }}>{line}</span>
          {showCursorOnThisLine && (
            <span
              className="inline-block align-middle ml-0.5"
              style={{
                color: TEXT_PRIMARY,
                fontSize: 10,
                animation: 'askbar-cursor-blink 1s step-end infinite',
              }}
            >
              |
            </span>
          )}
        </span>
      );
    }
    const parts: { text: string; highlight: boolean }[] = [];
    const re = new RegExp(
      highlights.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'),
      'gi'
    );
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = re.exec(line)) !== null) {
      if (match.index > lastIndex) {
        parts.push({
          text: line.slice(lastIndex, match.index),
          highlight: false,
        });
      }
      parts.push({ text: match[0], highlight: true });
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < line.length)
      parts.push({ text: line.slice(lastIndex), highlight: false });
    if (parts.length === 0) parts.push({ text: line, highlight: false });

    return (
      <span key={line + isLast.toString()}>
        {parts.map((p, i) =>
          p.highlight ? (
            <span key={i} style={{ color: ACCENT }}>
              {p.text}
            </span>
          ) : (
            <span key={i} style={{ color: TEXT_PRIMARY }}>
              {p.text}
            </span>
          )
        )}
        {showCursorOnThisLine && (
          <span
            className="inline-block align-middle ml-0.5"
            style={{
              color: TEXT_PRIMARY,
              fontSize: 10,
              animation: 'askbar-cursor-blink 1s step-end infinite',
            }}
          >
            |
          </span>
        )}
      </span>
    );
  };

  return (
    <div
      className={`rounded overflow-hidden w-full h-full ${className ?? ''}`.trim()}
      style={{
        background: SCREEN_BG,
        border: `1px solid ${SCREEN_BORDER}`,
        borderRadius: 4,
        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.06)',
      }}
    >
      <div
        className="w-full h-full overflow-auto"
        style={{
          padding: '10px 12px',
          fontFamily: MONO_FONT,
          fontSize: 10,
          lineHeight: 1.5,
          color: TEXT_PRIMARY,
        }}
      >
        {lines.map((line, i) => (
          <div key={i}>
            {renderLine(
              line,
              i === lines.length - 1,
              i === lines.length - 1 &&
                showCursor &&
                (isTyping || displayedLength >= message.length)
            )}
          </div>
        ))}
        {lines.length === 0 && (
          <span
            style={{
              color: TEXT_PRIMARY,
              fontSize: 10,
              animation: 'askbar-cursor-blink 1s step-end infinite',
            }}
          >
            |
          </span>
        )}
      </div>
    </div>
  );
}
