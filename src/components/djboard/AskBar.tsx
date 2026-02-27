import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface AskBarProps {
  onSubmit: (question: string) => void;
  response?: string | null;
  onFocus?: () => void;
}

const MONO_FONT = "'SF Mono', 'Fira Code', 'Courier New', monospace";
const SCREEN_BG = '#f5f5f0';
const SCREEN_BORDER = '#d4d4d0';
const TEXT_PRIMARY = '#1a1a1a';
const ACCENT = '#dc2626';
const RESPONSE_BORDER = '#e0e0e0';

export function AskBar({
  onSubmit,
  response = null,
  onFocus,
}: AskBarProps) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [responseDisplayLength, setResponseDisplayLength] = useState(0);
  const [responseTyping, setResponseTyping] = useState(false);

  const handleSubmit = useCallback(() => {
    const trimmed = value.trim();
    if (trimmed) {
      onSubmit(trimmed);
      setValue('');
    }
  }, [value, onSubmit]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    if (response == null || response === '') {
      setResponseDisplayLength(0);
      setResponseTyping(false);
      return;
    }
    setResponseDisplayLength(0);
    setResponseTyping(true);
  }, [response]);

  useEffect(() => {
    if (!responseTyping || response == null) return;
    if (responseDisplayLength >= response.length) {
      setResponseTyping(false);
      return;
    }
    const t = setTimeout(() => setResponseDisplayLength((n) => n + 1), 25);
    return () => clearTimeout(t);
  }, [response, responseDisplayLength, responseTyping]);

  const displayedResponse =
    response != null ? response.slice(0, responseDisplayLength) : '';

  return (
    <div className="w-full h-full flex flex-col gap-2 min-h-0">
      <div
        className="w-full flex-1 min-h-0 rounded overflow-hidden flex flex-col"
        style={{
          background: SCREEN_BG,
          border: `1px solid ${SCREEN_BORDER}`,
          borderRadius: 4,
          boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.06)',
        }}
      >
        <div className="relative flex-1 min-h-0 flex flex-col">
          <div
            className="absolute pointer-events-none"
            style={{
              top: 8,
              left: 10,
              fontFamily: MONO_FONT,
              fontSize: 11,
              color: ACCENT,
            }}
          >
            {'>'}
          </div>
          <div className="relative flex-1 min-h-0 flex flex-col pl-6 pr-10 py-2">
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => onFocus?.()}
              placeholder="ask about me or my work..."
              rows={2}
              className="w-full h-full min-h-0 resize-none bg-transparent outline-none border-none placeholder:text-black/25"
              style={{
                fontFamily: MONO_FONT,
                fontSize: 11,
                lineHeight: 1.5,
                color: TEXT_PRIMARY,
                caretColor: TEXT_PRIMARY,
              }}
              aria-label="Ask about me or my work"
            />
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="absolute bottom-2 right-2 w-6 h-6 flex items-center justify-center cursor-pointer border-0 bg-transparent text-[#dc2626] hover:opacity-90 transition-opacity"
            aria-label="Send"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 12 12"
              fill="currentColor"
              className="translate-x-px"
            >
              <path d="M0 0 L12 6 L0 12 Z" />
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {response != null && response.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full rounded flex-shrink-0"
            style={{
              background: SCREEN_BG,
              border: `1px solid ${SCREEN_BORDER}`,
              borderTop: `1px solid ${RESPONSE_BORDER}`,
              borderRadius: 4,
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.06)',
            }}
          >
            <div className="w-full px-3 py-1.5 min-h-[32px] max-h-[48px] overflow-hidden">
              <div
                className="text-left flex items-start gap-1 overflow-hidden"
                style={{
                  fontFamily: MONO_FONT,
                  fontSize: 9,
                  lineHeight: 1.4,
                  color: TEXT_PRIMARY,
                }}
              >
                <span style={{ color: ACCENT, flexShrink: 0 }}>{'>'}</span>
                <span
                  className="overflow-hidden text-ellipsis"
                  style={{ maxHeight: 28 }}
                >
                  {displayedResponse}
                  {responseTyping && (
                    <span
                      className="inline-block align-middle ml-0.5"
                      style={{
                        color: TEXT_PRIMARY,
                        animation:
                          'askbar-cursor-blink 1s step-end infinite',
                      }}
                    >
                      |
                    </span>
                  )}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
