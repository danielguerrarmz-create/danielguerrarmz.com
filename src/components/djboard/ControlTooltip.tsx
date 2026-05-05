import { useState } from 'react';

export interface ControlTooltipProps {
  text: string;
}

export function ControlTooltip({ text }: ControlTooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <div
        style={{
          width: '13px',
          height: '13px',
          borderRadius: '50%',
          border: `1px solid ${visible ? '#dc2626' : 'rgba(0,0,0,0.25)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'default',
          transition: 'border-color 150ms ease',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontSize: '0.45rem',
            color: visible ? '#dc2626' : 'rgba(0,0,0,0.35)',
            fontFamily: 'monospace',
            fontWeight: 700,
            lineHeight: 1,
            transition: 'color 150ms ease',
            userSelect: 'none',
          }}
        >
          ?
        </span>
      </div>

      {visible && (
        <div
          style={{
            position: 'absolute',
            bottom: '18px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 100,
            pointerEvents: 'none',
          }}
        >
          <div
            className="control-tooltip-bubble"
            style={{
              backgroundColor: '#1a1a1a',
              color: '#f0f0f0',
              fontSize: '0.6rem',
              fontFamily: 'monospace',
              lineHeight: 1.45,
              padding: '6px 9px',
              borderRadius: '4px',
              maxWidth: '160px',
              whiteSpace: 'normal',
              boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
              position: 'relative',
            }}
          >
            {text}
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 0,
                height: 0,
                borderLeft: '5px solid transparent',
                borderRight: '5px solid transparent',
                borderTop: '5px solid #1a1a1a',
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
