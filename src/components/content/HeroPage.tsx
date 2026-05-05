import { useState, useMemo } from 'react';
import type { Project } from '@/types';

export interface HeroPageProps {
  projects: Project[];
  onOpen: (id: number) => void;
}

/** Visual order + row spans for brickwork grid (maps to real `Project.id`). */
const GALLERY_GRID_ORDER: readonly { projectId: number; span: number }[] = [
  { projectId: 0, span: 2 },
  { projectId: 2, span: 1 },
  { projectId: 4, span: 1 },
  { projectId: 3, span: 2 },
  { projectId: 5, span: 1 },
  { projectId: 1, span: 2 },
];

export interface GalleryItem {
  id: number;
  title: string;
  category: string;
  span: number;
  heroUrl: string;
}

function buildGalleryItems(projects: Project[]): GalleryItem[] {
  const byId = new Map(projects.map((p) => [p.id, p]));
  return GALLERY_GRID_ORDER.map(({ projectId, span }) => {
    const p = byId.get(projectId);
    if (!p) {
      throw new Error(`Hero gallery: missing project id ${projectId}`);
    }
    return {
      id: p.id,
      title: p.title,
      category: p.metadata.category,
      span,
      heroUrl: p.assets.hero,
    };
  });
}

interface GalleryCardProps {
  item: GalleryItem;
  onClick: (id: number) => void;
}

function GalleryCard({ item, onClick }: GalleryCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onClick(item.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(item.id);
        }
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        gridRow: `span ${item.span}`,
        position: 'relative',
        cursor: 'pointer',
        borderRadius: '4px',
        overflow: 'hidden',
        backgroundColor: '#e0dedd',
        transition: 'transform 200ms ease',
        transform: hovered ? 'scale(1.015)' : 'scale(1)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: `hsl(0, 0%, ${82 + (item.id * 3) % 10}%)`,
          backgroundImage: item.heroUrl ? `url(${item.heroUrl})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0) 55%)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 200ms ease',
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '20px 18px',
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0)' : 'translateY(6px)',
          transition: 'opacity 200ms ease, transform 200ms ease',
        }}
      >
        <span
          style={{
            display: 'block',
            fontSize: '0.55rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.65)',
            marginBottom: '4px',
          }}
        >
          {item.category}
        </span>
        <span
          style={{
            display: 'block',
            fontSize: '1rem',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.25,
          }}
        >
          {item.title}
        </span>
      </div>

      <div
        style={{
          position: 'absolute',
          top: '14px',
          right: '14px',
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.85)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'scale(1)' : 'scale(0.8)',
          transition: 'opacity 200ms ease, transform 200ms ease',
        }}
      >
        <span style={{ fontSize: '0.65rem', color: '#111' }}>→</span>
      </div>
    </div>
  );
}

export function HeroPage({ projects, onOpen }: HeroPageProps) {
  const galleryItems = useMemo(() => buildGalleryItems(projects), [projects]);

  return (
    <article
      className="page page-hero"
      style={{
        maxWidth: '100%',
        margin: 0,
        padding: 0,
      }}
    >
      <section
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 64px 0 64px',
          position: 'relative',
          boxSizing: 'border-box',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: '40px',
            left: '64px',
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            color: 'rgba(0,0,0,0.35)',
            textTransform: 'uppercase',
          }}
        >
          Portfolio · 2026
        </span>

        <div style={{ maxWidth: '680px' }}>
          <h1
            style={{
              fontSize: 'clamp(3.5rem, 6vw, 5.5rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              color: '#111',
              margin: '0 0 0 0',
              letterSpacing: '-0.02em',
            }}
          >
            A portfolio
          </h1>

          <h1
            style={{
              fontSize: 'clamp(3.5rem, 6vw, 5.5rem)',
              fontWeight: 800,
              fontStyle: 'italic',
              lineHeight: 1.05,
              color: '#dc2626',
              margin: '0 0 32px 0',
              letterSpacing: '-0.02em',
            }}
          >
            you can tune.
          </h1>

          <p
            style={{
              fontSize: '1.1rem',
              lineHeight: 1.65,
              color: '#444',
              maxWidth: '520px',
              margin: '0 0 48px 0',
              fontWeight: 400,
            }}
          >
            I'm{' '}
            <strong style={{ color: '#111', fontWeight: 700 }}>Daniel</strong>{' '}
            — a designer working between architecture, product, and software. The
            console on the left is the navigation: turn the knobs, flip the
            toggles, scroll the slot.
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: 'rgba(0,0,0,0.35)',
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            <div
              style={{
                width: '1px',
                height: '32px',
                backgroundColor: 'rgba(0,0,0,0.2)',
              }}
            />
            Scroll to explore
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '64px',
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            justifyContent: 'flex-end',
          }}
        >
          {['Architecture', 'Product Design', 'Software'].map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: '0.6rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(0,0,0,0.35)',
                border: '1px solid rgba(0,0,0,0.15)',
                borderRadius: '2px',
                padding: '4px 8px',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section
        style={{
          padding: '80px 64px 80px 64px',
          backgroundColor: '#f5f4f2',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridAutoRows: '200px',
            gap: '12px',
          }}
        >
          {galleryItems.map((item) => (
            <GalleryCard key={item.id} item={item} onClick={onOpen} />
          ))}
        </div>
      </section>

      <hr
        style={{
          border: 'none',
          borderTop: '1px solid rgba(0,0,0,0.08)',
          margin: 0,
        }}
      />

      <section className="hero-index" style={{ padding: '0 64px' }}>
        <div className="hero-index-head">
          <span>— {String(projects.length).padStart(2, '0')} PROJECTS</span>
          <span className="hero-index-rule" />
          <span>2021 — 2025</span>
        </div>
        <ol className="hero-index-list">
          {projects.map((p, i) => (
            <li
              key={p.id}
              className="hero-index-row"
              onClick={() => onOpen(p.id)}
            >
              <span className="hir-num">{String(i).padStart(2, '0')}</span>
              <span className="hir-title">{p.title}</span>
              <span className="hir-cat">{p.metadata.category}</span>
              <span className="hir-mix">
                A {p.disciplines.arch} · P {p.disciplines.prod} · S{' '}
                {p.disciplines.sw}
              </span>
              <span className="hir-arrow">→</span>
            </li>
          ))}
        </ol>
      </section>

      <footer className="page-footer" style={{ padding: '0 64px 80px' }}>
        <span>DANIEL · UTSoA</span>
        <span>v1.0 · {new Date().getFullYear()}</span>
        <span>daniel@example.com</span>
      </footer>
    </article>
  );
}
