import { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface VerticalSliderProps {
  value: number; // 0-100
  onChange: (value: number) => void;
  label: string;
  disabled?: boolean;
  onInteractionChange?: (isInteracting: boolean) => void;
}

export function VerticalSlider({ value, onChange, label, disabled = false, onInteractionChange }: VerticalSliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    setIsDragging(true);
    onInteractionChange?.(true);
    updateValue(e.clientY);
  };

  const updateValue = (clientY: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(100, ((rect.bottom - clientY) / rect.height) * 100));
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

  // Size increased by 50%: 8 * 1.5 = 12, 32 * 1.5 = 48
  return (
    <div className="flex flex-col items-center gap-3">
      {/* Label at top */}
      <div className="text-[11px] text-gray-600 uppercase tracking-wider font-mono text-center leading-tight max-w-[90px]">
        {label}
      </div>

      {/* Slider track */}
      <div
        ref={trackRef}
        className={`relative rounded-full ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
        style={{
          width: '48px',
          height: '192px',
          background: 'linear-gradient(145deg, #e6e6e6, #ffffff)',
          boxShadow: 'inset 4px 4px 9px #d1d1d1, inset -4px -4px 9px #ffffff',
        }}
        onMouseDown={handleMouseDown}
      >
        {/* Track groove */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 bg-gradient-to-b from-gray-400 to-gray-300 rounded-full"
          style={{ top: '12px', bottom: '12px', width: '6px' }}
        />

        {/* Value indicator fill */}
        <div
          className="absolute left-1/2 -translate-x-1/2 bg-gradient-to-b from-red-400 to-red-600 rounded-full transition-all duration-150"
          style={{
            bottom: '12px',
            width: '6px',
            height: `calc((100% - 24px) * ${value / 100})`,
          }}
        />

        {/* Slider handle */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 rounded-sm"
          style={{
            width: '36px',
            height: '24px',
            background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
            boxShadow: isDragging
              ? '2px 2px 5px #b8b8b8, -2px -2px 5px #ffffff'
              : '3px 3px 6px #b8b8b8, -3px -3px 6px #ffffff',
            bottom: `calc((100% - 24px) * ${value / 100})`,
          }}
          animate={{ scale: isDragging ? 0.95 : 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-5 h-1 bg-gray-400 rounded-full" />
          </div>
        </motion.div>

        {/* Tick marks */}
        <div className="absolute right-full mr-2 flex flex-col justify-between" style={{ top: '12px', bottom: '12px' }}>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-2 h-px bg-gray-400 opacity-50" />
          ))}
        </div>
      </div>
    </div>
  );
}