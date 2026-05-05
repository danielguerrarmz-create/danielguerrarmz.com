import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { KnobControl } from './controls/KnobControl';
import { ToggleSwitch } from './controls/ToggleSwitch';
import { ProjectRow } from './ProjectRow';
import type { ViewControls, DisciplineMix, Project } from '@/types';

const RIB_COUNT = 10;
const RIB_SPACING = 10;
const RIB_CYCLE = RIB_COUNT * RIB_SPACING;

/** H2 — Zone labels (INSTRUCTIONS, PROJECTS, VIEW, DISCIPLINE MIX) */
const zoneLabelStyle: CSSProperties = {
  fontSize: '0.6rem',
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: 'rgba(0,0,0,0.38)',
  fontFamily: 'inherit',
  fontWeight: 400,
};

const counterStyle: CSSProperties = {
  fontSize: '0.68rem',
  fontWeight: 400,
  letterSpacing: '0.08em',
  color: 'rgba(0,0,0,0.38)',
  fontVariantNumeric: 'tabular-nums',
};

export interface DJBoardProps {
  projects: Project[];
  activeIndex: number;
  onProjectChange: (index: number) => void;
  disciplineMix: DisciplineMix;
  onDisciplineChange: (knob: 'arch' | 'prod' | 'sw', value: number) => void;
  viewControls: ViewControls;
  onControlChange: (key: keyof ViewControls, value: unknown) => void;
  narratorMessage: string;
  onGoHome: () => void;
}

function HomeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 10 10" aria-hidden>
      <path
        d="M1 4.5L5 1.5L9 4.5M2 4.2V8.5H8V4.2"
        fill="none"
        stroke="#333"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DJBoard({
  projects,
  activeIndex,
  onProjectChange,
  disciplineMix,
  onDisciplineChange,
  viewControls,
  onControlChange,
  narratorMessage,
  onGoHome,
}: DJBoardProps) {
  const zone2Ref = useRef<HTMLDivElement>(null);
  const textColumnRef = useRef<HTMLDivElement>(null);
  const [pillHeight, setPillHeight] = useState(0);
  const [ribOffset, setRibOffset] = useState(0);
  const len = projects.length;
  const safeIndex = len > 0 ? Math.min(activeIndex, len - 1) : 0;
  const prevIndex = len > 0 ? (safeIndex - 1 + len) % len : 0;
  const nextIndex = len > 0 ? (safeIndex + 1) % len : 0;

  useEffect(() => {
    const el = zone2Ref.current;
    if (!el || len === 0) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY === 0) return;
      const direction = e.deltaY > 0 ? 1 : -1;
      if (e.deltaY > 0) {
        onProjectChange((safeIndex + 1) % len);
      } else {
        onProjectChange((safeIndex - 1 + len) % len);
      }
      setRibOffset((prev) => {
        const next = prev + direction * RIB_SPACING;
        return ((next % RIB_CYCLE) + RIB_CYCLE) % RIB_CYCLE;
      });
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [len, onProjectChange, safeIndex]);

  useLayoutEffect(() => {
    const el = textColumnRef.current;
    if (!el) return;
    setPillHeight(el.offsetHeight);
  }, [activeIndex, len, safeIndex]);

  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: 'calc(100vw * 7 / 24)',
        height: '100vh',
        backgroundColor: '#e8e8e8',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        zIndex: 30,
        borderRight: '1px solid rgba(0,0,0,0.1)',
      }}
    >
      {/* Zone 1 */}
      <div
        style={{
          flexShrink: 0,
          height: '28%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            height: '48px',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '0 12px',
            borderBottom: '1px solid rgba(0,0,0,0.08)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              onClick={onGoHome}
              aria-label="Home"
              style={{
                width: '28px',
                height: '28px',
                border: '1px solid rgba(0,0,0,0.2)',
                borderRadius: '3px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                background: '#f0f0f0',
                padding: 0,
              }}
            >
              <HomeIcon />
            </button>
            <span
              style={{
                fontSize: '0.85rem',
                letterSpacing: '0.18em',
                fontWeight: 700,
                color: '#111',
                textTransform: 'uppercase',
              }}
            >
              DANIEL A. GUERRA
            </span>
          </div>
        </div>

        <div
          style={{
            flex: 1,
            minHeight: 0,
            padding: '8px 12px 10px 12px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <span style={zoneLabelStyle}>INSTRUCTIONS</span>
          <div
            style={{
              flex: 1,
              minHeight: 0,
              backgroundColor: '#f5f5f5',
              border: '1px solid rgba(0,0,0,0.1)',
              borderRadius: '4px',
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.06)',
              padding: '8px 10px',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'flex-start',
            }}
          >
            <p
              style={{
                margin: 0,
                fontFamily: 'inherit',
                fontSize: '0.88rem',
                lineHeight: 1.5,
              }}
            >
              <span
                style={{
                  fontFamily: 'inherit',
                  color: '#dc2626',
                  fontWeight: 700,
                  letterSpacing: '0.01em',
                }}
              >
                &gt; daniel:{' '}
              </span>
              <span
                style={{
                  fontFamily: 'inherit',
                  color: '#111',
                  fontWeight: 400,
                  letterSpacing: '0.01em',
                }}
              >
                {narratorMessage}
              </span>
              <span
                style={{
                  fontFamily: 'inherit',
                  color: '#dc2626',
                  fontWeight: 400,
                  animation: 'blink 0.66s step-end infinite',
                }}
              >
                |
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Zone 2 — PROJECTS */}
      <div
        ref={zone2Ref}
        style={{
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          overflow: 'hidden',
          borderTop: '1px solid rgba(0,0,0,0.1)',
          borderBottom: '1px solid rgba(0,0,0,0.1)',
          padding: '0',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 12px 6px 12px',
            flexShrink: 0,
          }}
        >
          <span style={zoneLabelStyle}>PROJECTS</span>
          <span style={counterStyle}>{len === 0 ? '0 / 0' : `${safeIndex + 1} / ${len}`}</span>
        </div>

        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'center',
              gap: '12px',
              padding: '0 16px 8px 16px',
              flexShrink: 0,
            }}
          >
          <div
            style={{
              width: '22px',
              height: pillHeight > 0 ? `${pillHeight}px` : 'auto',
              flexShrink: 0,
              borderRadius: '11px',
              background: 'linear-gradient(to right, #c0c0c0, #d4d4d4, #c0c0c0)',
              border: '1px solid rgba(0,0,0,0.18)',
              boxShadow:
                '0 1px 3px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.6)',
              overflow: 'hidden',
              minHeight: '60px',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                transform: `translateY(${ribOffset % RIB_CYCLE}px)`,
                transition: 'transform 120ms ease-out',
                display: 'flex',
                flexDirection: 'column',
                gap: `${RIB_SPACING - 1}px`,
                padding: '4px 0',
              }}
            >
              {Array.from({ length: RIB_COUNT + 4 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: '14px',
                    height: '1px',
                    alignSelf: 'center',
                    backgroundColor:
                      i === Math.floor((RIB_COUNT + 4) / 2)
                        ? 'rgba(0,0,0,0.45)'
                        : 'rgba(0,0,0,0.12)',
                    borderRadius: '0.5px',
                    flexShrink: 0,
                  }}
                />
              ))}
            </div>
          </div>

          <div
            ref={textColumnRef}
            style={{
              flex: 1,
              maxWidth: '320px',
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 0,
            }}
          >
            {len === 0 ? (
              <span
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 400,
                  color: 'rgba(0,0,0,0.38)',
                }}
              >
                No projects
              </span>
            ) : (
              <>
                <ProjectRow
                  project={projects[prevIndex]}
                  state="prev"
                  onClick={() => onProjectChange(prevIndex)}
                />
                <div
                  style={{
                    height: '1px',
                    backgroundColor: 'rgba(0,0,0,0.08)',
                    margin: '1.5px 0',
                  }}
                />
                <ProjectRow project={projects[safeIndex]} state="active" />
                <div
                  style={{
                    height: '1px',
                    backgroundColor: 'rgba(0,0,0,0.08)',
                    margin: '1.5px 0',
                  }}
                />
                <ProjectRow
                  project={projects[nextIndex]}
                  state="next"
                  onClick={() => onProjectChange(nextIndex)}
                />
              </>
            )}
          </div>
        </div>
        </div>
      </div>

      {/* Zone 3 */}
      <div
        style={{
          height: '180px',
          flexShrink: 0,
          borderTop: '1px solid rgba(0,0,0,0.1)',
          padding: '6px 12px 8px 12px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <span style={zoneLabelStyle}>VIEW</span>
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            padding: '0 16px 0 16px',
            minHeight: 0,
          }}
        >
          <KnobControl
            label="DETAIL"
            value={viewControls.detailDepth}
            onChange={(v) => onControlChange('detailDepth', v)}
            size={72}
            sensitivity={0.706}
            tooltip="Controls content density — low shows images only, high shows full documentation."
          />
          <div
            style={{
              width: '1px',
              height: '90px',
              backgroundColor: 'rgba(0,0,0,0.1)',
              flexShrink: 0,
            }}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              alignItems: 'center',
            }}
          >
            <ToggleSwitch
              label="META"
              value={viewControls.metadataEnabled}
              onChange={(v) => onControlChange('metadataEnabled', v)}
              tooltip="Show or hide project metadata: date, collaborators, tools, and awards."
            />
            <ToggleSwitch
              label="HERO"
              value={viewControls.heroEnabled}
              onChange={(v) => onControlChange('heroEnabled', v)}
              tooltip="Toggle the hero image or video at the top of each project page."
            />
          </div>
        </div>
      </div>

      {/* Zone 4 */}
      <div
        style={{
          height: '280px',
          flexShrink: 0,
          borderTop: '1px solid rgba(0,0,0,0.1)',
          padding: '6px 12px 10px 12px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <span style={zoneLabelStyle}>DISCIPLINE MIX</span>
        <div
          style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            alignItems: 'center',
            minHeight: 0,
          }}
        >
          <KnobControl
            label="ARCH"
            value={disciplineMix.arch}
            onChange={(v) => onDisciplineChange('arch', v)}
            size={72}
            sensitivity={0.706}
            tooltip="Weight toward architecture projects. Higher value surfaces arch-heavy work first."
          />
          <KnobControl
            label="PROD"
            value={disciplineMix.prod}
            onChange={(v) => onDisciplineChange('prod', v)}
            size={72}
            sensitivity={0.706}
            tooltip="Weight toward product design projects. Adjusts project ordering accordingly."
          />
          <KnobControl
            label="SW"
            value={disciplineMix.sw}
            onChange={(v) => onDisciplineChange('sw', v)}
            size={72}
            sensitivity={0.706}
            tooltip="Weight toward software projects. Surfaces code and systems work higher."
          />
        </div>
        <div
          style={{
            marginTop: '8px',
            padding: '6px 0 8px 0',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            borderTop: '1px solid rgba(0,0,0,0.08)',
            flexShrink: 0,
          }}
        >
          {(
            [
              { label: 'A', value: disciplineMix.arch, color: '#dc2626' },
              { label: 'P', value: disciplineMix.prod, color: '#b45309' },
              { label: 'S', value: disciplineMix.sw, color: '#555' },
            ] as const
          ).map(({ label, value, color }) => (
            <div
              key={label}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <span
                style={{
                  fontSize: '0.58rem',
                  fontWeight: 400,
                  letterSpacing: '0.1em',
                  color: 'rgba(0,0,0,0.35)',
                  width: '8px',
                  flexShrink: 0,
                  fontFamily: 'monospace',
                }}
              >
                {label}
              </span>
              <div
                style={{
                  flex: 1,
                  height: '4px',
                  backgroundColor: 'rgba(0,0,0,0.08)',
                  borderRadius: '2px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${Math.max(0, Math.min(100, value))}%`,
                    height: '100%',
                    backgroundColor: color,
                    borderRadius: '2px',
                    transition: 'width 200ms ease',
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: '0.58rem',
                  fontWeight: 400,
                  letterSpacing: '0.05em',
                  color: 'rgba(0,0,0,0.35)',
                  width: '22px',
                  textAlign: 'right',
                  fontVariantNumeric: 'tabular-nums',
                  fontFamily: 'monospace',
                }}
              >
                {Math.round(value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
