import { useState, useEffect, useRef } from "react"
import Clothesline from "./components/Clothesline"
import ProfileSection from "./components/ProfileSection"
import AdminPanel from "./components/AdminPanel"
import LoginPage from "./components/LoginPage"
import {
  homeHero as initialHomeHero,
  homePhotos as initialHomePhotos,
  predebutPhotos as initialPredebutPhotos,
  comebacks as initialComebacks,
  hobbySections as initialHobbySections,
} from "./data"

/* ─── Scroll-fade helper ─────────────────────────────────────────────────── */
function FadeIn({
  children,
  delay = 0,
  className,
  style,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ob = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true)
          ob.disconnect()
        }
      },
      { threshold: 0.1 },
    )
    ob.observe(el)
    return () => ob.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.85s ease ${delay}ms, transform 0.85s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

/* ─── Section label ──────────────────────────────────────────────────────── */
function Label({
  children,
  color = "#8a9a80",
}: {
  children: React.ReactNode
  color?: string
}) {
  return (
    <span
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "10px",
        letterSpacing: "0.45em",
        color,
        textTransform: "uppercase" as const,
        display: "block",
      }}
    >
      {children}
    </span>
  )
}

/* ─── Thin divider ───────────────────────────────────────────────────────── */
function Divider({
  color = "rgba(30,26,22,0.08)",
  width = "40px",
}: {
  color?: string
  width?: string
}) {
  return (
    <div
      style={{ width, height: "1px", background: color, margin: "14px auto" }}
    />
  )
}

