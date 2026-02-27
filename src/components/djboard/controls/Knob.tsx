import { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';

export interface KnobProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
  size?: 'default' | 'lg';
  onInteractionChange?: (isInteracting: boolean) => void;
  disabled?: boolean;
  startAngle?: number;
  angleRange?: number;
}

const knobSizeConfig = {
  default: {
    knobSize: 18,
    labelSize: '11px',
    maxLabelWidth: 90,
    indicatorTop: 6,
    indicatorW: 3,
    centerDot: 8,
  },
  lg: {
    knobSize: 27.5,
    labelSize: '12px',
    maxLabelWidth: 100,
    indicatorTop: 9,
    indicatorW: 4,
    centerDot: 10,
  },
};

export function Knob({
  value,
  onChange,
  label,
  size = 'default',
  onInteractionChange,
  disabled = false,
  startAngle = 0,
  angleRange = 360,
}: KnobProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const knobRef = useRef<HTMLDivElement>(null);
  const cfg = knobSizeConfig[size];
  const knobSize = cfg.knobSize;

  const valueToAngle = (val: number) => startAngle + (val / 100) * angleRange;

  const angleToValue = (angle: number) => {
    let normalized = angle % 360;
    if (normalized < 0) normalized += 360;
    let start = startAngle % 360;
    if (start < 0) start += 360;
    const relative = (normalized - start + 360) % 360;
    const val = (relative / angleRange) * 100;
    return Math.max(0, Math.min(100, val));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    e.preventDefault();
    setIsDragging(true);
    onInteractionChange?.(true);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (disabled) return;
    e.preventDefault();
    const delta = e.deltaY > 0 ? -2 : 2;
    const newValue = Math.max(0, Math.min(100, value + delta));
    onChange(newValue);
  };

  useEffect(() => {
    if (!isDragging || !knobRef.current) return;

    const knobRect = knobRef.current.getBoundingClientRect();
    const knobCenterX = knobRect.left + knobRect.width / 2;
    const knobCenterY = knobRect.top + knobRect.height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - knobCenterX;
      const deltaY = e.clientY - knobCenterY;
      let angleRad = Math.atan2(deltaY, deltaX);
      let angleDeg = (angleRad * 180) / Math.PI + 90;
      if (angleDeg < 0) angleDeg += 360;
      const newValue = angleToValue(angleDeg);
      onChange(newValue);
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
  }, [isDragging, onChange, onInteractionChange]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        ref={knobRef}
        className={`relative select-none ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
        style={{ width: `${knobSize * 4}px`, height: `${knobSize * 4}px` }}
        onMouseDown={handleMouseDown}
        onWheel={handleWheel}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <motion.div
          className="w-full h-full rounded-full relative"
          style={{
            background: 'linear-gradient(145deg, #e6e6e6, #ffffff)',
            boxShadow:
              isHovering || isDragging
                ? 'inset 4px 4px 9px #d1d1d1, inset -4px -4px 9px #ffffff'
                : '7px 7px 15px #d1d1d1, -7px -7px 15px #ffffff',
          }}
          animate={{ scale: isDragging ? 0.98 : 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: valueToAngle(value) }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          >
            <div
              className="absolute left-1/2 -translate-x-1/2 rounded-full bg-red-600"
              style={{
                top: `${cfg.indicatorTop}px`,
                width: `${cfg.indicatorW}px`,
                height: `${knobSize}px`,
              }}
            />
          </motion.div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="rounded-full bg-gray-400"
              style={{ width: cfg.centerDot, height: cfg.centerDot }}
            />
          </div>
        </motion.div>

        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 72 72"
        >
          <circle
            cx="36"
            cy="36"
            r="30"
            fill="none"
            stroke="#d1d1d1"
            strokeWidth="1"
            strokeDasharray="3 6"
            opacity="0.5"
          />
        </svg>
      </div>

      <div
        className="text-gray-600 uppercase tracking-wider font-mono text-center leading-tight"
        style={{ fontSize: cfg.labelSize, maxWidth: cfg.maxLabelWidth }}
      >
        {label}
      </div>
    </div>
  );
}
