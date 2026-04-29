import type { Project } from '@/types';

export interface HeroPageProps {
  projects: Project[];
  onOpen: (id: number) => void;
}

export function HeroPage({ projects, onOpen }: HeroPageProps) {
  return (
    <article className="page page-hero">
      <header className="hero-head">
        <div className="hero-eyebrow">PORTFOLIO · 2025</div>
        <h1 className="hero-title">A portfolio<br /><em>you can tune.</em></h1>
        <p className="hero-sub">
          I'm <strong>Daniel</strong> — a designer working between architecture, product, and software.
          The console on the left is the navigation: turn the knobs, flip the toggles, scroll the slot.
        </p>
        <div className="hero-legend">
          <div className="hero-legend-item"><span className="lg-num">01</span><span className="lg-key">PROJECTS</span><span className="lg-desc">Scroll the slot to flip through the work.</span></div>
          <div className="hero-legend-item"><span className="lg-num">02</span><span className="lg-key">DISCIPLINE MIX</span><span className="lg-desc">Turn the knobs to weight order by discipline.</span></div>
          <div className="hero-legend-item"><span className="lg-num">03</span><span className="lg-key">VIEW</span><span className="lg-desc">Toggle hero, metadata, and detail depth.</span></div>
          <div className="hero-legend-item"><span className="lg-num">04</span><span className="lg-key">ASK</span><span className="lg-desc">Type a question and route the panel.</span></div>
        </div>
      </header>
      <section className="hero-index">
        <div className="hero-index-head"><span>— {String(projects.length).padStart(2, '0')} PROJECTS</span><span className="hero-index-rule" /><span>2021 — 2025</span></div>
        <ol className="hero-index-list">
          {projects.map((p, i) => (
            <li key={p.id} className="hero-index-row" onClick={() => onOpen(p.id)}>
              <span className="hir-num">{String(i).padStart(2, '0')}</span>
              <span className="hir-title">{p.title}</span>
              <span className="hir-cat">{p.metadata.category}</span>
              <span className="hir-mix">A {p.disciplines.arch} · P {p.disciplines.prod} · S {p.disciplines.sw}</span>
              <span className="hir-arrow">→</span>
            </li>
          ))}
        </ol>
      </section>
      <footer className="page-footer"><span>DANIEL · UTSoA</span><span>v1.0 · {new Date().getFullYear()}</span><span>daniel@example.com</span></footer>
    </article>
  );
}