/* ══════════════════════════════════════════════════════════════════════════ */
export default function App() {
  const [activeEra, setActiveEra] = useState(initialComebacks[0].id)
  const [homeHero, setHomeHero] = useState(initialHomeHero)
  const [homePhotos, setHomePhotos] = useState(initialHomePhotos)
  const [predebutPhotos, setPredebutPhotos] = useState(initialPredebutPhotos)
  const [comebacks, setComebacks] = useState(initialComebacks)
  const [hobbySections, setHobbySections] = useState(initialHobbySections)
  const [isAdmin, setIsAdmin] = useState(false)
  const [showLoginPage, setShowLoginPage] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [audioBlocked, setAudioBlocked] = useState(false)
  const [audioPlaying, setAudioPlaying] = useState(false)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const audioOscsRef = useRef<OscillatorNode[]>([])
  const audioTimeoutsRef = useRef<number[]>([])
  const audioElRef = useRef<HTMLAudioElement | null>(null)
  const [particles, setParticles] = useState<Array<{id: number; x: number; y: number; emoji: string; dx?: number; size?: number}>>([])
  const particleIdRef = useRef(1)
  const [balloons, setBalloons] = useState<Array<{id:number; left:number; size:number; color:string}>>([])
  const balloonIdRef = useRef(1)
  const [confetti, setConfetti] = useState<Array<{id:number; side:'left'|'right'; top:number; color:string; size:number; rot:number; delay:number; dur:number}>>([])
  const confettiIdRef = useRef(1)
  const confettiTimeoutsRef = useRef<number[]>([])
  
  // load persisted content if available
  useEffect(() => {
    // Try autoplay Happy Birthday on mount
    let mounted = true
    const tryAutoPlay = async () => {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
        const ctx = new AudioCtx()
        audioCtxRef.current = ctx
        // try resume (may be required on some browsers)
        if (ctx.state === 'suspended') {
          await ctx.resume()
        }
        if (!mounted) return
        playHappyWithCtx(ctx)
      } catch (err) {
        // autoplay blocked — show enable button
        setAudioBlocked(true)
      }
    }
    tryAutoPlay()
    // Try server first, fall back to localStorage
    ;(async () => {
      try {
        const res = await fetch('/api/data')
        if (res.ok) {
          if (res.status === 204) return
          const data = await res.json()
          if (!mounted) return
          if (data.homeHero) setHomeHero(data.homeHero)
          if (data.homePhotos) setHomePhotos(data.homePhotos)
          if (data.predebutPhotos) setPredebutPhotos(data.predebutPhotos)
          if (data.comebacks) setComebacks(data.comebacks)
          if (data.hobbySections) setHobbySections(data.hobbySections)
          return
        }
      } catch (err) {
        // server not available, fall through to localStorage
      }

      try {
        const sHomeHero = localStorage.getItem('homeHero')
        const sHomePhotos = localStorage.getItem('homePhotos')
        const sPredebut = localStorage.getItem('predebutPhotos')
        const sComebacks = localStorage.getItem('comebacks')
        const sHobby = localStorage.getItem('hobbySections')

        if (sHomeHero) setHomeHero(JSON.parse(sHomeHero))
        if (sHomePhotos) setHomePhotos(JSON.parse(sHomePhotos))
        if (sPredebut) setPredebutPhotos(JSON.parse(sPredebut))
        if (sComebacks) setComebacks(JSON.parse(sComebacks))
        if (sHobby) setHobbySections(JSON.parse(sHobby))
      } catch (err) {
        // ignore parse errors
      }
    })()
    return () => {
      mounted = false
      // cleanup any audio
      stopAudio()
      // cleanup particles
      setParticles([])
    }
  }, [])

  // touch / click handler: spawn particle + short chime
  useEffect(() => {
    const onPointer = (ev: PointerEvent) => {
      // only respond to primary pointers
      if ((ev as any).button !== undefined && (ev as any).button !== 0) return
      const x = ev.clientX
      const y = ev.clientY
      const emojis = ['🎉', '🎂', '✨', '🥳', '💫', '💖']
      const parts: Array<{id:number; x:number; y:number; emoji:string; dx:number; size:number}> = []
      for (let i = 0; i < 3; i++) {
        const id = particleIdRef.current++
        const emoji = emojis[Math.floor(Math.random() * emojis.length)]
        const dx = (i - 1) * (20 + Math.random() * 36) // left, center, right spread
        const size = 16 + Math.floor(Math.random() * 12)
        parts.push({ id, x, y, emoji, dx, size })
      }
      setParticles((p) => [...p, ...parts])

      // remove after animation
      window.setTimeout(() => {
        setParticles((p) => p.filter((it) => !parts.some((pt) => pt.id === it.id)))
      }, 1600)

      // play short chime via WebAudio
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
        let ctx = audioCtxRef.current
        if (!ctx) {
          ctx = new AudioCtx()
          audioCtxRef.current = ctx
        }
        if (ctx.state === 'suspended') ctx.resume().catch(() => {})
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        gain.gain.value = 0.0001
        gain.connect(ctx.destination)
        osc.type = 'sine'
        // small random pleasant interval
        const base = 440
        const freq = base * (Math.random() * 0.5 + 0.8)
        osc.frequency.value = freq
        osc.connect(gain)
        const now = ctx.currentTime
        gain.gain.setValueAtTime(0.0001, now)
        gain.gain.exponentialRampToValueAtTime(0.12, now + 0.02)
        osc.start(now)
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18)
        osc.stop(now + 0.2)
      } catch (e) {
        // ignore audio errors
      }
    }

    window.addEventListener('pointerdown', onPointer, { passive: true })
    return () => window.removeEventListener('pointerdown', onPointer)
  }, [])

  // Show balloon animation once per user (first visit)
  useEffect(() => {
    try {
      const count = 24
      const colors = ['#ff7aa2', '#ffc86b', '#7bd389', '#8ec1ff', '#d98eff']
      const arr: Array<{id:number; left:number; size:number; color:string}> = []
      for (let i = 0; i < count; i++) {
        arr.push({ id: balloonIdRef.current++, left: Math.random() * 100, size: 28 + Math.floor(Math.random() * 44), color: colors[i % colors.length] })
      }
      setBalloons(arr)
      // clear after animation (allow longest animation to finish)
      window.setTimeout(() => setBalloons([]), 18000)
    } catch (e) {}
  }, [])

  // Launch confetti from left and right on every page open
  useEffect(() => {
    const launchConfetti = () => {
      const colors = ['#ff7aa2', '#ffc86b', '#7bd389', '#8ec1ff', '#d98eff', '#ffd1e6', '#bde0fe']
      const parts: Array<{id:number; side:'left'|'right'; top:number; color:string; size:number; rot:number; delay:number; dur:number}> = []
      const total = 42
      for (let i = 0; i < total; i++) {
        const side: 'left'|'right' = Math.random() > 0.5 ? 'left' : 'right'
        const top = 10 + Math.random() * 60
        const color = colors[Math.floor(Math.random() * colors.length)]
        const size = 8 + Math.floor(Math.random() * 18)
        const rot = -45 + Math.random() * 90
        const delay = Math.random() * 0.6
        const dur = 2.2 + Math.random() * 1.6
        parts.push({ id: confettiIdRef.current++, side, top, color, size, rot, delay, dur })
      }
      setConfetti(parts)
      // play sound
      playConfettiSound()
      // clear after longest duration + delay
      const max = 4000
      const t = window.setTimeout(() => setConfetti([]), max)
      confettiTimeoutsRef.current.push(t)
    }

    // small timeout so confetti doesn't overlap other initial animations
    const starter = window.setTimeout(launchConfetti, 300)
    confettiTimeoutsRef.current.push(starter)
    return () => {
      confettiTimeoutsRef.current.forEach((id) => clearTimeout(id))
      confettiTimeoutsRef.current = []
    }
  }, [])

  function playConfettiSound() {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      const ctx = audioCtxRef.current ?? new AudioCtx()
      audioCtxRef.current = ctx
      if (ctx.state === 'suspended') ctx.resume().catch(() => {})

      // quick sweep oscillator
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      const bi = ctx.createBiquadFilter()
      bi.type = 'highpass'
      bi.frequency.value = 800
      gain.gain.value = 0.0001
      osc.type = 'triangle'
      osc.frequency.value = 260
      osc.connect(bi)
      bi.connect(gain)
      gain.connect(ctx.destination)
      const now = ctx.currentTime
      gain.gain.setValueAtTime(0.0001, now)
      gain.gain.exponentialRampToValueAtTime(0.18, now + 0.02)
      osc.start(now)
      osc.frequency.exponentialRampToValueAtTime(720, now + 0.12)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28)
      osc.stop(now + 0.3)

      // small noise burst for pop
      const bufferSize = 2 * ctx.sampleRate
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const output = noiseBuffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.02))
      const nb = ctx.createBufferSource()
      nb.buffer = noiseBuffer
      const ng = ctx.createGain()
      ng.gain.value = 0.0001
      nb.connect(ng)
      ng.connect(ctx.destination)
      ng.gain.setValueAtTime(0.0001, now)
      ng.gain.exponentialRampToValueAtTime(0.12, now + 0.01)
      ng.gain.exponentialRampToValueAtTime(0.0001, now + 0.12)
      nb.start(now + 0.02)
      nb.stop(now + 0.14)
    } catch (e) {
      // ignore
    }
  }

  function stopAudio() {
    audioTimeoutsRef.current.forEach((id) => clearTimeout(id))
    audioTimeoutsRef.current = []
    audioOscsRef.current.forEach((o) => {
      try { o.stop() } catch (e) {}
    })
    audioOscsRef.current = []
    try {
      if (audioElRef.current) {
        audioElRef.current.pause()
        audioElRef.current.currentTime = 0
        audioElRef.current.src = ''
        audioElRef.current = null
      }
    } catch (e) {}
    try { audioCtxRef.current?.close().catch(() => {}) } catch (e) {}
    audioCtxRef.current = null
    setAudioPlaying(false)
  }

  function playHappyWithCtx(ctx: AudioContext) {
    stopAudio()
    audioCtxRef.current = ctx
    const now = ctx.currentTime
    const gain = ctx.createGain()
    gain.gain.value = 0.25
    gain.connect(ctx.destination)

    const notes: Array<[number, number]> = [
      [523.25, 0.45], [523.25, 0.35], [587.33, 0.8], [523.25, 0.8], [698.46, 0.8], [659.25, 1.4],
      [523.25, 0.45], [523.25, 0.35], [587.33, 0.8], [523.25, 0.8], [783.99, 0.8], [698.46, 1.4],
    ]

    let offset = 0
    notes.forEach(([freq, dur]) => {
      const osc = ctx.createOscillator()
      osc.type = 'sine'
      osc.frequency.value = freq
      osc.connect(gain)
      const start = now + offset
      const end = start + dur
      osc.start(start)
      osc.stop(end)
      audioOscsRef.current.push(osc)
      offset += dur
    })

    setAudioPlaying(true)
    setAudioBlocked(false)
    const total = Math.ceil(offset * 1000 + 200)
    const t = window.setTimeout(() => {
      try { ctx.close().catch(() => {}) } catch (e) {}
      audioCtxRef.current = null
      audioOscsRef.current = []
      setAudioPlaying(false)
    }, total)
    audioTimeoutsRef.current.push(t)
  }

  async function enableAudioAndPlay() {
    // Try to play an audio file from /audio/happy-birthday.mp3 first
    try {
      const res = await fetch('/audio/happy-birthday.mp3', { method: 'HEAD' })
      if (res.ok) {
        // play via HTMLAudioElement (easier for files)
        try {
          stopAudio()
          const a = new Audio('/audio/happy-birthday.mp3')
          a.volume = 0.45
          audioElRef.current = a
          await a.play()
          setAudioPlaying(true)
          setAudioBlocked(false)
          a.onended = () => { setAudioPlaying(false); audioElRef.current = null }
          return
        } catch (err) {
          // fall through to WebAudio fallback
        }
      }
    } catch (err) {
      // HEAD failed or file missing — fallback to WebAudio
    }

    // Fallback: create/resume AudioContext and synthesize Happy Birthday
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      const ctx = new AudioCtx()
      if (ctx.state === 'suspended') await ctx.resume()
      playHappyWithCtx(ctx)
    } catch (err) {
      setAudioBlocked(true)
    }
  }

  const saveAll = () => {
    const payload = { homeHero, homePhotos, predebutPhotos, comebacks, hobbySections }
    ;(async () => {
      try {
        const res = await fetch('/api/data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (res.ok) {
          // also update localStorage as cache
          localStorage.setItem('homeHero', JSON.stringify(homeHero))
          localStorage.setItem('homePhotos', JSON.stringify(homePhotos))
          localStorage.setItem('predebutPhotos', JSON.stringify(predebutPhotos))
          localStorage.setItem('comebacks', JSON.stringify(comebacks))
          localStorage.setItem('hobbySections', JSON.stringify(hobbySections))
          alert('Perubahan disimpan ke server')
          return
        }
      } catch (err) {
        // server failed — fall back
      }

      try {
        localStorage.setItem('homeHero', JSON.stringify(homeHero))
        localStorage.setItem('homePhotos', JSON.stringify(homePhotos))
        localStorage.setItem('predebutPhotos', JSON.stringify(predebutPhotos))
        localStorage.setItem('comebacks', JSON.stringify(comebacks))
        localStorage.setItem('hobbySections', JSON.stringify(hobbySections))
        alert('Server tidak tersedia — disimpan ke localStorage sebagai fallback')
      } catch (err) {
        alert('Gagal menyimpan: ' + String(err))
      }
    })()
  }

  const currentEra = comebacks.find((c) => c.id === activeEra) ?? comebacks[0]

  /* Nav active section detection */
  const [activeNav, setActiveNav] = useState("home")
  useEffect(() => {
    const sections = ["home", "predebut", "comebacks", "profile"]
    const handlers = sections.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      const ob = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) setActiveNav(id)
        },
        { threshold: 0.35 },
      )
      ob.observe(el)
      return ob
    })
    return () => handlers.forEach((ob) => ob?.disconnect())
  }, [])

  const navItems = [
    { id: "home", label: "Home" },
    { id: "predebut", label: "Pre-Debut" },
    { id: "comebacks", label: "Comebacks" },
    { id: "profile", label: "Jiwoo's Room" },
  ]

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

  

  return (
    <div
      style={{
        background: "var(--color-warm-white)",
        color: "var(--color-text)",
      }}
    >
      {isAdmin ? (
        <AdminPanel
          homeHero={homeHero}
          homePhotos={homePhotos}
          predebutPhotos={predebutPhotos}
          comebacks={comebacks}
          hobbySections={hobbySections}
          onUpdateHomeHero={setHomeHero}
          onUpdateHomePhotos={setHomePhotos}
          onUpdatePredebutPhotos={setPredebutPhotos}
          onUpdateComebacks={setComebacks}
          onUpdateHobbySections={setHobbySections}
          onLogout={() => setIsAdmin(false)}
          onSave={() => saveAll()}
        />
      ) : showLoginPage ? (
        <LoginPage
          onLoginSuccess={() => {
            setIsAdmin(true)
            setShowLoginPage(false)
          }}
          onCancel={() => setShowLoginPage(false)}
        />
      ) : null}

      {!isAdmin && !showLoginPage && (
        <>

      {/* ─── NAV ─────────────────────────────────────────────────────────── */}
      <nav
        className="site-nav"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 32px",
          background: "rgba(250,249,246,0.88)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(232,226,216,0.7)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "14px",
            fontWeight: 300,
            letterSpacing: "0.18em",
            color: "#1e1a16",
          }}
        >
          HEART<span style={{ color: "#5a7050" }}>2</span>HEART
        </span>

        <div className="nav-links" style={{ display: "flex", gap: "4px" }}>
          {navItems.map((n) => (
            <button
              key={n.id}
              onClick={() => scrollTo(n.id)}
              style={{
                padding: "6px 14px",
                borderRadius: "100px",
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.25s ease",
                border:
                  activeNav === n.id
                    ? "1px solid #c4d4bc"
                    : "1px solid transparent",
                background: activeNav === n.id ? "#eef4ea" : "transparent",
                color: activeNav === n.id ? "#4a6040" : "rgba(30,26,22,0.45)",
              }}
            >
              {n.label}
            </button>
          ))}
          <button
            onClick={() => setShowLoginPage(true)}
            style={{
              padding: "6px 14px",
              borderRadius: "100px",
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "all 0.25s ease",
              border: "1px solid transparent",
              background: "transparent",
              color: "rgba(30,26,22,0.45)",
            }}
          >
            Admin
          </button>
        </div>

        <button
          className="hamburger"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((s) => !s)}
          style={{
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            width: 42,
            height: 36,
            borderRadius: 8,
            border: '1px solid transparent',
            background: 'transparent',
            cursor: 'pointer',
          }}
        >
          <span className={mobileMenuOpen ? 'hamburger-bars open' : 'hamburger-bars'} aria-hidden />
        </button>
      </nav>

      {mobileMenuOpen && (
        <div
          className="mobile-menu"
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.45)',
            zIndex: 80,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '92%',
              maxWidth: 360,
              background: '#fff',
              borderRadius: 12,
              padding: 18,
              boxShadow: '0 12px 40px rgba(0,0,0,0.18)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setMobileMenuOpen(false)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 18 }}>✕</button>
            </div>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 8 }}>
              {navItems.map((n) => (
                <button key={n.id} onClick={() => { setMobileMenuOpen(false); scrollTo(n.id); }} style={{ padding: '12px 10px', textAlign: 'left', border: 'none', background: 'transparent', fontFamily: 'var(--font-display)', fontSize: 18 }}>{n.label}</button>
              ))}
              <button onClick={() => { setMobileMenuOpen(false); setShowLoginPage(true); }} style={{ marginTop: 8, padding: '10px 12px', borderRadius: 999, border: '1px solid #c4d4bc', background: '#eef4ea', cursor: 'pointer' }}>Admin</button>
            </nav>
          </div>
        </div>
      )}

      {/* Audio enable banner when autoplay blocked or manual controls */}
      {audioBlocked && (
        <div style={{ position: 'fixed', right: 16, bottom: 18, zIndex: 120 }}>
          <div style={{ background: '#fff', padding: '8px 12px', borderRadius: 10, boxShadow: '0 6px 20px rgba(0,0,0,0.12)', display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ fontSize: 13 }}>Audio blocked</div>
            <button onClick={enableAudioAndPlay} style={{ padding: '6px 10px', borderRadius: 8, background: '#eef4ea', border: '1px solid #c4d4bc', cursor: 'pointer' }}>Enable & Play</button>
          </div>
        </div>
      )}

      {audioPlaying && (
        <div style={{ position: 'fixed', right: 16, bottom: 18, zIndex: 120 }}>
          <div style={{ background: '#fff', padding: '8px 12px', borderRadius: 10, boxShadow: '0 6px 20px rgba(0,0,0,0.12)', display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ fontSize: 13 }}>Playing Happy Birthday</div>
            <button onClick={stopAudio} style={{ padding: '6px 10px', borderRadius: 8, background: '#fff', border: '1px solid #c4d4bc', cursor: 'pointer' }}>Stop</button>
          </div>
        </div>
      )}

      {/* Manual play button for testing when nothing is playing */}
      {!audioPlaying && !audioBlocked && (
        <div style={{ position: 'fixed', right: 16, bottom: 18, zIndex: 120 }}>
          <div style={{ background: '#fff', padding: '8px 12px', borderRadius: 10, boxShadow: '0 6px 20px rgba(0,0,0,0.12)', display: 'flex', gap: 8, alignItems: 'center' }}>
            <button onClick={enableAudioAndPlay} style={{ padding: '6px 10px', borderRadius: 8, background: '#e8f5ff', border: '1px solid #c9e4ff', cursor: 'pointer' }}>Play Happy Birthday</button>
          </div>
        </div>
      )}

      {/* Initial balloons (first visit) */}
      {balloons.map((b) => {
        const dur = 4 + (b.size % 3) + Math.random() * 1.8
        const delay = Math.random() * 0.6
        const swayDur = 3 + Math.random() * 2.5
        return (
          <div
            key={b.id}
            style={{
              position: 'fixed',
              left: `${b.left}%`,
              bottom: -80,
              width: b.size,
              height: b.size * 1.45,
              pointerEvents: 'none',
              zIndex: 130,
              animation: `jb-balloon-rise ${dur}s ${delay}s ease-in forwards`,
            }}
            aria-hidden
          >
            <div style={{ width: '100%', height: '100%', transformOrigin: '50% 85%', animation: `jb-balloon-sway ${swayDur}s ${delay}s ease-in-out infinite` }}>
              <svg width="100%" height="100%" viewBox="0 0 100 140" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id={`g${b.id}`} x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor={b.color} stopOpacity="1" />
                    <stop offset="65%" stopColor="#ffffff" stopOpacity="0.12" />
                    <stop offset="100%" stopColor={b.color} stopOpacity="0.95" />
                  </linearGradient>
                </defs>
                <ellipse cx="50" cy="48" rx="36" ry="44" fill={`url(#g${b.id})`} />
                <ellipse cx="36" cy="34" rx="6" ry="3" fill="rgba(255,255,255,0.6)" />
                <path d="M50 92 q2 8 -6 18" stroke="#333" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        )
      })}

      {/* Particles for touch effects */}
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'fixed',
            left: (p.x ?? 0) - (p.size ?? 18) / 2,
            top: (p.y ?? 0) - (p.size ?? 18) / 2,
            pointerEvents: 'none',
            fontSize: p.size ?? 18,
            zIndex: 140,
            animation: 'jb-particle-float 1.2s forwards',
            transform: 'translateX(0)',
            // CSS variable used by keyframes
            ['--dx' as any]: `${p.dx ?? 0}px`,
            ['--scale' as any]: `${(p.size ?? 18) / 18}`,
          }}
          aria-hidden
        >
          {p.emoji}
        </div>
      ))}

      {/* Side confetti on page open */}
      {confetti.map((c) => (
        <div
          key={c.id}
          style={{
            position: 'fixed',
            left: c.side === 'left' ? -24 : undefined,
            right: c.side === 'right' ? -24 : undefined,
            top: `${c.top}vh`,
            width: c.size,
            height: c.size * 0.6,
            background: c.color,
            transform: `rotate(${c.rot}deg)`,
            zIndex: 150,
            pointerEvents: 'none',
            borderRadius: 2,
            boxShadow: '0 4px 10px rgba(0,0,0,0.12)',
            animation: `${c.side === 'left' ? 'jb-confetti-left' : 'jb-confetti-right'} ${c.dur}s ${c.delay}s ease-out forwards`,
            opacity: 1,
          }}
          aria-hidden
        />
      ))}

      <style>{`
        @keyframes jb-particle-float { from { transform: translateX(var(--dx,0)) translateY(0) scale(1); opacity:1 } to { transform: translateX(var(--dx,0)) translateY(-120px) scale(var(--scale,1.25)); opacity:0 } }
        @keyframes jb-balloon-rise { from { transform: translateY(0) scale(1); opacity:1 } to { transform: translateY(-120vh) scale(1.05); opacity:0 } }
        @keyframes jb-balloon-sway { 0% { transform: translateX(0) rotate(-6deg) } 25% { transform: translateX(-8px) rotate(-2deg) } 50% { transform: translateX(6px) rotate(6deg) } 75% { transform: translateX(-6px) rotate(-3deg) } 100% { transform: translateX(0) rotate(-6deg) } }
        @keyframes jb-confetti-left { 0% { transform: translateX(0) translateY(0) rotate(0deg); opacity:1 } 100% { transform: translateX(120vw) translateY(80vh) rotate(720deg); opacity:0 } }
        @keyframes jb-confetti-right { 0% { transform: translateX(0) translateY(0) rotate(0deg); opacity:1 } 100% { transform: translateX(-120vw) translateY(80vh) rotate(-720deg); opacity:0 } }
      `}</style>

      {/* ═══════════════════════════════════════
          SECTION 1 · HOME
      ═══════════════════════════════════════ */}
      <section
        id="home"
        style={{
          minHeight: "100vh",
          background: "#faf9f6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          paddingTop: "80px",
          paddingBottom: "60px",
          paddingLeft: "56px",
          paddingRight: "56px",
        }}
      >
        {/* Subtle texture overlay */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 60% 30%, rgba(196,212,188,0.18) 0%, transparent 55%), radial-gradient(circle at 20% 70%, rgba(200,190,230,0.12) 0%, transparent 50%)",
            pointerEvents: "none",
          }}
        />

        {/* Scattered background photos — desktop only */}
        {homePhotos.map((p, i) => (
          <div
              key={i}
              aria-hidden
              style={{
                position: "absolute",
                ...{
                  top: p.style.top,
                  left: p.style.left,
                  right: p.style.right,
                  bottom: p.style.bottom,
                },
                width: p.style.width,
                transform: `rotate(${p.style.rotate})`,
                overflow: "hidden",
                boxShadow: "0 6px 24px rgba(0,0,0,0.10)",
                border: "3px solid rgba(250,249,246,0.9)",
              }}
              className="hidden lg:block"
            >
            <img
              src={p.src}
              alt={p.alt}
              style={{
                width: "100%",
                display: "block",
                objectFit: "cover",
                filter: "saturate(0.72) brightness(0.96)",
              }}
            />
          </div>
        ))}

        {/* Main content */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "0",
          }}
        >
          <Label>Heart2Heart · 하트투하트</Label>
          <Divider />

          {/* Portrait */}
          <div style={{ position: "relative", margin: "28px 0" }}>
            {/* Outer ornament ring */}
            <div
              style={{
                position: "absolute",
                inset: "-20px",
                border: "1px solid rgba(196,212,188,0.35)",
                borderRadius: "2px",
                transform: "rotate(2deg)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: "-12px",
                border: "1px solid rgba(196,212,188,0.2)",
                borderRadius: "2px",
                transform: "rotate(-1deg)",
              }}
            />
            <div
              style={{
                width: "260px",
                height: "340px",
                overflow: "hidden",
                background: "#e8e0d4",
                boxShadow:
                  "0 20px 60px rgba(0,0,0,0.14), 0 4px 12px rgba(0,0,0,0.08)",
              }}
            >
              <img
                src={homeHero.src}
                alt={homeHero.alt}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "saturate(0.80)",
                }}
              />
            </div>
            {/* Leader badge */}
            <div
              style={{
                position: "absolute",
                bottom: "-13px",
                left: "50%",
                transform: "translateX(-50%)",
                background: "#faf9f6",
                border: "1px solid #c4d4bc",
                padding: "5px 16px",
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "#5a7050",
                whiteSpace: "nowrap",
                boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
              }}
            >
              Leader · Group
            </div>
          </div>

          {/* Name */}
          <div style={{ marginTop: "36px" }}>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(5rem, 16vw, 9.5rem)",
                fontWeight: 300,
                lineHeight: 0.9,
                letterSpacing: "-0.02em",
                color: "#1e1a16",
                margin: 0,
              }}
            >
              Ji<em style={{ color: "#5a7050", fontStyle: "italic" }}>{homeHero.nameAccent}</em>
            </h1>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: "0.4em",
                color: "rgba(30,26,22,0.38)",
                marginTop: "10px",
                textTransform: "uppercase",
              }}
            >
              {homeHero.roleLine}
            </p>
          </div>

          {/* Quote */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontStyle: "italic",
              fontSize: "15px",
              color: "rgba(30,26,22,0.50)",
              maxWidth: "360px",
              lineHeight: 1.7,
              marginTop: "24px",
            }}
          >
            {homeHero.quote}
          </p>

          {/* Stats row */}
          <div
            style={{
              display: "flex",
              gap: "40px",
              marginTop: "32px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {[
              { l: "Position", v: "Leader" },
              { l: "Group", v: "Heart2Heart" },
              { l: "Debut", v: "2025 February 24th" },
            ].map((s) => (
              <div key={s.l} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "9px",
                    letterSpacing: "0.28em",
                    color: "rgba(30,26,22,0.35)",
                    textTransform: "uppercase",
                  }}
                >
                  {s.l}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "14px",
                    color: "#1e1a16",
                    marginTop: "4px",
                  }}
                >
                  {s.v}
                </div>
              </div>
            ))}
          </div>

          {/* Scroll cue */}
          <button
            onClick={() => scrollTo("predebut")}
            style={{
              marginTop: "44px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "rgba(30,26,22,0.3)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
              }}
            >
              {homeHero.scrollLabel}
            </span>
            <div
              style={{
                width: "1px",
                height: "40px",
                background:
                  "linear-gradient(to bottom, rgba(30,26,22,0.2), transparent)",
              }}
            />
          </button>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 2 · PRE-DEBUT
      ═══════════════════════════════════════ */}
      <section
        id="predebut"
        style={{
          background: "#f5f0ea",
          borderTop: "1px solid #ece6de",
          paddingTop: "80px",
          paddingBottom: "72px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            paddingLeft: "32px",
            paddingRight: "32px",
          }}
        >
          <FadeIn style={{ textAlign: "center", marginBottom: "56px" }}>
            <Label color="#8a9078">지우의 이야기 · Her Journey</Label>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
                fontWeight: 300,
                color: "#1e1a16",
                lineHeight: 1.1,
                margin: "12px 0 0",
              }}
            >
              Before the{" "}
              <em style={{ color: "#8a6a50", fontStyle: "italic" }}>Stage</em>
            </h2>
            <Divider color="rgba(30,26,22,0.10)" />
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontStyle: "italic",
                fontSize: "15px",
                color: "rgba(30,26,22,0.48)",
                maxWidth: "440px",
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              From a quiet girl — to the leader who
              now carries an entire group on her shoulders.
            </p>
          </FadeIn>
        </div>

        {/* Full-bleed clothesline */}
        <FadeIn
          delay={100}
          style={{ paddingLeft: "12px", paddingRight: "12px" }}
        >
          <Clothesline items={predebutPhotos} />
        </FadeIn>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 3 · COMEBACKS
      ═══════════════════════════════════════ */}
      <section
        id="comebacks"
        style={{
          background: "#faf9f6",
          borderTop: "1px solid #ece6de",
          paddingTop: "80px",
          paddingBottom: "72px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            paddingLeft: "32px",
            paddingRight: "32px",
          }}
        >
          <FadeIn style={{ textAlign: "center", marginBottom: "48px" }}>
            <Label>디스코그래피 · Discography</Label>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
                fontWeight: 300,
                color: "#1e1a16",
                lineHeight: 1.1,
                margin: "12px 0 0",
              }}
            >
              Every{" "}
              <em style={{ color: "#4a6070", fontStyle: "italic" }}>Era</em>
            </h2>
            <Divider color="rgba(30,26,22,0.08)" />
          </FadeIn>

          {/* Era tabs */}
          <FadeIn
            delay={80}
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: "48px",
            }}
          >
            {comebacks.map((c) => {
              const active = activeEra === c.id
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveEra(c.id)}
                  style={{
                    padding: "10px 22px",
                    borderRadius: "100px",
                    fontFamily: "var(--font-display)",
                    fontSize: "15px",
                    fontWeight: 300,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    border: active ? "1px solid #b8c8b0" : "1px solid #ece6de",
                    background: active ? "#eef4ea" : "transparent",
                    color: active ? "#3a5030" : "rgba(30,26,22,0.48)",
                  }}
                >
                  <em>{c.title}</em>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "9px",
                      letterSpacing: "0.2em",
                      color: active ? "#6a8860" : "rgba(30,26,22,0.3)",
                      marginLeft: "8px",
                    }}
                  >
                    {c.year}
                  </span>
                </button>
              )
            })}
          </FadeIn>

          {/* Era info */}
          <FadeIn style={{ textAlign: "center", marginBottom: "40px" }}>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "2rem",
                fontWeight: 300,
                color: "#1e1a16",
                margin: "0 0 6px",
              }}
            >
              <em>{currentEra.title}</em>
            </h3>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                letterSpacing: "0.35em",
                color: "rgba(30,26,22,0.38)",
                textTransform: "uppercase",
              }}
            >
              {currentEra.type} · {currentEra.year}
            </div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontStyle: "italic",
                fontSize: "14px",
                color: "rgba(30,26,22,0.45)",
                marginTop: "8px",
              }}
            >
              {currentEra.tagline}
            </p>
          </FadeIn>
        </div>

        {/* Clothesline for current era */}
        <div
          key={activeEra}
          style={{ paddingLeft: "12px", paddingRight: "12px" }}
        >
          <Clothesline items={currentEra.photos} />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 4 · PROFILE ROOM
      ═══════════════════════════════════════ */}
<ProfileSection sections={hobbySections} />

      {/* ─── Footer ──────────────────────────────────────────────────────── */}
        </>
      )}

      <footer
        style={{
          background: "#f5f0ea",
          borderTop: "1px solid #ece6de",
          padding: "32px 24px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.35em",
            color: "rgba(30,26,22,0.28)",
            textTransform: "uppercase",
          }}
        >
          Fan Tribute · Choi Jiwoo · Heart2Heart · 하트투하트 · Made with ♡
        </p>
      </footer>
    </div>
  )
}
