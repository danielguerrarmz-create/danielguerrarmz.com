import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface InfoTooltipProps {
  text: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

const MONO_FONT = "'SF Mono', 'Fira Code', 'Courier New', monospace";

export function InfoTooltip({ text, position = 'top' }: InfoTooltipProps) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const anchorRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const isTouch =
    typeof window !== 'undefined' && 'ontouchstart' in window;

  useEffect(() => {
    if (!visible || !isTouch) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        anchorRef.current?.contains(target) ||
        tooltipRef.current?.contains(target)
      )
        return;
      setVisible(false);
    };
    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [visible, isTouch]);

  const show = () => {
    setVisible(true);
    setHovered(true);
  };
  const hide = () => {
    setVisible(false);
    setHovered(false);
  };

  const arrowStyle = (): React.CSSProperties => {
    const size = 6;
    const base: React.CSSProperties = {
      position: 'absolute',
      width: 0,
      height: 0,
      border: `${size}px solid transparent`,
    };
    switch (position) {
      case 'top':
        return {
          ...base,
          bottom: -size,
          left: '50%',
          marginLeft: -size,
          borderTopColor: '#1a1a1a',
        };
      case 'bottom':
        return {
          ...base,
          top: -size,
          left: '50%',
          marginLeft: -size,
          borderBottomColor: '#1a1a1a',
        };
      case 'left':
        return {
          ...base,
          right: -size,
          top: '50%',
          marginTop: -size,
          borderLeftColor: '#1a1a1a',
        };
      case 'right':
        return {
          ...base,
          left: -size,
          top: '50%',
          marginTop: -size,
          borderRightColor: '#1a1a1a',
        };
      default:
        return {
          ...base,
          bottom: -size,
          left: '50%',
          marginLeft: -size,
          borderTopColor: '#1a1a1a',
        };
    }
  };

  const isActive = hovered || visible;
  return (
    <span className="relative inline-flex">
      <span
        ref={anchorRef}
        role="button"
        tabIndex={0}
        className="inline-flex items-center justify-center flex-shrink-0 rounded-full cursor-pointer select-none"
        style={{
          width: 16,
          height: 16,
          border: `1px solid ${isActive ? '#dc2626' : '#c0c0c0'}`,
          background: 'transparent',
          boxShadow:
            '1px 1px 2px rgba(0,0,0,0.08), -1px -1px 2px rgba(255,255,255,0.5)',
          fontFamily: MONO_FONT,
          fontSize: 9,
          color: isActive ? '#dc2626' : '#c0c0c0',
          transition: 'border-color 0.2s ease, color 0.2s ease',
        }}
        onMouseEnter={!isTouch ? show : undefined}
        onMouseLeave={!isTouch ? hide : undefined}
        onClick={isTouch ? () => setVisible((v) => !v) : undefined}
        onFocus={show}
        onBlur={hide}
      >
        ?
      </span>
      <AnimatePresence>
        {visible && (
          <motion.div
            ref={tooltipRef}
            className="absolute z-[9999]"
            style={{
              top:
                position === 'top'
                  ? 'auto'
                  : position === 'bottom'
                    ? '100%'
                    : '50%',
              bottom: position === 'top' ? '100%' : 'auto',
              left:
                position === 'left' || position === 'right' ? '50%' : '50%',
              marginTop:
                position === 'bottom' ? 8 : position === 'top' ? undefined : 0,
              marginBottom: position === 'top' ? 8 : 0,
              marginLeft: position === 'left' ? -8 : position === 'right' ? 8 : 0,
              transform:
                position === 'left'
                  ? 'translate(-100%, -50%)'
                  : position === 'right'
                    ? 'translate(0, -50%)'
                    : 'translateX(-50%)',
            }}
            initial={{
              opacity: 0,
              y: position === 'top' ? 4 : position === 'bottom' ? -4 : 0,
              x: position === 'left' ? 4 : position === 'right' ? -4 : 0,
            }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <div
              className="relative rounded-md"
              style={{
                background: '#1a1a1a',
                color: '#00ff41',
                fontFamily: MONO_FONT,
                fontSize: 10,
                padding: '8px 12px',
                maxWidth: 180,
                boxShadow:
                  '1px 1px 2px rgba(0,0,0,0.08), -1px -1px 2px rgba(255,255,255,0.5)',
                backgroundImage:
                  'repeating-linear-gradient(0deg, transparent 50%, rgba(0,0,0,0.03) 50%)',
                backgroundSize: '100% 2px',
              }}
            >
              <div style={arrowStyle()} />
              {text}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
