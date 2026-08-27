import type { ClotheslinePhoto } from '../data'

interface Props {
  items: ClotheslinePhoto[]
}

export default function Clothesline({ items }: Props) {
  return (
    <div style={{ overflowX: 'auto', overflowY: 'hidden', paddingBottom: '24px', WebkitOverflowScrolling: 'touch', touchAction: 'pan-x' }}>
      <div
        style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'flex-start',
          minWidth: '100%',
          paddingLeft: '56px',
          paddingRight: '56px',
          paddingTop: '0',
          gap: '44px',
          scrollSnapType: 'x mandatory',
        }}
      >
        {/* ─ The rope ─ */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '20px',
            left: 0,
            right: 0,
            height: '2px',
            background:
              'linear-gradient(to right, transparent 20px, #c8b89a 56px, #b0a080 50%, #c8b89a calc(100% - 56px), transparent calc(100% - 20px))',
            boxShadow: '0 1px 4px rgba(0,0,0,0.10)',
            zIndex: 0,
          }}
        />

        {items.map((item, i) => (
          <div
            key={i}
            className="clothesline-item"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
              zIndex: 1,
              flexShrink: 0,
              scrollSnapAlign: 'start',
            }}
          >
            {/* ─ Clothespin ─ */}
            <div
              aria-hidden
              style={{
                width: '13px',
                height: '34px',
                position: 'relative',
                flexShrink: 0,
              }}
            >
              {/* Pin body */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '11px',
                  height: '26px',
                  background: 'linear-gradient(160deg, #ddd0b0 0%, #b8a87a 100%)',
                  borderRadius: '2px 2px 0 0',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.18)',
                  zIndex: 2,
                }}
              />
              {/* Spring notch */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '2px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '9px',
                  height: '9px',
                  borderRadius: '50%',
                  background: '#c8b490',
                  border: '1.5px solid #a89868',
                  zIndex: 3,
                }}
              />
            </div>

            {/* ─ Photo ─ */}
            <div
              style={{
                transform: `rotate(${item.rotate}deg)`,
                transformOrigin: 'top center',
                marginTop: '2px',
                transition: 'transform 0.35s ease',
              }}
            >
              <div
                style={{
                  width: '188px',
                  height: '248px',
                  overflow: 'hidden',
                  background: '#e8e0d4',
                  boxShadow:
                    '0 4px 14px rgba(0,0,0,0.13), 0 1px 4px rgba(0,0,0,0.07)',
                }}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    filter: 'saturate(0.78) brightness(0.97)',
                  }}
                />
              </div>
            </div>

            {/* ─ Note card ─ */}
            <div
              style={{
                transform: `rotate(${-(item.rotate) * 0.32}deg)`,
                marginTop: '12px',
                width: '176px',
                background: item.noteColor,
                padding: '11px 13px 13px',
                boxShadow: '1px 3px 10px rgba(0,0,0,0.08)',
                borderLeft: '3px solid rgba(0,0,0,0.045)',
                borderBottom: '1px solid rgba(0,0,0,0.04)',
              }}
            >
              {/* Korean caption */}
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  color: 'rgba(30,22,14,0.4)',
                  letterSpacing: '0.08em',
                  marginBottom: '6px',
                  lineHeight: 1.4,
                }}
              >
                {item.noteKr}
              </p>
              {/* Handwritten text */}
              <p
                style={{
                  fontFamily: 'var(--font-handwrite)',
                  fontSize: '14.5px',
                  color: '#3a2e20',
                  lineHeight: 1.55,
                  whiteSpace: 'pre-line',
                }}
              >
                {item.noteText}
              </p>
              {/* Footer line */}
              <div
                style={{
                  marginTop: '9px',
                  paddingTop: '7px',
                  borderTop: '1px dashed rgba(0,0,0,0.09)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  color: 'rgba(30,22,14,0.32)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}
              >
                {item.year} · {item.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
