import { useState } from 'react'
import type { HobbySection } from '../data'

export default function ProfileSection({ sections }: { sections: HobbySection[] }) {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <section
      id="profile"
      className="chapter-shell"
      style={{
        background: 'linear-gradient(180deg, #faf9f6 0%, #f5efe7 100%)',
        borderTop: '1px solid #ece6de',
        paddingTop: '84px',
        paddingBottom: '96px',
      }}
    >
      <div style={{ maxWidth: '1120px', margin: '0 auto', paddingLeft: '32px', paddingRight: '32px' }}>
        <div style={{ textAlign: 'center', marginBottom: '42px' }}>
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
              fontSize: 'clamp(2.8rem, 5.5vw, 4.5rem)',
              fontWeight: 300,
              color: '#1e1a16',
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            The little room where <em style={{ color: '#5a7050' }}>Jiwoo</em> keeps her world.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontStyle: 'italic',
              color: 'rgba(30,26,22,0.48)',
              fontSize: '15px',
              marginTop: '16px',
              lineHeight: 1.6,
              maxWidth: '620px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Click each object to open a small piece of her world.
          </p>
        </div>

        <div
          style={{
            position: 'relative',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.7), rgba(247,239,230,0.8))',
            border: '1px solid rgba(196,212,188,0.4)',
            borderRadius: '28px',
            padding: '26px 18px 18px',
            boxShadow: '0 18px 50px rgba(97,82,64,0.06)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '16px',
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
                  style={{
                    position: 'relative',
                    background: isOpen ? section.bg : '#fffdf9',
                    border: `1px solid ${isOpen ? section.border : '#e9dfd2'}`,
                    borderRadius: '22px',
                    padding: '22px 18px 18px',
                    minHeight: isOpen ? '220px' : '152px',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    userSelect: 'none',
                    outline: 'none',
                    boxShadow: isOpen ? '0 16px 36px rgba(105,92,75,0.08)' : 'none',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '52px',
                          height: '52px',
                          borderRadius: '16px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'rgba(255,255,255,0.5)',
                          fontSize: '26px',
                          border: `1px solid ${section.border}`,
                        }}
                      >
                        {section.icon}
                      </div>

                      <div>
                        <div
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '18px',
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
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            marginTop: '4px',
                          }}
                        >
                          {section.subtitle}
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        border: `1px solid ${section.border}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#3a2e20',
                        fontSize: '20px',
                        transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                        transition: 'transform 0.25s ease',
                      }}
                    >
                      +
                    </div>
                  </div>

                  {isOpen && (
                    <div
                      style={{
                        borderTop: `1px solid ${section.border}`,
                        marginTop: '16px',
                        paddingTop: '14px',
                        display: 'grid',
                        gap: '10px',
                      }}
                    >
                      {section.items.map((item, i) => (
                        <div
                          key={i}
                          style={{
                            display: 'flex',
                            gap: '10px',
                            alignItems: 'flex-start',
                          }}
                        >
                          <div
                            style={{
                              width: '7px',
                              height: '7px',
                              borderRadius: '50%',
                              background: section.border,
                              marginTop: '7px',
                              flexShrink: 0,
                            }}
                          />
                          <div>
                            <div
                              style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '15px',
                                color: '#1e1a16',
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
                                color: 'rgba(30,26,22,0.52)',
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
      </div>
    </section>
  )
}
