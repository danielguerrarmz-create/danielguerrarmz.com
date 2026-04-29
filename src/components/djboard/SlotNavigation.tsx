import { useRef, useEffect, useState, useCallback } from 'react';
import { WIREFRAME_SHAPES, projectShape } from '@/utils/wireframeShapes';
import type { Project } from '@/types';

export interface SlotNavigationProps {
  projects: Project[];
  activeIndex: number;
  onProjectChange: (index: number) => void;
  className?: string;
}

const WHITE = '#ffffff';
const WHITE_DIM = 'rgba(255,255,255,0.3)';

function WireframeSvg({
  projectIndex,
  angleY,
  size,
  cx,
  cy,
  active,
  responsive = false,
}: {
  projectIndex: number;
  angleY: number;
  size: number;
  cx: number;
  cy: number;
  active: boolean;
  responsive?: boolean;
}) {
  const shape = WIREFRAME_SHAPES[projectIndex % WIREFRAME_SHAPES.length];
  const { points, edges } = projectShape(shape, angleY, size, cx, cy);

  const scale = (p: { x: number; y: number }) => ({
    x: cx + p.x * size,
    y: cy + p.y * size,
  });

  const viewBox = `${cx - size * 1.3} ${cy - size * 1.3} ${size * 2.6} ${size * 2.6}`;

  return (
    <svg
      width={responsive ? '100%' : size * 2.5}
      height={responsive ? '100%' : size * 2.5}
      viewBox={viewBox}
      className="overflow-visible"
      preserveAspectRatio={responsive ? 'xMidYMid meet' : undefined}
      style={{
        filter: active
          ? 'drop-shadow(0 0 6px rgba(255,255,255,0.15))'
          : undefined,
      }}
    >
      {edges.map(({ i, j, midZ }, idx) => {
        const a = scale(points[i]);
        const b = scale(points[j]);
        const isBack = midZ < 0;
        return (
          <path
            key={idx}
            d={`M ${a.x} ${a.y} L ${b.x} ${b.y}`}
            fill="none"
            stroke={isBack ? WHITE_DIM : WHITE}
            strokeWidth={active ? 1.2 : 0.8}
            opacity={active ? 1 : 0.35}
          />
        );
      })}
      {points.map((p, i) => {
        const s = scale(p);
        return (
          <circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={1.5}
            fill={WHITE}
            opacity={active ? 1 : 0.35}
          />
        );
      })}
    </svg>
  );
}

function SlotCell({
  project,
  projectIndex,
  isActive,
  angleY,
  onClick,
}: {
  project: Project;
  projectIndex: number;
  isActive: boolean;
  angleY: number;
  onClick: () => void;
}) {
  const cellSize = 72;
  const cx = cellSize / 2;
  const cy = cellSize / 2;
  const shapeSize = isActive ? 20 : 16;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`slot-cell ${isActive ? 'is-active' : ''}`}
      style={{
        borderColor: isActive ? 'rgba(255,255,255,0.12)' : 'transparent',
        borderWidth: 1,
        borderStyle: 'solid',
      }}
    >
      <div className="slot-shape">
          <WireframeSvg
            projectIndex={projectIndex}
            angleY={angleY}
            size={shapeSize}
            cx={cx}
            cy={cy}
            active={isActive}
            responsive
          />
      </div>
      <div>
        <div className="slot-num">{String(project.id).padStart(2, '0')}</div>
        <div className="slot-title">{project.slotLabel ?? project.title}</div>
      </div>
    </button>
  );
}

export function SlotNavigation({
  projects,
  activeIndex,
  onProjectChange,
  className,
}: SlotNavigationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollCooldown, setScrollCooldown] = useState(false);
  const [angleY, setAngleY] = useState(0);
  const rafRef = useRef<number>(0);
  const prevIndex = activeIndex === 0 ? projects.length - 1 : activeIndex - 1;
  const nextIndex = (activeIndex + 1) % projects.length;

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) return;
      if (scrollCooldown) {
        e.preventDefault();
        return;
      }
      e.preventDefault();
      setScrollCooldown(true);
      setTimeout(() => setScrollCooldown(false), 300);
      if (e.deltaY > 0) onProjectChange((activeIndex + 1) % projects.length);
      else onProjectChange((activeIndex - 1 + projects.length) % projects.length);
    },
    [activeIndex, onProjectChange, projects.length, scrollCooldown]
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  useEffect(() => {
    let last = performance.now();
    const tick = (now: number) => {
      const delta = (now - last) / 1000;
      last = now;
      setAngleY((a) => a + (delta * Math.PI * 2) / 7);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const staticAngle = (30 * Math.PI) / 180;

  return (
    <div className={`slot-wrap ${className ?? ''}`.trim()}>
      <div ref={containerRef} className="slot">
        <div>
            <SlotCell
              project={projects[prevIndex]}
              projectIndex={prevIndex}
              isActive={false}
              angleY={staticAngle}
              onClick={() => onProjectChange(prevIndex)}
            />
        </div>
        <div className="slot-divider"><span>▲</span></div>
        <div>
            <SlotCell
              project={projects[activeIndex]}
              projectIndex={activeIndex}
              isActive={true}
              angleY={angleY}
              onClick={() => onProjectChange(activeIndex)}
            />
        </div>
        <div className="slot-divider"><span>▼</span></div>
        <div>
            <SlotCell
              project={projects[nextIndex]}
              projectIndex={nextIndex}
              isActive={false}
              angleY={staticAngle}
              onClick={() => onProjectChange(nextIndex)}
            />
        </div>
      </div>
      <div className="slot-hint"><span>SCROLL · CLICK</span><span>{activeIndex + 1} / {projects.length}</span></div>
    </div>
  );
}
