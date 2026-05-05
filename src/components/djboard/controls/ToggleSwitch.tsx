import { ControlTooltip } from '../ControlTooltip';

export interface ToggleSwitchProps {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
  tooltip?: string;
}

const TRACK_W = 65;
const TRACK_H = 32;
const THUMB = 27;
const PAD = 2;
const THUMB_ON_LEFT = TRACK_W - THUMB - PAD;
const THUMB_TOP = (TRACK_H - THUMB) / 2;

export function ToggleSwitch({ label, value, onChange, tooltip }: ToggleSwitchProps) {
  return (
    <div
      role="switch"
      aria-checked={value}
      tabIndex={0}
      onClick={() => onChange(!value)}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          onChange(!value);
        }
      }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '5px',
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          width: `${TRACK_W}px`,
          height: `${TRACK_H}px`,
          borderRadius: '16px',
          backgroundColor: value ? '#dc2626' : 'rgba(0,0,0,0.15)',
          border: '1px solid rgba(0,0,0,0.2)',
          boxShadow: value
            ? 'inset 0 1px 2px rgba(0,0,0,0.2)'
            : 'inset 0 1px 3px rgba(0,0,0,0.12), 0 1px 0 rgba(255,255,255,0.6)',
          position: 'relative',
          transition: 'background-color 180ms ease',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: `${THUMB_TOP}px`,
            left: value ? `${THUMB_ON_LEFT}px` : `${PAD}px`,
            width: `${THUMB}px`,
            height: `${THUMB}px`,
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
            transition: 'left 180ms ease',
          }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        <span
          style={{
            fontSize: '0.62rem',
            fontWeight: 500,
            letterSpacing: '0.16em',
            color: value ? '#dc2626' : 'rgba(0,0,0,0.5)',
            textTransform: 'uppercase',
            fontFamily: 'monospace',
            transition: 'color 180ms ease',
          }}
        >
          {label}
        </span>
        {tooltip ? <ControlTooltip text={tooltip} /> : null}
      </div>
    </div>
  );
}
