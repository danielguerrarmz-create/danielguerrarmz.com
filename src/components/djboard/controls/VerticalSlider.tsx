import { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';

export interface VerticalSliderProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
  size?: 'default' | 'sm' | 'lg';
  fillHeight?: boolean;
  disabled?: boolean;
  onInteractionChange?: (isInteracting: boolean) => void;
}

const sliderSizeConfig = {
  default: {
    trackW: 48,
    trackH: 192,
    padding: 12,
    grooveW: 6,
    thumbW: 36,
    thumbH: 24,
    labelSize: '11px',
  },
  sm: {
    trackW: 14,
    trackH: 80,
    padding: 4,
    grooveW: 3,
    thumbW: 22,
    thumbH: 10,
    labelSize: '8px',
  },
  lg: {
    trackW: 24,
    trackH: 180,
    padding: 10,
    grooveW: 6,
    thumbW: 36,
    thumbH: 22,
    labelSize: '11px',
  },
};

export function VerticalSlider({
  value,
  onChange,
  label,
  size = 'default',
  fillHeight = false,
  disabled = false,
  onInteractionChange,
}: VerticalSliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const cfg = sliderSizeConfig[size];
  const tickPosition = size === 'sm' || size === 'lg' ? 'left' : 'right';
  const isLg = size === 'lg';
  const useFillHeight = fillHeight && size === 'lg';

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    setIsDragging(true);
    onInteractionChange?.(true);
    updateValue(e.clientY);
  };

  const updateValue = (clientY: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const percentage = Math.max(
      0,
      Math.min(100, ((rect.bottom - clientY) / rect.height) * 100)
    );
    onChange(percentage);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      updateValue(e.clientY);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      onInteractionChange?.(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, onInteractionChange]);

  return (
    <div
      className={`flex flex-col items-center gap-2 ${isLg ? 'h-full' : ''} ${useFillHeight ? 'flex-1 min-h-0' : ''}`}
    >
      <div
        className="uppercase tracking-wider font-mono text-center leading-tight text-gray-600 flex-shrink-0"
        style={{
          fontSize: cfg.labelSize,
          maxWidth: size === 'sm' ? 56 : size === 'lg' ? 80 : 90,
        }}
      >
        {label}
      </div>

      <div
        className={`relative flex items-center ${useFillHeight ? 'flex-1 min-h-0 w-full justify-center' : ''}`}
      >
        {tickPosition === 'left' && (
          <div
            className="absolute flex flex-col justify-between -left-2"
            style={
              useFillHeight
                ? { top: cfg.padding, bottom: cfg.padding }
                : {
                    top: cfg.padding,
                    bottom: cfg.padding,
                    height: cfg.trackH - cfg.padding * 2,
                  }
            }
          >
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-2 h-px bg-gray-400 opacity-40" />
            ))}
          </div>
        )}

        <div
          ref={trackRef}
          className={`relative rounded-full ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
          style={{
            width: useFillHeight ? 32 : cfg.trackW,
            height: useFillHeight ? '100%' : cfg.trackH,
            background: 'linear-gradient(145deg, #e6e6e6, #ffffff)',
            boxShadow: 'inset 4px 4px 9px #d1d1d1, inset -4px -4px 9px #ffffff',
          }}
          onMouseDown={handleMouseDown}
        >
          <div
            className="absolute left-1/2 -translate-x-1/2 bg-gradient-to-b from-gray-400 to-gray-300 rounded-full"
            style={{
              top: cfg.padding,
              bottom: cfg.padding,
              width: cfg.grooveW,
            }}
          />

          <div
            className="absolute left-1/2 -translate-x-1/2 bg-gradient-to-b from-red-400 to-red-600 rounded-full transition-all duration-150"
            style={{
              bottom: cfg.padding,
              width: cfg.grooveW,
              height: `calc((100% - ${cfg.padding * 2}px) * ${value / 100})`,
            }}
          />

          <motion.div
            className="absolute left-1/2 -translate-x-1/2 rounded-sm"
            style={{
              width: cfg.thumbW,
              height: cfg.thumbH,
              marginLeft: -cfg.thumbW / 2,
              background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
              boxShadow: isDragging
                ? '2px 2px 5px #b8b8b8, -2px -2px 5px #ffffff'
                : '3px 3px 6px #b8b8b8, -3px -3px 6px #ffffff',
              bottom: `calc((100% - ${cfg.padding * 2}px) * ${value / 100})`,
            }}
            animate={{ scale: isDragging ? 0.95 : 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-5 h-1 bg-gray-400 rounded-full"
                style={{
                  width: size === 'sm' ? 12 : size === 'lg' ? 18 : 20,
                }}
              />
            </div>
          </motion.div>

          {tickPosition === 'right' && (
            <div
              className="absolute right-full mr-2 flex flex-col justify-between"
              style={{ top: cfg.padding, bottom: cfg.padding }}
            >
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-2 h-px bg-gray-400 opacity-50" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
