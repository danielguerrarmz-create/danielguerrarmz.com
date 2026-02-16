import { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface KnobProps {
  value: number; // 0-100
  onChange: (value: number) => void;
  label: string;
  onInteractionChange?: (isInteracting: boolean) => void;
}

export function Knob({ value, onChange, label, onInteractionChange }: KnobProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const knobRef = useRef<HTMLDivElement>(null);

  // Convert value (0-100) to rotation angle (0 to 360 degrees)
  const valueToAngle = (val: number) => {
    return (val / 100) * 360;
  };

  // Convert angle (0-360) to value (0-100)
  const angleToValue = (angle: number) => {
    // Normalize angle to 0-360 range
    let normalized = angle % 360;
    if (normalized < 0) normalized += 360;
    return (normalized / 360) * 100;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    onInteractionChange?.(true);
  };

  const handleWheel = (e: React.WheelEvent) => {
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
      // Calculate angle from knob center to mouse position
      const deltaX = e.clientX - knobCenterX;
      const deltaY = e.clientY - knobCenterY;
      
      // atan2 returns angle in radians, convert to degrees
      // atan2(y, x) gives angle from positive x-axis, counterclockwise
      // We need to adjust: 0° at top, clockwise rotation
      let angleRad = Math.atan2(deltaY, deltaX);
      let angleDeg = (angleRad * 180) / Math.PI;
      
      // Convert to 0-360 range with 0° at top (12 o'clock)
      // atan2 gives: right = 0°, down = 90°, left = 180°/-180°, up = -90°
      // We want: top = 0°, right = 90°, bottom = 180°, left = 270°
      angleDeg = angleDeg + 90;
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

  // Size increased by 50%: 12 * 1.5 = 18
  const knobSize = 18;

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        ref={knobRef}
        className="relative cursor-pointer select-none"
        style={{ width: `${knobSize * 4}px`, height: `${knobSize * 4}px` }}
        onMouseDown={handleMouseDown}
        onWheel={handleWheel}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Knob body with neumorphic style */}
        <motion.div
          className="w-full h-full rounded-full relative"
          style={{
            background: 'linear-gradient(145deg, #e6e6e6, #ffffff)',
            boxShadow: isHovering || isDragging
              ? 'inset 4px 4px 9px #d1d1d1, inset -4px -4px 9px #ffffff'
              : '7px 7px 15px #d1d1d1, -7px -7px 15px #ffffff',
          }}
          animate={{ scale: isDragging ? 0.98 : 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          {/* Rotation indicator - rotates continuously 0-360° */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: valueToAngle(value) }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          >
            <div 
              className="absolute left-1/2 -translate-x-1/2 rounded-full bg-red-600"
              style={{ 
                top: '6px',
                width: '3px', 
                height: `${knobSize}px` 
              }}
            />
          </motion.div>

          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-gray-400" />
          </div>
        </motion.div>

        {/* Track indicators - concentric circle */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 72 72">
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

      {/* Label */}
      <div className="text-[11px] text-gray-600 uppercase tracking-wider font-mono text-center leading-tight max-w-[90px]">
        {label}
      </div>
    </div>
  );
}
