import { motion } from 'motion/react';

interface ToggleSwitchProps {
  value: boolean;
  onChange: (value: boolean) => void;
  label: string;
}

export function ToggleSwitch({ value, onChange, label }: ToggleSwitchProps) {
  // Size increased by 50%: 10 * 1.5 = 15, 16 * 1.5 = 24
  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={() => onChange(!value)}
        className="relative rounded-full cursor-pointer"
        style={{
          width: '60px',
          height: '96px',
          background: 'linear-gradient(145deg, #e6e6e6, #ffffff)',
          boxShadow: '4px 4px 9px #d1d1d1, -4px -4px 9px #ffffff',
        }}
      >
        {/* Track */}
        <div className="absolute rounded-full bg-gradient-to-b from-gray-300 to-gray-200" style={{ inset: '12px' }} />

        {/* Switch handle */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 rounded-full"
          style={{
            width: '42px',
            height: '42px',
            background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
            boxShadow: '3px 3px 6px #b8b8b8, -3px -3px 6px #ffffff',
          }}
          animate={{
            top: value ? '6px' : 'calc(100% - 48px)',
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
          }}
        >
          {/* Red indicator when active */}
          {value && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-red-600" />
            </div>
          )}
        </motion.div>
      </button>

      {/* Label */}
      <div className="text-[11px] text-gray-600 uppercase tracking-wider font-mono text-center leading-tight max-w-[90px]">
        {label}
      </div>
    </div>
  );
}