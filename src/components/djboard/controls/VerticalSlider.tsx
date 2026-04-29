import { useRef, useState, useEffect } from 'react';

export interface VerticalSliderProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
  size?: 'default' | 'sm' | 'lg';
  fillHeight?: boolean;
  disabled?: boolean;
  onInteractionChange?: (isInteracting: boolean) => void;
}

export function VerticalSlider({
  value,
  onChange,
  label,
  disabled = false,
  onInteractionChange,
}: VerticalSliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const updateValue = (clientY: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(100, ((rect.bottom - clientY) / rect.height) * 100));
    onChange(percentage);
  };
  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    setIsDragging(true);
    onInteractionChange?.(true);
    updateValue(e.clientY);
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
    <div className="vslider-wrap">
      <div className="vslider-head">{label}</div>
      <div className="vslider-body">
        <div className="vslider-ticks">{['FULL', '', 'BAL', '', 'MIN'].map((t, i) => <div key={i} className="vslider-tick"><span>{t}</span></div>)}</div>
        <div ref={trackRef} className="vslider-track" onMouseDown={handleMouseDown}>
          <div className="vslider-fill" style={{ height: `${value}%` }} />
          <div className={`vslider-thumb ${isDragging ? 'is-drag' : ''}`} style={{ bottom: `calc(${value}% - 11px)` }}>
            <div className="vslider-thumb-line" />
          </div>
        </div>
      </div>
    </div>
  );
}
