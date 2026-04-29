import { Knob } from './controls/Knob';
import { ToggleSwitch } from './controls/ToggleSwitch';
import { VerticalSlider } from './controls/VerticalSlider';
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
  onAskFocus?: () => void;
  onGoHome: () => void;
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
  onAskFocus,
  onGoHome,
}: DJBoardProps) {
  const mixBars = [
    { label: 'A', val: disciplineMix.arch, color: 'var(--accent)' },
    { label: 'P', val: disciplineMix.prod, color: 'var(--ink-70)' },
    { label: 'S', val: disciplineMix.sw, color: 'var(--ink-50)' },
  ];

  return (
    <aside className="panel">
      <header className="panel-head">
        <button type="button" className="panel-mark" onClick={onGoHome} aria-label="Home">⌂</button>
        <div className="panel-title">DANIEL</div>
        <div className="panel-led"><span className="panel-led-dot" /><span>LIVE</span></div>
      </header>

      <div className="panel-body">
        <section className="zone-bare grid-instructions">
          <div className="bare-label">Instructions</div>
          <InstructionsDisplay message={narratorMessage} />
        </section>

        <section className="zone-bare grid-projects">
          <div className="bare-label">Projects</div>
          <SlotNavigation projects={projects} activeIndex={activeIndex} onProjectChange={onProjectChange} />
        </section>

        <section className="zone-bare grid-ask">
          <div className="bare-label">Ask</div>
          <AskBar onSubmit={onAskSubmit} onFocus={onAskFocus} />
        </section>

        <section className="zone-bare grid-view">
          <div className="bare-label">View</div>
          <div className="view-grid">
            <VerticalSlider value={viewControls.detailDepth} onChange={(val) => onControlChange('detailDepth', val)} label="DETAIL" />
            <div className="toggles-col">
              <ToggleSwitch value={viewControls.metadataEnabled} onChange={(val) => onControlChange('metadataEnabled', val)} label="META" />
              <ToggleSwitch value={viewControls.heroEnabled} onChange={(val) => onControlChange('heroEnabled', val)} label="HERO" />
            </div>
          </div>
        </section>

        <section className="zone-bare grid-mix">
          <div className="bare-label">Discipline Mix</div>
          <div className="mix-grid">
            <Knob value={disciplineMix.arch} onChange={(val) => onDisciplineChange('arch', val)} label="ARCH" />
            <Knob value={disciplineMix.prod} onChange={(val) => onDisciplineChange('prod', val)} label="PROD" />
            <Knob value={disciplineMix.sw} onChange={(val) => onDisciplineChange('sw', val)} label="SW" />
          </div>
          <div className="mix-foot">
            <div className="mixmeter">
              {mixBars.map((b) => (
                <div key={b.label} className="mixmeter-row">
                  <span className="mixmeter-label">{b.label}</span>
                  <div className="mixmeter-track">
                    {Array.from({ length: 20 }).map((_, i) => {
                      const on = (i + 1) * 5 <= b.val;
                      return <div key={i} className={`mixmeter-cell ${on ? 'on' : ''}`} style={on ? { background: b.color } : undefined} />;
                    })}
                  </div>
                  <span className="mixmeter-num">{Math.round(b.val)}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </aside>
  );
}
