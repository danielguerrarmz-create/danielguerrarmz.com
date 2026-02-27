import { motion } from 'motion/react';

export interface ZoneBracketProps {
  label: string;
  active?: boolean;
  className?: string;
  children: React.ReactNode;
}

const MONO_FONT = "'SF Mono', 'Fira Code', 'Courier New', monospace";

export function ZoneBracket({
  label,
  active = false,
  className,
  children,
}: ZoneBracketProps) {
  const isFullHeight = className?.includes('h-full');
  return (
    <div
      className={`w-full flex flex-col ${className ?? ''}`.trim()}
      style={{ marginBottom: isFullHeight ? 0 : '20px' }}
    >
      <div className="flex items-center w-full gap-0 flex-shrink-0">
        <motion.div
          className="flex-shrink-0 rounded-full"
          style={{
            width: 5,
            height: 5,
            backgroundColor: '#dc2626',
            boxShadow: active ? '0 0 4px #dc2626' : 'none',
          }}
          initial={false}
          animate={{
            opacity: active ? 1 : 0.1,
          }}
          transition={{ duration: 0.3 }}
        />
        <div
          className="flex-1 h-px min-w-0"
          style={{ backgroundColor: '#b0b0b0', opacity: 0.3 }}
        />
        <span
          className="flex-shrink-0 uppercase"
          style={{
            fontFamily: MONO_FONT,
            fontSize: 9,
            color: '#a0a0a0',
            letterSpacing: '2px',
            paddingLeft: 12,
            paddingRight: 12,
          }}
        >
          {label}
        </span>
        <div
          className="flex-1 h-px min-w-0"
          style={{ backgroundColor: '#b0b0b0', opacity: 0.3 }}
        />
      </div>
      <div className="flex-1 min-h-0" style={{ paddingTop: 12 }}>
        {children}
      </div>
    </div>
  );
}
