export interface ToggleSwitchProps {
  value: boolean;
  onChange: (value: boolean) => void;
  label: string;
  size?: 'default' | 'sm' | 'lg';
  fillContainer?: boolean;
  orientation?: 'vertical' | 'horizontal';
  onInteractionChange?: (isInteracting: boolean) => void;
}

export function ToggleSwitch({
  value,
  onChange,
  label,
  onInteractionChange,
}: ToggleSwitchProps) {
  return (
    <div className="toggle-wrap">
      <button
        type="button"
        onClick={() => onChange(!value)}
        onMouseDown={() => onInteractionChange?.(true)}
        onMouseUp={() => onInteractionChange?.(false)}
        onMouseLeave={() => onInteractionChange?.(false)}
        className={`toggle ${value ? 'is-on' : ''}`}
      >
        <div className="toggle-thumb" />
      </button>
      <div className="toggle-label"><span className={value ? 'is-on' : ''}>{label}</span></div>
    </div>
  );
}
