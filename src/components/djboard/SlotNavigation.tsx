import { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { WIREFRAME_SHAPES, projectShape } from '@/utils/wireframeShapes';
import type { Project } from '@/types';

export interface SlotNavigationProps {
  projects: Project[];
  activeIndex: number;
  onProjectChange: (index: number) => void;
  className?: string;
}

const MONO_FONT = "'SF Mono', 'Fira Code', 'Courier New', monospace";
const WHITE = '#ffffff';
const WHITE_DIM = 'rgba(255,255,255,0.3)';
const DIVIDER = 'rgba(255,255,255,0.1)';
const ARROW = 'rgba(255,255,255,0.15)';

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
      className="flex flex-col items-center justify-center gap-0.5 flex-1 min-h-0 w-full border-0 border-transparent rounded-none transition-colors cursor-pointer"
      style={{
        borderColor: isActive ? 'rgba(255,255,255,0.12)' : 'transparent',
        borderWidth: 1,
        borderStyle: 'solid',
      }}
    >
      <div className="flex-1 min-h-0 min-w-0 w-full flex items-center justify-center">
        <div className="w-[60%] h-[60%] min-w-8 min-h-8 max-w-[72px] max-h-[72px] flex items-center justify-center">
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
      </div>
      <span
        className="uppercase truncate max-w-full px-0.5 text-center flex-shrink-0"
        style={{
          fontFamily: MONO_FONT,
          fontSize: 10,
          color: WHITE,
          opacity: isActive ? 1 : 0.3,
        }}
      >
        {project.title}
      </span>
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
  const [reordering, setReordering] = useState(false);
  const prevOrderRef = useRef<string>('');

  const orderKey = projects.map((p) => p.id).join(',');
  useEffect(() => {
    if (prevOrderRef.current === '') {
      prevOrderRef.current = orderKey;
      return;
    }
    if (prevOrderRef.current !== orderKey) {
      prevOrderRef.current = orderKey;
      setReordering(true);
      const t = setTimeout(() => setReordering(false), 200);
      return () => clearTimeout(t);
    }
  }, [orderKey]);

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
      if (e.deltaY > 0) {
        onProjectChange(nextIndex);
      } else {
        if (activeIndex > 0) onProjectChange(activeIndex - 1);
      }
    },
    [activeIndex, nextIndex, onProjectChange, scrollCooldown]
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
    <div
      className={`w-full h-full flex flex-col gap-0 ${className ?? ''}`.trim()}
    >
      <motion.div
        ref={containerRef}
        className="flex-1 min-h-0 flex flex-col rounded overflow-hidden"
        style={{
          border: '2px solid #333',
          boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
          borderRadius: 4,
        }}
        animate={{ opacity: reordering ? 0.3 : 1 }}
        transition={{ duration: reordering ? 0.2 : 0.3 }}
      >
        <div
          className="flex-1 min-h-0 flex flex-col rounded overflow-hidden"
          style={{
            background: '#1a1a1a',
            borderRadius: 2,
          }}
        >
          <div
            className="flex-1 min-h-0 flex flex-col border-b border-dashed"
            style={{ borderColor: DIVIDER }}
          >
            <SlotCell
              project={projects[prevIndex]}
              projectIndex={prevIndex}
              isActive={false}
              angleY={staticAngle}
              onClick={() => onProjectChange(prevIndex)}
            />
          </div>

          <div
            className="flex-shrink-0 flex justify-center py-0.5 border-b border-dashed"
            style={{
              fontFamily: MONO_FONT,
              fontSize: 12,
              color: ARROW,
              borderColor: DIVIDER,
            }}
          >
            ↑
          </div>

          <div
            className="flex-1 min-h-0 flex flex-col border-b border-dashed"
            style={{ borderColor: DIVIDER }}
          >
            <SlotCell
              project={projects[activeIndex]}
              projectIndex={activeIndex}
              isActive={true}
              angleY={angleY}
              onClick={() => {}}
            />
          </div>

          <div
            className="flex-shrink-0 flex justify-center py-0.5 border-b border-dashed"
            style={{
              fontFamily: MONO_FONT,
              fontSize: 12,
              color: ARROW,
              borderColor: DIVIDER,
            }}
          >
            ↓
          </div>

          <div className="flex-1 min-h-0 flex flex-col">
            <SlotCell
              project={projects[nextIndex]}
              projectIndex={nextIndex}
              isActive={false}
              angleY={staticAngle}
              onClick={() => onProjectChange(nextIndex)}
            />
          </div>
        </div>
      </motion.div>
      <p
        className="text-center uppercase flex-shrink-0 pt-1"
        style={{
          fontFamily: MONO_FONT,
          fontSize: 7,
          color: '#999',
        }}
      >
        Scroll to navigate
      </p>
    </div>
  );
}
