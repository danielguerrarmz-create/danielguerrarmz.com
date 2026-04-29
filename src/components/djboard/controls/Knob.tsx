import { useRef, useState, useEffect } from 'react';

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

export function Knob({
  value,
  onChange,
  label,
  onInteractionChange,
  disabled = false,
}: KnobProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [hover, setHover] = useState(false);
  const knobRef = useRef<HTMLDivElement>(null);
  const angle = -135 + (value / 100) * 270;

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
    if (!isDragging || !knobRef.current || disabled) return;
    const rect = knobRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      let a = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
      if (a > 180) a -= 360;
      if (a < -180) a += 360;
      const clamped = Math.max(-135, Math.min(135, a));
      const v = ((clamped + 135) / 270) * 100;
      onChange(Math.max(0, Math.min(100, v)));
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
  }, [isDragging, onChange, onInteractionChange, disabled]);

  return (
    <div className="knob-wrap">
      <div
        ref={knobRef}
        className={`knob ${isDragging ? 'is-drag' : ''} ${hover ? 'is-hover' : ''}`}
        onMouseDown={handleMouseDown}
        onWheel={handleWheel}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <svg className="knob-ticks" viewBox="-50 -50 100 100">
          {Array.from({ length: 11 }).map((_, i) => {
            const t = -135 + (i / 10) * 270;
            const major = i % 5 === 0;
            const rad = (t * Math.PI) / 180;
            const r1 = major ? 38 : 40;
            const r2 = 44;
            return (
              <line
                key={i}
                x1={Math.sin(rad) * r1}
                y1={-Math.cos(rad) * r1}
                x2={Math.sin(rad) * r2}
                y2={-Math.cos(rad) * r2}
                stroke={major ? 'var(--ink-50)' : 'var(--ink-30)'}
                strokeWidth={major ? 1.2 : 0.8}
                strokeLinecap="round"
              />
            );
          })}
        </svg>
        <div className="knob-body">
          <div className="knob-cap" style={{ transform: `rotate(${angle}deg)` }}>
            <div className="knob-indicator" />
          </div>
        </div>
      </div>
      <div className="knob-label">{label}</div>
      <div className="knob-readout">{Math.round(value)}%</div>
    </div>
  );
}
