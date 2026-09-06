import { useState, useEffect, useCallback, useRef } from "react"
import type {
  HomeHero,
  MemberLetter,
  MomentPhoto,
  ClotheslinePhoto,
  ComebackEra,
} from "../data"
import "./BirthdayExperience.css"

export type BirthdayStage =
  | "opening"
  | "beginning"
  | "childhood"
  | "growing"
  | "becoming-jiwoo"
  | "moments"
  | "letter"
  | "birthday"
  | "archive"

interface BirthdayExperienceProps {
  stage?: BirthdayStage
  homeHero?: HomeHero
  predebutPhotos?: ClotheslinePhoto[]
  momentPhotos?: MomentPhoto[]
  memberLetters?: MemberLetter[]
  comebacks?: ComebackEra[]
  onStageChange: (stage: BirthdayStage) => void
}

export default function BirthdayExperience({
  stage,
  memberLetters = [],
  onStageChange,
}: BirthdayExperienceProps) {
  // Active scene index: 0 through 6 (Exactly 7 Major Narrative Scenes)
  const [activeScene, setActiveScene] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionDirection, setTransitionDirection] = useState<"forward" | "backward">("forward")
  const transitionTimeoutRef = useRef<number | null>(null)

  const letter = memberLetters[0] || {
    from: "Heart2Heart",
    message: "Thank you for always making every room feel safe, warm, and inspiring.",
  }

  // Advancing to next scene
  const goToNextScene = useCallback(() => {
    if (isTransitioning) return
    if (activeScene < 6) {
      setIsTransitioning(true)
      setTransitionDirection("forward")
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current)
      transitionTimeoutRef.current = window.setTimeout(() => {
        setActiveScene((prev) => prev + 1)
        setIsTransitioning(false)
      }, 380)
    }
  }, [activeScene, isTransitioning])

  // Stepping back
  const goToPrevScene = useCallback(() => {
    if (isTransitioning) return
    if (activeScene > 0) {
      setIsTransitioning(true)
      setTransitionDirection("backward")
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current)
      transitionTimeoutRef.current = window.setTimeout(() => {
        setActiveScene((prev) => prev - 1)
        setIsTransitioning(false)
      }, 380)
    }
  }, [activeScene, isTransitioning])

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter" || e.key === "ArrowRight" || e.key === "ArrowDown") {
        if (activeScene < 6) {
          e.preventDefault()
          goToNextScene()
        }
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        if (activeScene > 0) {
          e.preventDefault()
          goToPrevScene()
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [activeScene, goToNextScene, goToPrevScene])

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current)
    }
  }, [])

  if (stage === "archive") return null

  return (
    <div
      className={`story-film-canvas pure-narrative scene-state-${activeScene} ${
        isTransitioning ? `anim-trans-${transitionDirection}` : "anim-settled"
      }`}
      onClick={(e) => {
        const target = e.target as HTMLElement
        if (target.closest(".story-door-btn") || target.closest(".story-scene-nav-prev")) return
        if (activeScene < 6) {
          goToNextScene()
        }
      }}
      role="region"
      aria-label="Jiwoo Interactive Pure Narrative Storyline"
      tabIndex={0}
    >
      {/* ── Warm Ambient Paper Glow ── */}
      <div className="story-film-ambient" aria-hidden="true" />
      <div className="story-film-grain" aria-hidden="true" />

      {/* ── Central Stage Viewport (Pure Typography, No Cards on Scenes 1-6) ── */}
      <main className="story-stage-viewport">
        {/* ══════════════════════════════════════════════════════════════════
            SCENE 01: THE GIRL WITH A DREAM (Direct Floating Typography)
            ══════════════════════════════════════════════════════════════════ */}
        {activeScene === 0 && (
          <div className="story-scene-container narrative-scene scene-01">
            <div className="story-floating-content">
              <h1 className="story-display-serif">
                Before the stage,<br />
                <em>there was a little girl with a dream.</em>
              </h1>

              <div className="story-prose-block">
                <p className="story-lead-quote">
                  Long before the lights, the music,<br />
                  and the name Hearts2Hearts…
                </p>
                <div className="story-name-accent">
                  <span>there was Jiwoo.</span>
                </div>
                <p className="story-lead-quote">
                  the girl who once dreamed of dancing.
                </p>
              </div>

              <div className="story-click-hint" aria-hidden="true">
                <span className="story-click-hint-dot" />
                <span>click anywhere or press space to continue</span>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            SCENE 02: SEVEN YEARS (Monumental Typographic Event)
            ══════════════════════════════════════════════════════════════════ */}
        {activeScene === 1 && (
          <div className="story-scene-container narrative-scene scene-02">
            <div className="story-floating-content">
              <p className="story-prose-opener">
                At the age of twelve, she became a trainee.
              </p>
              <p className="story-prose-subopener">
                From sixth grade, she began a journey that would last nearly seven years.
              </p>

              {/* Monumental Typography Visual Event */}
              <div className="story-monumental-typography" aria-label="7 YEARS">
                <span className="story-huge-number">7</span>
                <span className="story-huge-unit">YEARS</span>
              </div>

              <div className="story-clean-prose-passage">
                <p className="story-passage-main">
                  "Seven years of training. Seven years of waiting.<br />
                  Seven years of growing up while chasing a dream."
                </p>
                <div className="story-quote-divider" aria-hidden="true" />
                <p className="story-passage-sub">
                  To follow that dream, she eventually had to leave ballet behind.<br />
                  It wasn't a small decision. <strong>But she kept going.</strong>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            SCENE 03: 2025 (THE DEBUT PAYOFF)
            ══════════════════════════════════════════════════════════════════ */}
        {activeScene === 2 && (
          <div className="story-scene-container narrative-scene scene-03">
            <div className="story-floating-content">              
              <p className="story-prose-opener">
                And then, after nearly seven years of waiting…
              </p>
              <h2 className="story-display-serif">
                the dream finally had a stage.
              </h2>

              <div className="story-clean-monument">
                <span className="story-monument-year">2025</span>
                <h1 className="story-monument-brand">HEARTS2HEARTS</h1>
                <span className="story-monument-tagline">She debuted.</span>
              </div>

              <div className="story-song-lyric">
                <p>"I love the way you love the chase."</p>
                <cite>— The Chase · Debut Single</cite>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            SCENE 04: A NEW ROLE (LEADERSHIP)
            ══════════════════════════════════════════════════════════════════ */}
        {activeScene === 3 && (
          <div className="story-scene-container narrative-scene scene-04">
            <div className="story-floating-content">              
              <h2 className="story-display-serif">
                A new team.<br />
                <em>A new beginning.</em>
              </h2>

              <p className="story-prose-middle">
                And then came another role she never knew she would carry.
              </p>

              <div className="story-leader-callout">
                <span className="story-leader-sub">Not just a member.</span>
                <h1 className="story-leader-huge">A LEADER.</h1>
              </div>

              <div className="story-clean-passage">
                <p>
                  From trainee to debutant,<br />
                  from chasing a dream to helping lead a team.
                </p>
                <div className="story-quote-divider" aria-hidden="true" />
                <p className="story-warm-accent-line">
                  Now, she doesn't walk this journey alone.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            SCENE 05: THE MEMORIES WE MADE (MILESTONES & BONDS)
            ══════════════════════════════════════════════════════════════════ */}
        {activeScene === 4 && (
          <div className="story-scene-container narrative-scene scene-05">
            <div className="story-floating-content">              
              <h2 className="story-display-serif">
                And the journey didn't stop at debut.
              </h2>
              <p className="story-prose-opener">
                Together, they began making memories of their own.
              </p>

              <div className="story-clean-milestones-row">
                <span>FIRST STAGE</span>
                <span className="story-milestone-sep">·</span>
                <span>FIRST AWARD</span>
                <span className="story-milestone-sep">·</span>
                <span>FIRST MILESTONE</span>
                <span className="story-milestone-sep">·</span>
                <span>ANOTHER MEMORY</span>
              </div>

              <div className="story-clean-letter-passage">
                <p className="story-letter-body">"{letter.message}"</p>
                <cite className="story-letter-author">— {letter.from}</cite>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            SCENE 06: LOOK HOW FAR YOU'VE COME (RETROSPECTIVE)
            ══════════════════════════════════════════════════════════════════ */}
        {activeScene === 5 && (
          <div className="story-scene-container narrative-scene scene-06">
            <div className="story-floating-content">              
              <h1 className="story-display-serif">
                Look how far<br />
                <em>you've come.</em>
              </h1>

              <div className="story-clean-retro-list">
                <div className="story-clean-retro-step">
                  <p>From a little girl who dreamed of dancing…</p>
                </div>
                <div className="story-clean-retro-step">
                  <p>to a trainee who spent nearly seven years chasing that dream…</p>
                </div>
                <div className="story-clean-retro-step">
                  <p>to finally standing on stage as a member of Hearts2Hearts.</p>
                </div>
              </div>

              <div className="story-clean-retro-climax">
                <span>And now, as its leader.</span>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            SCENE 07: FOR JIWOO (FINALE CARD & GATEWAY)
            Only the final scene features the deliberate editorial tribute card
            ══════════════════════════════════════════════════════════════════ */}
        {activeScene === 6 && (
          <div className="story-scene-container narrative-scene scene-07">
            <div className="story-editorial-card finale-card">
              <span className="story-badge-label">FOR JIWOO · FEBRUARY 2026</span>
              
              <h1 className="story-display-serif finale-heading">
                Happy Birthday,<br />
                <em>Jiwoo.</em>
              </h1>

              <div className="story-blessing-paragraphs">
                <p>May you always remember the girl who dreamed of dancing.</p>
                <p>May you be proud of the girl who never gave up.</p>
                <p>And may the road ahead be even more beautiful than the one behind you.</p>
              </div>

              <div className="story-quote-divider" aria-hidden="true" />

              <div className="story-promise-block">
                <p className="story-promise-quote">"Seven years brought you here. But this is only the beginning."</p>
                <p className="story-promise-detail">
                  There are still so many stages to stand on, so many memories to make,<br />
                  so many dreams waiting to become real.
                </p>
              </div>

              <div className="story-final-declaration">
                <span className="story-declaration-title">JIWOO, THIS IS YOUR STORY.</span>
                <span className="story-declaration-heart">Happy Birthday, Jiwoo. ♡</span>
              </div>

              {/* Solitary Portal into Main Website */}
              <div className="story-portal-action">
                <button
                  type="button"
                  className="story-door-btn"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "instant" })
                    onStageChange("archive")
                  }}
                >
                  <span>ENTER THE MEMORIES</span>
                  <span className="story-door-arrow" aria-hidden="true">→</span>
                </button>
                <span className="story-door-note">Explore the full archive, letters & memories</span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ── Persistent Editorial Footer ── */}
      <footer className="story-persistent-footer">
        <div className="story-footer-left">
          {activeScene > 0 && (
            <button
              type="button"
              className="story-scene-nav-prev"
              onClick={(e) => {
                e.stopPropagation()
                goToPrevScene()
              }}
              title="Previous Chapter"
            >
              <span className="story-nav-arrow" aria-hidden="true">←</span>
              <span>back</span>
            </button>
          )}
        </div>

        {/* Progress Step Indicators */}
        <div className="story-footer-center">
          <div className="story-steps-track" role="tablist" aria-label="Story Chapters">
            {[0, 1, 2, 3, 4, 5, 6].map((idx) => (
              <button
                key={idx}
                type="button"
                className={`story-step-dot ${idx === activeScene ? "active" : ""} ${
                  idx < activeScene ? "completed" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveScene(idx)
                }}
                aria-label={`Go to chapter ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="story-footer-right">
          {activeScene < 6 ? (
            <button
              type="button"
              className="story-forward-prompt"
              onClick={(e) => {
                e.stopPropagation()
                goToNextScene()
              }}
            >
              <span className="story-forward-text">continue</span>
              <span className="story-forward-arrow" aria-hidden="true">→</span>
            </button>
          ) : (
            <span className="story-finale-end-hint">story complete</span>
          )}
        </div>
      </footer>
    </div>
  )
}