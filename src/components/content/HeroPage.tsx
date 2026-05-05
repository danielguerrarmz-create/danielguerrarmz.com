import { useEffect, useMemo, useState } from 'react';

export interface HeroPageProps {
  architectureEmphasis: number;
  productDesignEmphasis: number;
  softwareEmphasis: number;
  onProjectChange: (id: number) => void;
}

interface LandingProject {
  id: number;
  title: string;
  category: string;
  A: number;
  P: number;
  S: number;
  span: number;
}

interface CardLayout {
  colSpan: number;
  rowSpan: number;
}

interface CardData extends CardLayout {
  cardIndex: number;
  grayValue: number;
}

const projects: LandingProject[] = [
  {
    id: 0,
    title: 'About Me',
    category: 'Personal',
    A: 33,
    P: 33,
    S: 34,
    span: 2,
  },
  {
    id: 1,
    title: 'Pressure Ulcer Medical Device',
    category: 'Medical Product Design',
    A: 5,
    P: 85,
    S: 10,
    span: 1,
  },
  {
    id: 2,
    title: 'Search by Assembly: Node-Based Precedent Engine',
    category: 'Research Software',
    A: 20,
    P: 25,
    S: 55,
    span: 1,
  },
  {
    id: 3,
    title: 'Hydraulic Commons: Water Infrastructure',
    category: 'Infrastructural Architecture',
    A: 70,
    P: 15,
    S: 15,
    span: 2,
  },
  {
    id: 4,
    title: 'Synergy with the Cosmos',
    category: 'Zero-Mile Architecture',
    A: 75,
    P: 10,
    S: 15,
    span: 1,
  },
  {
    id: 5,
    title: 'Dougherty Arts Center Renovation',
    category: 'Adaptive Reuse',
    A: 80,
    P: 10,
    S: 10,
    span: 2,
  },
];

const projectCardLayouts: Record<number, CardLayout[]> = {
  0: [
    { colSpan: 2, rowSpan: 2 },
    { colSpan: 1, rowSpan: 1 },
    { colSpan: 1, rowSpan: 1 },
    { colSpan: 1, rowSpan: 2 },
    { colSpan: 2, rowSpan: 1 },
    { colSpan: 1, rowSpan: 1 },
  ],
  1: [
    { colSpan: 1, rowSpan: 2 },
    { colSpan: 2, rowSpan: 1 },
    { colSpan: 1, rowSpan: 1 },
    { colSpan: 1, rowSpan: 1 },
    { colSpan: 2, rowSpan: 2 },
    { colSpan: 1, rowSpan: 1 },
  ],
  2: [
    { colSpan: 1, rowSpan: 1 },
    { colSpan: 1, rowSpan: 1 },
    { colSpan: 1, rowSpan: 2 },
    { colSpan: 2, rowSpan: 1 },
    { colSpan: 1, rowSpan: 1 },
    { colSpan: 2, rowSpan: 1 },
  ],
  3: [
    { colSpan: 3, rowSpan: 2 },
    { colSpan: 1, rowSpan: 1 },
    { colSpan: 1, rowSpan: 1 },
    { colSpan: 1, rowSpan: 2 },
    { colSpan: 2, rowSpan: 1 },
    { colSpan: 1, rowSpan: 1 },
  ],
  4: [
    { colSpan: 2, rowSpan: 2 },
    { colSpan: 1, rowSpan: 1 },
    { colSpan: 1, rowSpan: 1 },
    { colSpan: 1, rowSpan: 1 },
    { colSpan: 2, rowSpan: 1 },
    { colSpan: 1, rowSpan: 1 },
  ],
  5: [
    { colSpan: 1, rowSpan: 2 },
    { colSpan: 2, rowSpan: 1 },
    { colSpan: 1, rowSpan: 1 },
    { colSpan: 1, rowSpan: 1 },
    { colSpan: 3, rowSpan: 2 },
    { colSpan: 1, rowSpan: 1 },
  ],
};

const getWeightedScore = (
  project: LandingProject,
  A: number,
  P: number,
  S: number
) => {
  return (project.A * A + project.P * P + project.S * S) / 100;
};

