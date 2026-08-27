import { useState } from "react"
import type { HomeHero, MemberLetter, MomentPhoto, ClotheslinePhoto } from "../data"

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
  stage: BirthdayStage
  homeHero: HomeHero
  predebutPhotos: ClotheslinePhoto[]
  momentPhotos: MomentPhoto[]
  memberLetters: MemberLetter[]
  onStageChange: (stage: BirthdayStage) => void
}

const sceneOrder: BirthdayStage[] = [
  "opening",
  "beginning",
  "childhood",
  "growing",
  "becoming-jiwoo",
  "moments",
  "letter",
  "birthday",
  "archive",
]

export default function BirthdayExperience({
  stage,
  homeHero,
  predebutPhotos,
  momentPhotos,
  memberLetters,
  onStageChange,
}: BirthdayExperienceProps) {
  const [letterOpen, setLetterOpen] = useState(false)
  const sceneIndex = sceneOrder.indexOf(stage)
  const childhood = predebutPhotos.slice(0, 2)
  const growing = predebutPhotos.slice(2, 5)
  const selectedMoments = momentPhotos.slice(0, 3)
  const letter = memberLetters[0]

  const next = () => {
    const nextStage = sceneOrder[Math.min(sceneIndex + 1, sceneOrder.length - 1)]
    onStageChange(nextStage)
  }

  const image = (src: string, alt: string, className = "") => (
    <img className={`birthday-image ${className}`} src={src} alt={alt} />
  )

  if (stage === "archive") return null

  return (
    <main className={`birthday-experience birthday-stage-${stage}`}>
      <div className="birthday-scene-glow" aria-hidden="true" />
      <div className="birthday-scene-content">
        <p className="birthday-eyebrow">A birthday story for Jiwoo</p>

        {stage === "opening" && (
          <section className="birthday-opening">
            <p className="birthday-scene-number">01 / 08</p>
            <h1>Every story begins somewhere.</h1>
            <p className="birthday-copy">A little story about growing, dreaming, and becoming.</p>
            <button className="birthday-action" onClick={next}>Enter Her Story</button>
          </section>
        )}

        {stage === "beginning" && (
          <section className="birthday-frame birthday-frame-split">
            <div>
              <p className="birthday-scene-number">02 / 08</p>
              <h1>This is Jiwoo.</h1>
              <p className="birthday-copy">Before the name, before the stage, there was a quiet beginning.</p>
              <button className="birthday-action" onClick={next}>Continue</button>
            </div>
            {image(homeHero.src, homeHero.alt, "birthday-hero-image")}
          </section>
        )}

        {stage === "childhood" && (
          <section className="birthday-frame">
            <p className="birthday-scene-number">03 / 08</p>
            <h1>Before the lights, there was a dream.</h1>
            <p className="birthday-copy">Before the stage, there was simply a girl who kept looking forward.</p>
            <div className="birthday-memory-row">
              {childhood.map((photo) => image(photo.src, photo.alt, "birthday-memory-image"))}
            </div>
            <button className="birthday-action" onClick={next}>Continue</button>
          </section>
        )}

        {stage === "growing" && (
          <section className="birthday-frame">
            <p className="birthday-scene-number">04 / 08</p>
            <h1>Years of growing.</h1>
            <p className="birthday-copy">Every practice, every small step, quietly shaped the artist she would become.</p>
            <div className="birthday-memory-row birthday-memory-row-wide">
              {growing.map((photo) => image(photo.src, photo.alt, "birthday-memory-image"))}
            </div>
            <button className="birthday-action" onClick={next}>Continue</button>
          </section>
        )}

        {stage === "becoming-jiwoo" && (
          <section className="birthday-frame birthday-turning-point">
            <p className="birthday-scene-number">05 / 08</p>
            <p className="birthday-whisper">Years of dreaming.<br />Years of growing.<br />And then...</p>
            <h1>The dream became real.</h1>
            <button className="birthday-action" onClick={next}>Continue</button>
          </section>
        )}

        {stage === "moments" && (
          <section className="birthday-frame">
            <p className="birthday-scene-number">06 / 08</p>
            <h1>A story is made of little moments.</h1>
            <div className="birthday-memory-row">
              {selectedMoments.map((photo) => image(photo.src, photo.alt, "birthday-memory-image"))}
            </div>
            <button className="birthday-action" onClick={next}>Continue</button>
          </section>
        )}

        {stage === "letter" && (
          <section className="birthday-frame birthday-letter-scene">
            <p className="birthday-scene-number">07 / 08</p>
            {!letterOpen ? (
              <button className="birthday-envelope" onClick={() => setLetterOpen(true)} aria-label="Open birthday letter">
                <span>For Jiwoo</span>
              </button>
            ) : (
              <div className="birthday-letter">
                <p>Dear {letter?.to || "Jiwoo"},</p>
                <p>{letter?.message || "Thank you for growing into someone so wonderfully yourself."}</p>
                <p>With love,<br />your biggest fans</p>
                <button className="birthday-action" onClick={next}>Continue</button>
              </div>
            )}
          </section>
        )}

        {stage === "birthday" && (
          <section className="birthday-frame birthday-reveal">
            <p className="birthday-scene-number">08 / 08</p>
            <h1>Happy Birthday, Jiwoo.</h1>
            <p className="birthday-copy">May every new chapter feel more and more like yours.</p>
            <button className="birthday-action" onClick={next}>Enter Jiwoo&apos;s Archive</button>
          </section>
        )}
      </div>
      <div className="birthday-progress" aria-hidden="true">
        {sceneOrder.slice(0, -1).map((scene, index) => (
          <span key={scene} className={index <= sceneIndex ? "is-active" : ""} />
        ))}
      </div>
    </main>
  )
}