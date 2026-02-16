import { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Knob } from './Knob';
import { ToggleSwitch } from './ToggleSwitch';
import { VerticalSlider } from './VerticalSlider';
import { DisplayScreen } from './DisplayScreen';
import type { ControlState } from '../App';

interface Project {
  id: number;
  title: string;
  hasTimeline?: boolean;
}

interface DialNavigationProps {
  projects: Project[];
  activeIndex: number;
  onProjectChange: (index: number) => void;
  controls: ControlState;
  onControlChange: (key: keyof ControlState, value: any) => void;
}

export function DialNavigation({ 
  projects, 
  activeIndex, 
  onProjectChange,
  controls,
  onControlChange 
}: DialNavigationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [activeControl, setActiveControl] = useState<string | null>(null);
  const [controlValue, setControlValue] = useState<string | null>(null);

  // Handle scroll wheel when hovering over the dial
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (isHovering) {
        e.preventDefault();
        
        if (e.deltaY > 0) {
          // Scroll down - always allow cycling forward
          onProjectChange((activeIndex + 1) % projects.length);
        } else {
          // Scroll up - stop at About Me (index 0)
          if (activeIndex > 0) {
            onProjectChange(activeIndex - 1);
          }
        }
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [isHovering, activeIndex, projects.length, onProjectChange]);

  // Calculate rotation angle for the dial based on active index.
  // Items are spread across 180° of the RIGHT semicircle.
  // Item 0 is at the top (90°), last item is at the bottom (-90°).
  // We rotate the dial so the active item lands at 0° (3 o'clock / right-center).
  const getDialRotation = (activeIdx: number, total: number) => {
    const angleStep = 180 / (total - 1);
    // Item 0 starts at +90° (top), each subsequent item is angleStep lower
    const itemAngle = 90 - activeIdx * angleStep;
    // We need to rotate by -itemAngle to bring it to 0°
    return -itemAngle;
  };

  const handleKnobChange = (discipline: 'architecture' | 'productDesign' | 'software', value: number) => {
    const key = `${discipline}Emphasis` as keyof ControlState;
    onControlChange(key, value);
  };

  const handleKnobInteraction = (discipline: string, value: number, isInteracting: boolean) => {
    if (isInteracting) {
      const disciplineNames: Record<string, string> = {
        architecture: 'ARCH',
        productDesign: 'PROD',
        software: 'SOFT',
      };
      setActiveControl(disciplineNames[discipline]);
      setControlValue(`${Math.round(value)}%`);
    } else {
      setActiveControl(null);
      setControlValue(null);
    }
  };

  const handleSliderInteraction = (label: string, value: number, isInteracting: boolean) => {
    if (isInteracting) {
      setActiveControl(label);
      if (label === 'DETAIL') {
        const depth = Math.ceil((value / 100) * 5);
        setControlValue(`${depth}/5`);
      } else {
        const stages = ['CONCEPT', 'DEVELOP', 'REFINE', 'BUILD', 'FINAL'];
        const stageIndex = Math.floor((value / 100) * (stages.length - 1));
        setControlValue(stages[stageIndex]);
      }
    } else {
      setActiveControl(null);
      setControlValue(null);
    }
  };

  const currentProject = projects[activeIndex];
  const timelineDisabled = !currentProject.hasTimeline;
  const dialRotation = getDialRotation(activeIndex, projects.length);

  // Dial geometry constants
  const DIAL_RADIUS = 280;
  const DIAL_RIM_WIDTH = 20;
  const LABEL_RADIUS = DIAL_RADIUS - 40; // Labels sit inside the rim

  // Calculate label position on the RIGHT semicircle arc.
  // Index 0 = top (90°), last index = bottom (-90°).
  // Angles are in standard math convention (0° = right, 90° = up).
  const getLabelPosition = (index: number, total: number) => {
    const angleStep = 180 / (total - 1);
    const angleDeg = 90 - index * angleStep; // 90° → -90°
    const angleRad = (angleDeg * Math.PI) / 180;

    const x = LABEL_RADIUS * Math.cos(angleRad);
    const y = -LABEL_RADIUS * Math.sin(angleRad); // SVG y is inverted

    // Text rotation: we want text to read along the tangent.
    // Tangent angle = angleDeg + 90° for text that reads "outward" along the arc.
    // But we want it readable (not upside down), so we adjust:
    // For labels on the right semicircle, rotating by -(90 - angleDeg) keeps them
    // roughly horizontal-ish and readable, with slight arc curvature.
    const textRotation = -angleDeg;

    return { x, y, textRotation };
  };

  return (
    <div
      ref={containerRef}
      className="relative h-full"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Display Screen - Top Left */}
      <div className="absolute top-6 left-6 z-20">
        <DisplayScreen
          currentProjectIndex={activeIndex}
          currentProjectTitle={currentProject.title}
          activeControl={activeControl}
          controlValue={controlValue}
          disciplineValues={{
            architecture: controls.architectureEmphasis,
            productDesign: controls.productDesignEmphasis,
            software: controls.softwareEmphasis,
          }}
        />
      </div>

      {/* Three Knobs - Top Right */}
      <div className="absolute top-6 right-6 flex gap-4 z-20">
        <Knob
          value={controls.architectureEmphasis}
          onChange={(val) => handleKnobChange('architecture', val)}
          label="ARCH"
          onInteractionChange={(isInteracting) => 
            handleKnobInteraction('architecture', controls.architectureEmphasis, isInteracting)
          }
        />
        <Knob
          value={controls.productDesignEmphasis}
          onChange={(val) => handleKnobChange('productDesign', val)}
          label="PROD"
          onInteractionChange={(isInteracting) => 
            handleKnobInteraction('productDesign', controls.productDesignEmphasis, isInteracting)
          }
        />
        <Knob
          value={controls.softwareEmphasis}
          onChange={(val) => handleKnobChange('software', val)}
          label="SOFT"
          onInteractionChange={(isInteracting) => 
            handleKnobInteraction('software', controls.softwareEmphasis, isInteracting)
          }
        />
      </div>

      {/* Two Toggle Switches - Below Knobs */}
      <div className="absolute top-44 right-6 flex gap-4 z-20">
        <ToggleSwitch
          value={controls.viewMode === 'hero'}
          onChange={(val) => onControlChange('viewMode', val ? 'hero' : 'breakdown')}
          label="HERO VIEW"
        />
        <ToggleSwitch
          value={controls.showMetadata}
          onChange={(val) => onControlChange('showMetadata', val)}
          label="META DATA"
        />
      </div>

      {/* Two Vertical Sliders - Bottom */}
      <div className="absolute bottom-6 right-6 flex gap-6 z-20">
        <VerticalSlider
          value={controls.detailDepth}
          onChange={(val) => onControlChange('detailDepth', val)}
          label="DETAIL"
          onInteractionChange={(isInteracting) => 
            handleSliderInteraction('DETAIL', controls.detailDepth, isInteracting)
          }
        />
        <VerticalSlider
          value={controls.timelineProgress}
          onChange={(val) => onControlChange('timelineProgress', val)}
          label="TIME"
          disabled={timelineDisabled}
          onInteractionChange={(isInteracting) => 
            handleSliderInteraction('STAGE', controls.timelineProgress, isInteracting)
          }
        />
      </div>

      {/* Physical Half-Dial */}
      {/* 
        The SVG is positioned so that its origin (0,0) sits at the left edge 
        of the container, vertically centered. The RIGHT semicircle is drawn 
        into positive X space (visible), while the left half is clipped by 
        overflow:hidden on the container.
        
        viewBox: we need to see from x=0 out to x~320, and y from -320 to +320.
        We include a little negative X for the shadow/bevel.
      */}
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute top-1/2 -translate-y-1/2"
          style={{
            left: '-300px', // Push center of dial to left edge of container
            width: '620px',
            height: '700px',
          }}
          viewBox="-310 -340 620 680"
        >
          <defs>
            {/* Radial gradient for brushed metal effect */}
            <radialGradient id="metalGradient" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#d4d4d4" />
              <stop offset="40%" stopColor="#c8c8c8" />
              <stop offset="75%" stopColor="#b0b0b0" />
              <stop offset="100%" stopColor="#9a9a9a" />
            </radialGradient>

            {/* Concentric groove pattern centered on dial origin */}
            <pattern id="grooves" patternUnits="userSpaceOnUse" x="-300" y="-300" width="600" height="600">
              {Array.from({ length: 30 }, (_, i) => (
                <circle
                  key={i}
                  cx="300"
                  cy="300"
                  r={20 + i * 10}
                  fill="none"
                  stroke="#999"
                  strokeWidth="0.4"
                  opacity="0.12"
                />
              ))}
            </pattern>

            {/* Drop shadow */}
            <filter id="dialShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="10" />
              <feOffset dx="4" dy="4" result="offsetblur" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.25" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Specular highlight for bevel */}
            <linearGradient id="rimHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.15" />
            </linearGradient>

            {/* Clip to right semicircle only */}
            <clipPath id="rightHalf">
              <rect x="0" y="-320" width="320" height="640" />
            </clipPath>
          </defs>

          {/* Rotating group — rotates around origin (0,0) which is dial center */}
          <motion.g
            animate={{ rotate: dialRotation }}
            transition={{
              type: 'spring',
              stiffness: 80,
              damping: 18,
              mass: 1.2,
            }}
            style={{ originX: '0px', originY: '0px' }}
          >
            {/* Full disc (will be clipped to right half by parent overflow:hidden) */}
            {/* Outer disc with shadow */}
            <circle
              cx="0"
              cy="0"
              r={DIAL_RADIUS}
              fill="url(#metalGradient)"
              filter="url(#dialShadow)"
            />

            {/* Groove texture */}
            <circle
              cx="0"
              cy="0"
              r={DIAL_RADIUS}
              fill="url(#grooves)"
            />

            {/* Outer rim highlight (bevel effect) */}
            <circle
              cx="0"
              cy="0"
              r={DIAL_RADIUS}
              fill="none"
              stroke="url(#rimHighlight)"
              strokeWidth="3"
            />

            {/* Inner rim line for depth */}
            <circle
              cx="0"
              cy="0"
              r={DIAL_RADIUS - DIAL_RIM_WIDTH}
              fill="none"
              stroke="#a0a0a0"
              strokeWidth="0.5"
              opacity="0.4"
            />

            {/* Subtle inner shadow ring */}
            <circle
              cx="0"
              cy="0"
              r={DIAL_RADIUS - DIAL_RIM_WIDTH - 2}
              fill="none"
              stroke="#888"
              strokeWidth="0.3"
              opacity="0.2"
            />

            {/* Project labels — fixed to disc, rotate with it */}
            {projects.map((project, index) => {
              const { x, y, textRotation } = getLabelPosition(index, projects.length);
              const isActive = index === activeIndex;
              
              return (
                <g
                  key={project.id}
                  transform={`translate(${x}, ${y}) rotate(${textRotation})`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => onProjectChange(index)}
                >
                  <text
                    fill={isActive ? '#dc2626' : '#6b7280'}
                    fontSize="14"
                    fontWeight={isActive ? '700' : '400'}
                    fontFamily="'SF Mono', 'Fira Code', 'Courier New', monospace"
                    textAnchor="start"
                    dominantBaseline="middle"
                    letterSpacing="1"
                    style={{ textTransform: 'uppercase' }}
                    className="select-none"
                  >
                    {project.title}
                  </text>
                  
                  {/* Underline for active item */}
                  {isActive && (
                    <motion.line
                      x1="0"
                      y1="10"
                      x2={project.title.length * 8}
                      y2="10"
                      stroke="#dc2626"
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </g>
              );
            })}
          </motion.g>

          {/* 
            Static selection arrow — FIXED at 0° (3 o'clock / right-center).
            This does NOT rotate. It sits just outside the label radius.
          */}
          <g transform={`translate(${LABEL_RADIUS - 55}, 0)`}>
            <path
              d="M 0 -8 L 10 0 L 0 8"
              fill="none"
              stroke="#dc2626"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      </div>

      {/* Scroll hint */}
      {isHovering && (
        <div className="absolute bottom-8 left-8 text-[10px] text-gray-500 font-mono uppercase tracking-wider">
          Scroll to navigate
        </div>
      )}
    </div>
  );
}
