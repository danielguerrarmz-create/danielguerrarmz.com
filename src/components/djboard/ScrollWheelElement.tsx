export interface ScrollWheelElementProps {
  /** Drives rib translation animation (e.g. active project index). */
  offset: number;
}

const RIB_COUNT = 14;
const RIB_SPACING = 5;

export function ScrollWheelElement({ offset }: ScrollWheelElementProps) {
  const translateY = (offset % RIB_COUNT) * RIB_SPACING;
  const ribs = Array.from({ length: RIB_COUNT + 8 }, (_, i) => i);

  return (
    <div
      style={{
        width: '100%',
        flex: 1,
        minHeight: '80px',
        alignSelf: 'stretch',
        borderRadius: '11px',
        background: 'linear-gradient(to right, #c0c0c0, #d4d4d4, #c0c0c0)',
        border: '1px solid rgba(0,0,0,0.18)',
        boxShadow:
          '0 1px 3px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.6)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '18px',
          height: '2px',
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 2,
          borderRadius: '1px',
        }}
        aria-hidden
      />
      <div
        style={{
          position: 'absolute',
          inset: '4px 3px',
          overflow: 'hidden',
          borderRadius: '8px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: `${RIB_SPACING}px`,
            paddingTop: '4px',
            transform: `translateY(-${translateY}px)`,
            transition: 'transform 120ms ease-out',
          }}
        >
          {ribs.map((i) => (
            <div
              key={i}
              style={{
                width: '18px',
                height: '1px',
                backgroundColor: 'rgba(0,0,0,0.12)',
                boxShadow: '0 1px 0 rgba(255,255,255,0.5)',
                flexShrink: 0,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