function getProjectCards(project: LandingProject): CardData[] {
  return (projectCardLayouts[project.id] ?? []).map((layout, i) => ({
    ...layout,
    cardIndex: i,
    grayValue: 80 + ((project.id * 4 + i * 2) % 14),
  }));
}

interface GalleryCardProps {
  project: LandingProject;
  card: CardData;
  onClick: () => void;
  isReordering: boolean;
}

function GalleryCard({ project, card, onClick, isReordering }: GalleryCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onClick();
        }
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        gridColumn: `span ${card.colSpan}`,
        gridRow: `span ${card.rowSpan}`,
        position: 'relative',
        cursor: 'pointer',
        borderRadius: '3px',
        overflow: 'hidden',
        // Future: backgroundImage: `url(/images/projects/${project.id}/gallery_${card.cardIndex}.jpg)`
        // Recommended dimensions per colSpan × rowSpan:
        // 1×1: 600×360px, 2×1: 1200×360px, 3×1: 1800×360px
        // 1×2: 600×720px, 2×2: 1200×720px, 3×2: 1800×720px
        backgroundColor: `hsl(0, 0%, ${card.grayValue}%)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'transform 220ms ease, opacity 300ms ease',
        transform: hovered ? 'scale(1.012)' : 'scale(1)',
        opacity: isReordering ? 0 : 1,
      }}
    >
      {card.cardIndex === 0 && (
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            zIndex: 2,
          }}
        >
          <span
            style={{
              fontSize: '0.5rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.7)',
              backgroundColor: 'rgba(0,0,0,0.3)',
              padding: '3px 7px',
              borderRadius: '2px',
              backdropFilter: 'blur(4px)',
            }}
          >
            {String(project.id).padStart(2, '0')} · {project.category}
          </span>
        </div>
      )}

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 50%)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 220ms ease',
        }}
      />

      {hovered && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '16px 16px',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(5px)',
            transition: 'opacity 220ms ease, transform 220ms ease',
            zIndex: 2,
          }}
        >
          <span
            style={{
              display: 'block',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.2,
            }}
          >
            {project.title}
          </span>
        </div>
      )}

      {card.cardIndex === 0 && hovered && (
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '26px',
            height: '26px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
          }}
        >
          <span style={{ fontSize: '0.6rem', color: '#111' }}>→</span>
        </div>
      )}
    </div>
  );
}

export function HeroPage({
  architectureEmphasis,
  productDesignEmphasis,
  softwareEmphasis,
  onProjectChange,
}: HeroPageProps) {
  const sortedProjects = useMemo(() => {
    return [...projects].sort(
      (a, b) =>
        getWeightedScore(
          b,
          architectureEmphasis,
          productDesignEmphasis,
          softwareEmphasis
        ) -
        getWeightedScore(
          a,
          architectureEmphasis,
          productDesignEmphasis,
          softwareEmphasis
        )
    );
  }, [architectureEmphasis, productDesignEmphasis, softwareEmphasis]);

  const sortKey = useMemo(
    () => sortedProjects.map((project) => project.id).join('-'),
    [sortedProjects]
  );
  const [isReordering, setIsReordering] = useState(false);

  useEffect(() => {
    setIsReordering(true);
    const timeoutId = window.setTimeout(() => setIsReordering(false), 150);
    return () => window.clearTimeout(timeoutId);
  }, [sortKey]);

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
          padding: '60px 48px 100px 48px',
          backgroundColor: '#f5f4f2',
        }}
      >
        <div
          key={sortKey}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridAutoRows: '180px',
            gap: '10px',
          }}
        >
          {sortedProjects.flatMap((project, projectIndex) => {
            const cards = getProjectCards(project).map((card) => (
              <GalleryCard
                key={`${project.id}-${card.cardIndex}`}
                project={project}
                card={card}
                onClick={() => onProjectChange(project.id)}
                isReordering={isReordering}
              />
            ));

            if (projectIndex === sortedProjects.length - 1) {
              return cards;
            }

            return [
              ...cards,
              <div
                key={`separator-${project.id}`}
                style={{
                  gridColumn: 'span 3',
                  height: '1px',
                  backgroundColor: 'rgba(0,0,0,0.07)',
                  margin: '4px 0',
                }}
              />,
            ];
          })}
        </div>
      </section>
    </article>
  );
}
