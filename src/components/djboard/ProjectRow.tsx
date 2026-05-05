import { useState } from 'react';
import type { Project } from '@/types';

export interface ProjectRowProps {
  project: Project;
  state: 'prev' | 'active' | 'next';
  onClick?: () => void;
}

export function ProjectRow({ project, state, onClick }: ProjectRowProps) {
  const [hover, setHover] = useState(false);
  const num = String(project.id).padStart(2, '0');
  const title = project.slotLabel ?? project.title;

  if (state === 'active') {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 8px',
          backgroundColor: '#ffffff',
          borderRadius: '3px',
          border: '1px solid rgba(0,0,0,0.08)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          cursor: 'default',
        }}
      >
        <div
          style={{
            width: '2px',
            alignSelf: 'stretch',
            minHeight: '28px',
            backgroundColor: '#dc2626',
            borderRadius: '1px',
            marginRight: '4px',
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontSize: '0.68rem',
            fontWeight: 400,
            letterSpacing: '0.08em',
            color: '#dc2626',
            flexShrink: 0,
          }}
        >
          {num}
        </span>
        <span
          style={{
            fontSize: '0.88rem',
            fontWeight: 700,
            letterSpacing: '0.01em',
            color: '#111',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {title}
        </span>
      </div>
    );
  }

  const faded = state !== 'active' && !hover ? 0.45 : state !== 'active' ? 0.7 : 1;

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '4px 8px',
        cursor: 'pointer',
        borderRadius: '3px',
        opacity: faded,
        transition: 'opacity 150ms ease',
        border: 'none',
        background: 'transparent',
        width: '100%',
        textAlign: 'left',
        font: 'inherit',
      }}
    >
      <span
        style={{
          fontSize: '0.68rem',
          fontWeight: 400,
          letterSpacing: '0.08em',
          color: 'rgba(0,0,0,0.38)',
          flexShrink: 0,
        }}
      >
        {num}
      </span>
      <span
        style={{
          fontSize: '0.75rem',
          fontWeight: 400,
          letterSpacing: '0.01em',
          color: 'rgba(0,0,0,0.42)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {title}
      </span>
    </button>
  );
}
