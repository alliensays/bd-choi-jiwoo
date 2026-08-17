import { useState } from 'react'
import type { HobbySection } from '../data'

export default function ProfileSection({ sections }: { sections: HobbySection[] }) {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <section
      id="profile"
      style={{ background: '#faf9f6', borderTop: '1px solid #ece6de' }}
      className="py-24 px-6"
    >
      <div style={{ maxWidth: '1080px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              letterSpacing: '0.45em',
              color: '#8a9a80',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '14px',
            }}
          >
            지우의 방 · Jiwoo's Room
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.6rem, 5.5vw, 4rem)',
              fontWeight: 300,
              color: '#1e1a16',
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            All About{' '}
            <em style={{ color: '#5a7050' }}>Jiwoo</em>
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontStyle: 'italic',
              color: 'rgba(30,26,22,0.48)',
              fontSize: '15px',
              marginTop: '14px',
              lineHeight: 1.6,
            }}
          >
            Click any card to discover what she loves.
          </p>
        </div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '14px',
          }}
        >
          {sections.map((section) => {
            const isOpen = openId === section.id
            return (
              <div
                key={section.id}
                role="button"
                tabIndex={0}
                onClick={() => setOpenId(isOpen ? null : section.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setOpenId(isOpen ? null : section.id)
                }}
                className="profile-card"
                style={{
                  background: isOpen ? section.bg : '#ffffff',
                  border: `1px solid ${isOpen ? section.border : '#ece6de'}`,
                  borderRadius: '18px',
                  padding: '20px 22px',
                  cursor: 'pointer',
                  transition: 'background 0.3s ease, border-color 0.3s ease',
                  userSelect: 'none',
                  outline: 'none',
                }}
              >
                {/* Card header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '13px',
                    marginBottom: isOpen ? '18px' : '0',
                  }}
                >
                  <span style={{ fontSize: '22px', lineHeight: 1 }}>{section.icon}</span>

                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '17px',
                        fontWeight: 400,
                        color: '#1e1a16',
                        lineHeight: 1.2,
                      }}
                    >
                      {section.title}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '9px',
                        color: 'rgba(30,26,22,0.38)',
                        letterSpacing: '0.22em',
                        textTransform: 'uppercase',
                        marginTop: '3px',
                      }}
                    >
                      {section.subtitle}
                    </div>
                  </div>

                  {/* Toggle icon */}
                  <div
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      border: `1px solid ${isOpen ? section.border : '#ded8ce'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isOpen ? '#3a2e20' : 'rgba(30,26,22,0.3)',
                      fontSize: '16px',
                      fontWeight: 300,
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease, border-color 0.3s ease',
                      flexShrink: 0,
                      lineHeight: 1,
                    }}
                  >
                    +
                  </div>
                </div>

                {/* Expanded items */}
                {isOpen && (
                  <div
                    style={{
                      borderTop: `1px solid ${section.border}`,
                      paddingTop: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                    }}
                  >
                    {section.items.map((item, i) => (
                      <div
                        key={i}
                        style={{ display: 'flex', gap: '11px', alignItems: 'flex-start' }}
                      >
                        <div
                          style={{
                            width: '5px',
                            height: '5px',
                            borderRadius: '50%',
                            background: section.border,
                            flexShrink: 0,
                            marginTop: '7px',
                          }}
                        />
                        <div>
                          <div
                            style={{
                              fontFamily: 'var(--font-display)',
                              fontSize: '14px',
                              color: '#1e1a16',
                              fontWeight: 400,
                              lineHeight: 1.3,
                            }}
                          >
                            {item.name}
                          </div>
                          <div
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontStyle: 'italic',
                              fontSize: '12.5px',
                              color: 'rgba(30,26,22,0.48)',
                              lineHeight: 1.55,
                              marginTop: '2px',
                            }}
                          >
                            {item.detail}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
