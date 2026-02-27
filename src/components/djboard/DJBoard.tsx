import { Knob } from './controls/Knob';
import { ToggleSwitch } from './controls/ToggleSwitch';
import { VerticalSlider } from './controls/VerticalSlider';
import { ZoneBracket } from './ZoneBracket';
import { InfoTooltip } from './InfoTooltip';
import { InstructionsDisplay } from './InstructionsDisplay';
import { SlotNavigation } from './SlotNavigation';
import { AskBar } from './AskBar';
import type { ViewControls, DisciplineMix, Project } from '@/types';

export interface DJBoardProps {
  projects: Project[];
  activeIndex: number;
  onProjectChange: (index: number) => void;
  disciplineMix: DisciplineMix;
  onDisciplineChange: (knob: 'arch' | 'prod' | 'sw', value: number) => void;
  viewControls: ViewControls;
  onControlChange: (key: keyof ViewControls, value: unknown) => void;
  narratorMessage: string;
  onAskSubmit: (question: string) => void;
  askResponse: string | null;
  onAskFocus?: () => void;
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
  onAskSubmit,
  askResponse,
  onAskFocus,
}: DJBoardProps) {
  return (
    <div
      className="fixed left-0 top-0 h-screen bg-[#e8e8e8] z-30"
      style={{ width: 'calc(100vw * 7 / 24)' }}
    >
      <div
        className="h-full p-4 min-h-0"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr 1fr 1fr 1fr',
          gap: '12px',
        }}
      >
        <div
          style={{
            gridColumn: '1 / 3',
            gridRow: '1 / 2',
            minHeight: 0,
            overflow: 'hidden',
          }}
        >
          <ZoneBracket label="INSTRUCTIONS" className="h-full">
            <InstructionsDisplay message={narratorMessage} className="h-full" />
          </ZoneBracket>
        </div>

        <div
          style={{
            gridColumn: '1 / 2',
            gridRow: '2 / 4',
            minHeight: 0,
            overflow: 'hidden',
          }}
        >
          <ZoneBracket label="PROJECTS" className="h-full">
            <SlotNavigation
              projects={projects}
              activeIndex={activeIndex}
              onProjectChange={onProjectChange}
              className="h-full"
            />
          </ZoneBracket>
        </div>

        <div
          style={{
            gridColumn: '2 / 3',
            gridRow: '2 / 3',
            minHeight: 0,
            overflow: 'hidden',
          }}
        >
          <ZoneBracket label="ASK" className="h-full">
            <AskBar
              onSubmit={onAskSubmit}
              response={askResponse}
              onFocus={onAskFocus}
            />
          </ZoneBracket>
        </div>

        <div
          style={{
            gridColumn: '2 / 3',
            gridRow: '3 / 4',
            minHeight: 0,
            overflow: 'hidden',
          }}
        >
          <ZoneBracket label="VIEW" className="h-full">
            <div className="flex h-full min-h-0 gap-2">
              <div className="flex-[1] flex flex-col items-center min-h-0">
                <div className="flex-1 min-h-0 w-full flex flex-col items-center">
                  <VerticalSlider
                    value={viewControls.detailDepth}
                    onChange={(val) => onControlChange('detailDepth', val)}
                    label="DETAIL"
                    size="lg"
                    fillHeight
                  />
                </div>
                <InfoTooltip text="Content density — images ↔ full docs" />
              </div>
              <div className="flex-[1] flex flex-col items-center justify-between min-h-0">
                <div className="flex flex-col items-center mt-3">
                  <ToggleSwitch
                    value={viewControls.metadataEnabled}
                    onChange={(val) => onControlChange('metadataEnabled', val)}
                    label="META"
                    size="lg"
                    orientation="horizontal"
                  />
                  <InfoTooltip text="Show project metadata" />
                </div>
                <div className="flex flex-col items-center">
                  <ToggleSwitch
                    value={viewControls.heroEnabled}
                    onChange={(val) => onControlChange('heroEnabled', val)}
                    label="HERO"
                    size="lg"
                    orientation="horizontal"
                  />
                  <InfoTooltip text="Toggle hero image or video" />
                </div>
              </div>
            </div>
          </ZoneBracket>
        </div>

        <div
          style={{
            gridColumn: '1 / 3',
            gridRow: '4 / 5',
            minHeight: 0,
            overflow: 'hidden',
          }}
        >
          <ZoneBracket label="DISCIPLINE MIX" className="h-full">
            <div className="flex items-center justify-around h-full">
              <div className="flex flex-col items-center gap-1">
                <Knob
                  value={disciplineMix.arch}
                  onChange={(val) => onDisciplineChange('arch', val)}
                  label="ARCH"
                  size="lg"
                />
                <div
                  className="font-mono text-center"
                  style={{
                    fontSize: '12px',
                    color:
                      disciplineMix.arch === 0
                        ? '#ccc'
                        : disciplineMix.arch > 50
                          ? '#dc2626'
                          : '#1a1a1a',
                  }}
                >
                  {Math.round(disciplineMix.arch)}%
                </div>
                <InfoTooltip text="Weight architecture projects higher" />
              </div>
              <div className="flex flex-col items-center gap-1">
                <Knob
                  value={disciplineMix.prod}
                  onChange={(val) => onDisciplineChange('prod', val)}
                  label="PROD"
                  size="lg"
                />
                <div
                  className="font-mono text-center"
                  style={{
                    fontSize: '12px',
                    color:
                      disciplineMix.prod === 0
                        ? '#ccc'
                        : disciplineMix.prod > 50
                          ? '#dc2626'
                          : '#1a1a1a',
                  }}
                >
                  {Math.round(disciplineMix.prod)}%
                </div>
                <InfoTooltip text="Weight product design projects higher" />
              </div>
              <div className="flex flex-col items-center gap-1">
                <Knob
                  value={disciplineMix.sw}
                  onChange={(val) => onDisciplineChange('sw', val)}
                  label="SW"
                  size="lg"
                />
                <div
                  className="font-mono text-center"
                  style={{
                    fontSize: '12px',
                    color:
                      disciplineMix.sw === 0
                        ? '#ccc'
                        : disciplineMix.sw > 50
                          ? '#dc2626'
                          : '#1a1a1a',
                  }}
                >
                  {Math.round(disciplineMix.sw)}%
                </div>
                <InfoTooltip text="Weight software projects higher" />
              </div>
            </div>
          </ZoneBracket>
        </div>
      </div>
    </div>
  );
}
