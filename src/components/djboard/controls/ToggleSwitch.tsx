import { motion } from 'motion/react';

export interface ToggleSwitchProps {
  value: boolean;
  onChange: (value: boolean) => void;
  label: string;
  size?: 'default' | 'sm' | 'lg';
  fillContainer?: boolean;
  orientation?: 'vertical' | 'horizontal';
  onInteractionChange?: (isInteracting: boolean) => void;
}

const sizeConfig = {
  default: {
    trackW: 60,
    trackH: 96,
    inset: 12,
    thumbSize: 42,
    thumbTop: 6,
    thumbBottom: 'calc(100% - 48px)',
    labelSize: '11px',
  },
  sm: {
    trackW: 34,
    trackH: 17,
    inset: 2,
    thumbSize: 13,
    thumbTop: 2,
    thumbBottom: 'calc(100% - 15px)',
    labelSize: '8px',
  },
  lg: {
    trackW: 56,
    trackH: 72,
    inset: 8,
    thumbSize: 40,
    thumbTop: 6,
    thumbBottom: 'calc(100% - 46px)',
    labelSize: '11px',
  },
};

const horizontalConfig = {
  lg: {
    trackW: 80,
    trackH: 40,
    inset: 6,
    thumbSize: 28,
    thumbLeftOff: 6,
    thumbLeftOn: 46,
    labelSize: '11px',
  },
};

export function ToggleSwitch({
  value,
  onChange,
  label,
  size = 'default',
  fillContainer = false,
  orientation = 'vertical',
  onInteractionChange,
}: ToggleSwitchProps) {
  const cfg = sizeConfig[size];
  const useFill = fillContainer && size === 'lg';
  const isHorizontal = orientation === 'horizontal' && size === 'lg';
  const hCfg = isHorizontal ? horizontalConfig.lg : null;

  return (
    <div
      className={`flex flex-col items-center gap-2 ${useFill ? 'flex-1 min-h-0 h-full w-full' : ''}`}
    >
      <button
        onClick={() => onChange(!value)}
        onMouseDown={() => onInteractionChange?.(true)}
        onMouseUp={() => onInteractionChange?.(false)}
        onMouseLeave={() => onInteractionChange?.(false)}
        className={`relative rounded-full cursor-pointer ${useFill ? 'flex-1 min-h-0 w-full' : ''}`}
        style={{
          width: isHorizontal && hCfg ? hCfg.trackW : useFill ? '100%' : cfg.trackW,
          height: isHorizontal && hCfg ? hCfg.trackH : useFill ? undefined : cfg.trackH,
          minHeight: useFill && !isHorizontal ? 48 : undefined,
          background: 'linear-gradient(145deg, #e6e6e6, #ffffff)',
          boxShadow: '4px 4px 9px #d1d1d1, -4px -4px 9px #ffffff',
        }}
      >
        <div
          className="absolute rounded-full bg-gradient-to-b from-gray-300 to-gray-200"
          style={{
            inset: isHorizontal && hCfg ? hCfg.inset : cfg.inset,
          }}
        />

        {isHorizontal && hCfg ? (
          <motion.div
            className="absolute rounded-full"
            style={{
              width: hCfg.thumbSize,
              height: hCfg.thumbSize,
              top: '50%',
              left: value ? hCfg.thumbLeftOn : hCfg.thumbLeftOff,
              marginTop: -hCfg.thumbSize / 2,
              marginLeft: 0,
              background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
              boxShadow: '3px 3px 6px #b8b8b8, -3px -3px 6px #ffffff',
            }}
            animate={{
              left: value ? hCfg.thumbLeftOn : hCfg.thumbLeftOff,
            }}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30,
            }}
          >
            {value && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="rounded-full bg-red-600"
                  style={{ width: 10, height: 10 }}
                />
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 rounded-full"
            style={{
              width: cfg.thumbSize,
              height: cfg.thumbSize,
              left: '50%',
              marginLeft: -cfg.thumbSize / 2,
              background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
              boxShadow: '3px 3px 6px #b8b8b8, -3px -3px 6px #ffffff',
            }}
            animate={{
              top: value ? cfg.thumbTop : cfg.thumbBottom,
            }}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30,
            }}
          >
            {value && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="rounded-full bg-red-600"
                  style={{
                    width: size === 'sm' ? 6 : size === 'lg' ? 10 : 12,
                    height: size === 'sm' ? 6 : size === 'lg' ? 10 : 12,
                  }}
                />
              </div>
            )}
          </motion.div>
        )}
      </button>

      <div
        className="uppercase tracking-wider font-mono text-center leading-tight text-gray-600 flex-shrink-0"
        style={{
          fontSize: cfg.labelSize,
          maxWidth: size === 'sm' ? 56 : size === 'lg' ? 72 : 90,
        }}
      >
        {label}
      </div>
    </div>
  );
}
