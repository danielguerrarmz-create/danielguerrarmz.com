import { useRef, useCallback, useId, useEffect, useLayoutEffect } from 'react';
import { ControlTooltip } from '../ControlTooltip';

export interface KnobControlProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
  size?: number;
  /** Angular drag damping; 1 = full scale. */
  sensitivity?: number;
  tooltip?: string;
}

export function KnobControl({
  label,
  value,
  onChange,
  size = 44,
  sensitivity = 1,
  tooltip,
}: KnobControlProps) {
  const knobRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const lastAngleRef = useRef<number | null>(null);
  const draggingValueRef = useRef(0);
  const latestValueRef = useRef(value);
  const uid = useId().replace(/:/g, '');
  const gradId = `kg-${uid}`;
  const shadowId = `ks-${uid}`;
  const rimGradId = `rim-${uid}`;

  useLayoutEffect(() => {
    latestValueRef.current = value;
  }, [value]);

  const valueToAngle = (v: number) => -135 + (v / 100) * 270;
  const angleDeg = valueToAngle(value);

  const getAngleFromEvent = useCallback((e: MouseEvent | PointerEvent): number => {
    if (!knobRef.current) return 0;
    const rect = knobRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rawAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
    let a = rawAngle + 90;
    while (a > 180) a -= 360;
    while (a < -180) a += 360;
    return a;
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (e.button !== 0) return;
      const el = e.currentTarget;
      isDragging.current = true;
      el.setPointerCapture(e.pointerId);
      lastAngleRef.current = getAngleFromEvent(e);
      draggingValueRef.current = latestValueRef.current;

      const handleMove = (moveE: PointerEvent) => {
        if (!isDragging.current || lastAngleRef.current === null) return;
        const currentAngle = getAngleFromEvent(moveE);
        let delta = currentAngle - lastAngleRef.current;
        if (delta > 180) delta -= 360;
        if (delta < -180) delta += 360;
        lastAngleRef.current = currentAngle;
        const valueDelta = (delta / 270) * 100 * sensitivity;
        draggingValueRef.current = Math.max(
          0,
          Math.min(100, draggingValueRef.current + valueDelta)
        );
        onChange(Math.round(draggingValueRef.current));
      };

      const handleUp = (up: PointerEvent) => {
        if (up.pointerId !== e.pointerId) return;
        isDragging.current = false;
        lastAngleRef.current = null;
        try {
          el.releasePointerCapture(e.pointerId);
        } catch {
          /* ignore */
        }
        window.removeEventListener('pointermove', handleMove);
        window.removeEventListener('pointerup', handleUp);
        window.removeEventListener('pointercancel', handleUp);
      };

      window.addEventListener('pointermove', handleMove);
      window.addEventListener('pointerup', handleUp);
      window.addEventListener('pointercancel', handleUp);
    },
    [getAngleFromEvent, onChange, sensitivity]
  );

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const step = e.deltaY > 0 ? -2 : 2;
      onChange(Math.max(0, Math.min(100, Math.round(value + step))));
    },
    [onChange, value]
  );

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2;
  const arcRadius = r * 0.93;
  const circumference = 2 * Math.PI * arcRadius;
  const totalArcLength = circumference * 0.75;
  const progressLength = (value / 100) * totalArcLength;
  const arcRotation = 135;

  const rad = (angleDeg * Math.PI) / 180;
  const ix1 = cx + Math.sin(rad) * r * 0.25;
  const iy1 = cy - Math.cos(rad) * r * 0.25;
  const ix2 = cx + Math.sin(rad) * r * 0.65;
  const iy2 = cy - Math.cos(rad) * r * 0.65;

  const swArc = size * 0.062;
  const swBodyStroke = size * 0.015;
  const swInd = Math.max(1.5, size * 0.045);

  return (
    <div
      ref={wrapRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <div
        ref={knobRef}
        role="slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(value)}
        aria-valuetext={`${Math.round(value)} percent`}
        aria-label={label}
        tabIndex={0}
        onPointerDown={handlePointerDown}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          cursor: 'grab',
          userSelect: 'none',
          touchAction: 'none',
          position: 'relative',
        }}
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          style={{ display: 'block', overflow: 'visible' }}
          aria-hidden
        >
          <defs>
            <radialGradient id={gradId} cx="35%" cy="28%" r="65%">
              <stop offset="0%" stopColor="#fafafa" />
              <stop offset="50%" stopColor="#ebebeb" />
              <stop offset="100%" stopColor="#cccccc" />
            </radialGradient>
            <radialGradient id={rimGradId} cx="50%" cy="50%" r="50%">
              <stop offset="70%" stopColor="rgba(0,0,0,0)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.22)" />
            </radialGradient>
            <filter id={shadowId} x="-25%" y="-25%" width="150%" height="150%">
              <feDropShadow
                dx={size * 0.02}
                dy={size * 0.04}
                stdDeviation={size * 0.04}
                floodColor="#000000"
                floodOpacity={0.28}
              />
            </filter>
          </defs>

          <circle
            cx={cx}
            cy={cy}
            r={arcRadius}
            fill="none"
            stroke="rgba(0,0,0,0.1)"
            strokeWidth={swArc}
            strokeDasharray={`${totalArcLength} ${circumference - totalArcLength}`}
            strokeLinecap="round"
            transform={`rotate(${arcRotation} ${cx} ${cy})`}
          />

          {value > 0 && (
            <circle
              cx={cx}
              cy={cy}
              r={arcRadius}
              fill="none"
              stroke="#dc2626"
              strokeWidth={swArc}
              strokeDasharray={`${progressLength} ${circumference}`}
              strokeLinecap="round"
              transform={`rotate(${arcRotation} ${cx} ${cy})`}
              style={{ transition: 'stroke-dasharray 60ms linear' }}
            />
          )}

          <circle
            cx={cx}
            cy={cy}
            r={r * 0.78}
            fill={`url(#${gradId})`}
            stroke="rgba(0,0,0,0.12)"
            strokeWidth={swBodyStroke}
            filter={`url(#${shadowId})`}
          />

          <circle
            cx={cx}
            cy={cy}
            r={r * 0.78}
            fill={`url(#${rimGradId})`}
            style={{ pointerEvents: 'none' }}
          />

          <ellipse
            cx={cx - r * 0.22}
            cy={cy - r * 0.28}
            rx={r * 0.16}
            ry={r * 0.1}
            fill="rgba(255,255,255,0.75)"
            style={{ pointerEvents: 'none' }}
          />

          <line
            x1={ix1}
            y1={iy1}
            x2={ix2}
            y2={iy2}
            stroke="#dc2626"
            strokeWidth={swInd}
            strokeLinecap="round"
            style={{ pointerEvents: 'none' }}
          />

          <circle
            cx={cx}
            cy={cy}
            r={r * 0.07}
            fill="rgba(0,0,0,0.2)"
            style={{ pointerEvents: 'none' }}
          />
        </svg>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          marginTop: '2px',
        }}
      >
        <span
          style={{
            fontSize: '0.62rem',
            fontWeight: 500,
            letterSpacing: '0.16em',
            color: 'rgba(0,0,0,0.5)',
            textTransform: 'uppercase',
            fontFamily: 'monospace',
          }}
        >
          {label}
        </span>
        {tooltip ? <ControlTooltip text={tooltip} /> : null}
      </div>
    </div>
  );
}
