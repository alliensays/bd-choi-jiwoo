export interface ClotheslinePhoto {
  src: string
  alt: string
  rotate: number
  noteKr: string
  noteText: string
  noteColor: string
  year: string
  label: string
}

export interface HomePhotoStyle {
  top?: string
  left?: string
  right?: string
  bottom?: string
  rotate: string
  width: string
}

export interface HomePhoto extends ClotheslinePhoto {
  style: HomePhotoStyle
}

export interface HomeHero {
  src: string
  alt: string
  nameAccent: string
  roleLine: string
  quote: string
  scrollLabel: string
}

export interface ComebackEra {
  id: string
  title: string
  year: string
  type: string
  tagline: string
  photos: ClotheslinePhoto[]
}

export interface HobbyItem {
  name: string
  detail: string
}

export interface HobbySection {
  id: string
  icon: string
  title: string
  subtitle: string
  bg: string
  border: string
  items: HobbyItem[]
}

export interface MomentPhoto {
  id: string
  src: string
  alt: string
  year: string
  caption: string
  note: string
  member: string
}

export interface MemberLetter {
  id: string
  year: string
  title: string
  from: string
  to: string
  message: string
}

export interface BoardMessage {
  id: string
  author: string
  message: string
  createdAt: string
}

export interface QuizOption {
  id: string
  label: string
  isCorrect: boolean
}

export interface QuizQuestion {
  id: string
  prompt: string
  options: QuizOption[]
}

export interface QuizMeme {
  id: string
  src: string
  alt: string
}

export interface QuizResultRange {
  id: string
  min: number
  max: number
  title: string
  message: string
  certificateImage: string
  memePool: QuizMeme[]
}

export interface JiwooQuiz {
  title: string
  description: string
  questions: QuizQuestion[]
  resultRanges: QuizResultRange[]
}

// ─── Home hero content ─────────────────────────────────────────────────────
export const homeHero: HomeHero = {
  src: "https://kprofiles.com/wp-content/uploads/2025/02/JIWOO-533x800.jpg",
  alt: "Jiwoo — Leader of Heart2Heart",
  nameAccent: "woo",
  roleLine: "김지우 · Heart2Heart",
  quote: "Patience is bitter but its fruit is sweet.",
  scrollLabel: "Her Story",
}

export const homePhotos: HomePhoto[] = [
  {
    src: "https://images.unsplash.com/photo-1593260853607-d0e0f639bdab?w=220&h=290&fit=crop&auto=format",
    alt: "Jiwoo",
    rotate: -6,
    noteKr: "",
    noteText: "",
    noteColor: "#f7f4ed",
    year: "",
    label: "",
    style: { top: "14%", left: "18%", rotate: "-6deg", width: "130px" },
  },
  {
    src: "https://images.unsplash.com/photo-1696956994811-95c0a29c917c?w=200&h=260&fit=crop&auto=format",
    alt: "Jiwoo",
    rotate: 5,
    noteKr: "",
    noteText: "",
    noteColor: "#f7f4ed",
    year: "",
    label: "",
    style: { top: "11%", right: "19%", rotate: "5deg", width: "120px" },
  },
  {
    src: "https://images.unsplash.com/photo-1671712292920-44d2e96d00d6?w=200&h=270&fit=crop&auto=format",
    alt: "Jiwoo",
    rotate: -4,
    noteKr: "",
    noteText: "",
    noteColor: "#f7f4ed",
    year: "",
    label: "",
    style: { bottom: "14%", left: "20%", rotate: "-4deg", width: "115px" },
  },
  {
    src: "https://images.unsplash.com/photo-1541823709867-1b206113eafd?w=200&h=260&fit=crop&auto=format",
    alt: "Jiwoo",
    rotate: 7,
    noteKr: "",
    noteText: "",
    noteColor: "#f7f4ed",
    year: "",
    label: "",
    style: { bottom: "12%", right: "20%", rotate: "7deg", width: "120px" },
  },
  {
    src: "https://images.unsplash.com/photo-1641351841616-faa0d3760980?w=180&h=240&fit=crop&auto=format",
    alt: "Jiwoo",
    rotate: -8,
    noteKr: "",
    noteText: "",
    noteColor: "#f7f4ed",
    year: "",
    label: "",
    style: { top: "44%", left: "32%", rotate: "-8deg", width: "100px" },
  },
]

export const jiwooQuiz: JiwooQuiz = {
  title: "How well do you know Jiwoo?",
  description: "Answer a few quick questions and get your Jiwoo-level result with a certificate and meme reward.",
  questions: [
    {
      id: "q1",
      prompt: "What is Jiwoo's role in Heart2Heart?",
      options: [
        { id: "a", label: "Leader", isCorrect: true },
        { id: "b", label: "Main dancer", isCorrect: false },
        { id: "c", label: "Visual", isCorrect: false },
        { id: "d", label: "Maknae", isCorrect: false },
      ],
    },
    {
      id: "q2",
      prompt: "Which vibe best matches Jiwoo's public image?",
      options: [
        { id: "a", label: "Calm, elegant, and quietly confident", isCorrect: true },
        { id: "b", label: "Chaotic and loud 24/7", isCorrect: false },
        { id: "c", label: "Only obsessed with fashion shows", isCorrect: false },
        { id: "d", label: "A total stranger to music", isCorrect: false },
      ],
    },
    {
      id: "q3",
      prompt: "What is the most fitting sentiment for Jiwoo's story?",
      options: [
        { id: "a", label: "Patience blooms into strength", isCorrect: true },
        { id: "b", label: "Only luck matters", isCorrect: false },
        { id: "c", label: "Talent is nothing without drama", isCorrect: false },
        { id: "d", label: "Silent means uninterested", isCorrect: false },
      ],
    },
    {
      id: "q4",
      prompt: "Which keyword feels closest to Jiwoo's style?",
      options: [
        { id: "a", label: "Graceful", isCorrect: true },
        { id: "b", label: "Mysterious to the point of confusion", isCorrect: false },
        { id: "c", label: "Completely random", isCorrect: false },
        { id: "d", label: "Totally absent from the group concept", isCorrect: false },
      ],
    },
    {
      id: "q5",
      prompt: "What is the best way to describe Jiwoo's fan energy?",
      options: [
        { id: "a", label: "Warm, loyal, and supportive", isCorrect: true },
        { id: "b", label: "Never emotionally invested", isCorrect: false },
        { id: "c", label: "Only interested in gossip", isCorrect: false },
        { id: "d", label: "Completely detached from the music", isCorrect: false },
      ],
    },
  ],
  resultRanges: [
    {
      id: "1-20",
      min: 1,
      max: 20,
      title: "Jiwoo-level: Rookie",
      message: "OOOops! You are just starting to explore the world of Jiwoo. Keep learning and you'll get there!",
      certificateImage: "/quiz/certificate-rookie.svg",
      memePool: [
        { id: "r1-1", src: "/quiz/1.jpeg", alt: "Jiwoo meme 1" },
        { id: "r1-2", src: "/quiz/2.jpeg", alt: "Jiwoo meme 2" },
        { id: "r1-3", src: "/quiz/3.jpeg", alt: "Jiwoo meme 3" },
        { id: "r1-4", src: "/quiz/4.jpeg", alt: "Jiwoo meme 4" },
        { id: "r1-5", src: "/quiz/5.jpeg", alt: "Jiwoo meme 5" },
        { id: "r1-6", src: "/quiz/6.jpeg", alt: "Jiwoo meme 6" },
        { id: "r1-7", src: "/quiz/7.jpeg", alt: "Jiwoo meme 7" },
        { id: "r1-8", src: "/quiz/8.jpeg", alt: "Jiwoo meme 8" },
        { id: "r1-9", src: "/quiz/9.jpeg", alt: "Jiwoo meme 9" },
        { id: "r1-10", src: "/quiz/10.jpeg", alt: "Jiwoo meme 10" },
      ],
    },
    {
      id: "21-40",
      min: 21,
      max: 40,
      title: "Jiwoo-level: Curious fan",
      message: "You know the basics. A few more visits and Jiwoo will feel like a familiar friend.",
      certificateImage: "/quiz/certificate-curious-fan.svg",
      memePool: [
        { id: "r2-1", src: "/quiz/11.jpeg", alt: "Jiwoo meme 11" },
        { id: "r2-2", src: "/quiz/12.jpeg", alt: "Jiwoo meme 12" },
        { id: "r2-3", src: "/quiz/13.jpeg", alt: "Jiwoo meme 13" },
        { id: "r2-4", src: "/quiz/14.png", alt: "Jiwoo meme 14" },
        { id: "r2-5", src: "/quiz/15.jpeg", alt: "Jiwoo meme 15" },
        { id: "r2-6", src: "/quiz/16.jpeg", alt: "Jiwoo meme 16" },
        { id: "r2-7", src: "/quiz/17.jpeg", alt: "Jiwoo meme 17" },
        { id: "r2-8", src: "/quiz/18.jpeg", alt: "Jiwoo meme 18" },
        { id: "r2-9", src: "/quiz/19.jpeg", alt: "Jiwoo meme 19" },
        { id: "r2-10", src: "/quiz/20.jpeg", alt: "Jiwoo meme 20" },
        { id: "r2-11", src: "/quiz/21.jpeg", alt: "Jiwoo meme 21" },
        { id: "r2-12", src: "/quiz/22.jpeg", alt: "Jiwoo meme 22" },
      ],
    },
    {
      id: "41-60",
      min: 41,
      max: 60,
      title: "Jiwoo-level: Casual stan",
      message: "You are in the safe zone. You know enough to keep the Jiwoo lore alive.",
      certificateImage: "/quiz/certificate-casual-stan.svg",
      memePool: [
        { id: "r3-1", src: "/quiz/23.jpeg", alt: "Jiwoo meme 23" },
        { id: "r3-2", src: "/quiz/24.jpeg", alt: "Jiwoo meme 24" },
        { id: "r3-3", src: "/quiz/25.jpeg", alt: "Jiwoo meme 25" },
        { id: "r3-4", src: "/quiz/26.png", alt: "Jiwoo meme 26" },
        { id: "r3-5", src: "/quiz/27.jpeg", alt: "Jiwoo meme 27" },
        { id: "r3-6", src: "/quiz/28.jpeg", alt: "Jiwoo meme 28" },
        { id: "r3-7", src: "/quiz/29.jpeg", alt: "Jiwoo meme 29" },
        { id: "r3-8", src: "/quiz/30.jpeg", alt: "Jiwoo meme 30" },
        { id: "r3-9", src: "/quiz/31.jpeg", alt: "Jiwoo meme 31" },
        { id: "r3-10", src: "/quiz/32.jpeg", alt: "Jiwoo meme 32" },
        { id: "r3-11", src: "/quiz/33.jpeg", alt: "Jiwoo meme 33" },
        { id: "r3-12", src: "/quiz/34.jpeg", alt: "Jiwoo meme 34" },
      ],
    },
    {
      id: "61-80",
      min: 61,
      max: 80,
      title: "Jiwoo-level: Serious fan",
      message: "Strong instincts. You are basically one soft archive scroll away from becoming a true Jiwoo expert.",
      certificateImage: "/quiz/certificate-serious-fan.svg",
      memePool: [
        { id: "r4-1", src: "/quiz/35.jpeg", alt: "Jiwoo meme 35" },
        { id: "r4-2", src: "/quiz/36.jpeg", alt: "Jiwoo meme 36" },
        { id: "r4-3", src: "/quiz/37.jpeg", alt: "Jiwoo meme 37" },
        { id: "r4-4", src: "/quiz/38.jpeg", alt: "Jiwoo meme 38" },
        { id: "r4-5", src: "/quiz/39.jpeg", alt: "Jiwoo meme 39" },
        { id: "r4-6", src: "/quiz/40.jpeg", alt: "Jiwoo meme 40" },
        { id: "r4-7", src: "/quiz/41.jpeg", alt: "Jiwoo meme 41" },
        { id: "r4-8", src: "/quiz/42.jpeg", alt: "Jiwoo meme 42" },
        { id: "r4-9", src: "/quiz/43.jpeg", alt: "Jiwoo meme 43" },
        { id: "r4-10", src: "/quiz/44.jpeg", alt: "Jiwoo meme 44" },
      ],
    },
    {
      id: "81-100",
      min: 81,
      max: 100,
      title: "Jiwoo-level: Certified heartbeat",
      message: "You are deeply in the Jiwoo orbit. This certificate is basically a formal warning that you are one of us.",
      certificateImage: "/quiz/certificate-certified-heartbeat.svg",
      memePool: [
        { id: "r5-1", src: "/quiz/45.jpeg", alt: "Jiwoo meme 45" },
        { id: "r5-2", src: "/quiz/46.jpeg", alt: "Jiwoo meme 46" },
        { id: "r5-3", src: "/quiz/47.jpeg", alt: "Jiwoo meme 47" },
        { id: "r5-4", src: "/quiz/48.jpeg", alt: "Jiwoo meme 48" },
        { id: "r5-5", src: "/quiz/49.jpeg", alt: "Jiwoo meme 49" },
        { id: "r5-6", src: "/quiz/50.jpeg", alt: "Jiwoo meme 50" },
        { id: "r5-7", src: "/quiz/51.jpeg", alt: "Jiwoo meme 51" },
        { id: "r5-8", src: "/quiz/52.jpeg", alt: "Jiwoo meme 52" },
        { id: "r5-9", src: "/quiz/53.jpeg", alt: "Jiwoo meme 53" },
        { id: "r5-10", src: "/quiz/54.jpeg", alt: "Jiwoo meme 54" },
      ],
    },
  ],
}

// ─── Pre-debut photos ──────────────────────────────────────────────────────
export const predebutPhotos: ClotheslinePhoto[] = [
  {
    src: "https://images.unsplash.com/photo-1504447932885-85a9ae0e1629?w=280&h=360&fit=crop&auto=format",
    alt: "지우 — age 6",
    rotate: -5,
    noteKr: "처음으로 무대를 꿈꿨어요",
    noteText: '"The day I first\ndreamed of a stage"',
    noteColor: "#fdf8f0",
    year: "2007",
    label: "Age 6",
  },
  {
    src: "https://images.unsplash.com/photo-1606898129598-06d312ade085?w=280&h=360&fit=crop&auto=format",
    alt: "지우 — age 7",
    rotate: 4,
    noteKr: "항상 노래를 흥얼거렸어요",
    noteText: '"Always humming,\nalways singing 🎵"',
    noteColor: "#f2f8f2",
    year: "2008",
    label: "Age 7",
  },
  {
    src: "https://images.unsplash.com/photo-1568948054596-aa006f8ea891?w=280&h=360&fit=crop&auto=format",
    alt: "지우 — age 9",
    rotate: -3,
    noteKr: "댄스 학원 첫 등록",
    noteText: '"First day of\ndance class 💃"',
    noteColor: "#f2f4f9",
    year: "2010",
    label: "Age 9",
  },
  {
    src: "https://images.unsplash.com/photo-1705494644160-7974dfe4004d?w=280&h=360&fit=crop&auto=format",
    alt: "지우 — age 11",
    rotate: 6,
    noteKr: "학교 발표회 주인공이 됐어요",
    noteText: '"Lead role in the\nschool recital ★"',
    noteColor: "#fdf2f4",
    year: "2012",
    label: "Age 11",
  },
  {
    src: "https://images.unsplash.com/photo-1646287684172-7f05a5bba0ab?w=280&h=360&fit=crop&auto=format",
    alt: "연습생 지우 — age 13",
    rotate: -4,
    noteKr: "연습생이 됐어요. 설레고 무서워요",
    noteText: '"Trainee life begins.\nExcited & terrified."',
    noteColor: "#f6f2fd",
    year: "2014",
    label: "Trainee · Age 13",
  },
  {
    src: "https://images.unsplash.com/photo-1541823709867-1b206113eafd?w=280&h=360&fit=crop&auto=format",
    alt: "연습생 지우 — age 15",
    rotate: 3,
    noteKr: "매일 밤 12시까지 연습했어요",
    noteText: '"Practiced until\nmidnight every night"',
    noteColor: "#f0f7f2",
    year: "2016",
    label: "Trainee · Age 15",
  },
  {
    src: "https://images.unsplash.com/photo-1687298703924-0d11be697d8b?w=280&h=360&fit=crop&auto=format",
    alt: "데뷔 직전 지우 — age 17",
    rotate: -2,
    noteKr: "드디어 데뷔 멤버로 확정! ♡",
    noteText: '"Finally confirmed\nas debut member ♡"',
    noteColor: "#fdf8e8",
    year: "2017",
    label: "Pre-Debut · Age 17",
  },
]

// ─── Comeback eras ─────────────────────────────────────────────────────────
export const comebacks: ComebackEra[] = [
  {
    id: "thechase",
    title: "The Chase",
    year: "2025",
    type: "Debut Single",
    tagline: "I love the way you love the chase",
    photos: [
      {
        src: "https://images.unsplash.com/photo-1616639943825-e0fbad20a3d3?w=280&h=360&fit=crop&auto=format",
        alt: "Bloom — concept photo",
        rotate: -3,
        noteKr: "드디어 데뷔! 꿈만 같아요",
        noteText: '"We finally debuted 🌸\nI cried backstage"',
        noteColor: "#fdf8f0",
        year: "2018.08",
        label: "Concept Photo",
      },
      {
        src: "https://images.unsplash.com/photo-1593260853607-d0e0f639bdab?w=280&h=360&fit=crop&auto=format",
        alt: "Bloom — first stage",
        rotate: 5,
        noteKr: "첫 무대, 손이 너무 떨렸어요",
        noteText: '"First stage ever.\nHands were shaking."',
        noteColor: "#f2f8f2",
        year: "2018.08",
        label: "First Stage",
      },
      {
        src: "https://images.unsplash.com/photo-1696956994811-95c0a29c917c?w=280&h=360&fit=crop&auto=format",
        alt: "Bloom — fan meet",
        rotate: -2,
        noteKr: "팬분들께 정말 감사해요 ♡",
        noteText: '"Met fans for the\nfirst time — surreal"',
        noteColor: "#f2f4f9",
        year: "2018.09",
        label: "First Fan Meet",
      },
    ],
  },
  {
    id: "style",
    title: "STYLE",
    year: "2025",
    type: "Digital Single",
    tagline: "Cause you’re just my type and I like your style",
    photos: [
      {
        src: "https://images.unsplash.com/photo-1671712292920-44d2e96d00d6?w=280&h=360&fit=crop&auto=format",
        alt: "Petals — concept",
        rotate: 4,
        noteKr: "봄처럼 피어나고 싶었어요",
        noteText: '"Wanted this album\nto feel like spring"',
        noteColor: "#fdf2f6",
        year: "2019.03",
        label: "Concept Photo",
      },
      {
        src: "https://images.unsplash.com/photo-1687298703924-0d11be697d8b?w=280&h=360&fit=crop&auto=format",
        alt: "Petals — MV",
        rotate: -5,
        noteKr: "뮤직비디오 촬영이 정말 즐거웠어요",
        noteText: '"MV shoot was\nmy favourite memory"',
        noteColor: "#f6f2fd",
        year: "2019.03",
        label: "Music Video",
      },
      {
        src: "https://images.unsplash.com/photo-1541823709867-1b206113eafd?w=280&h=360&fit=crop&auto=format",
        alt: "Petals — stage",
        rotate: 2,
        noteKr: "멤버들이랑 함께라서 행복해요",
        noteText: '"So happy performing\nwith my members"',
        noteColor: "#f0f8f2",
        year: "2019.04",
        label: "Stage",
      },
    ],
  },
  {
    id: "prettypelase",
    title: "Pretty Please",
    year: "2025",
    type: "pre-Release Single",
    tagline: "-",
    photos: [
      {
        src: "https://images.unsplash.com/photo-1641351841616-faa0d3760980?w=280&h=360&fit=crop&auto=format",
        alt: "Moonlit — concept",
        rotate: -4,
        noteKr: "이 앨범이 제 마음에 제일 가까워요",
        noteText: '"This album is closest\nto my true self"',
        noteColor: "#eeedf8",
        year: "2021.06",
        label: "Concept Photo",
      },
      {
        src: "https://images.unsplash.com/photo-1593260853607-d0e0f639bdab?w=280&h=360&fit=crop&auto=format",
        alt: "Moonlit — stage",
        rotate: 3,
        noteKr: "조용하고 깊은 이야기를 담았어요",
        noteText: '"A quiet, deep\nstory to tell"',
        noteColor: "#f0f8f2",
        year: "2021.06",
        label: "Stage",
      },
      {
        src: "https://images.unsplash.com/photo-1696956994811-95c0a29c917c?w=280&h=360&fit=crop&auto=format",
        alt: "Moonlit — behind",
        rotate: -1,
        noteKr: "팀이 하나가 된 느낌이었어요",
        noteText: '"Felt like the\nteam became one"',
        noteColor: "#fdf8e8",
        year: "2021.07",
        label: "Behind the Scenes",
      },
    ],
  },
  {
    id: "focus",
    title: "FOCUS",
    year: "2025",
    type: "1st Mini Album",
    tagline: "I can not focus on anything but u",
    photos: [
      {
        src: "https://images.unsplash.com/photo-1616639943825-e0fbad20a3d3?w=280&h=360&fit=crop&auto=format",
        alt: "Reverie — album cover",
        rotate: 5,
        noteKr: "정규앨범이라 더욱 특별해요",
        noteText: '"Full album —\nbiggest dream achieved"',
        noteColor: "#fdf8f0",
        year: "2023.02",
        label: "Album Cover",
      },
      {
        src: "https://images.unsplash.com/photo-1671712292920-44d2e96d00d6?w=280&h=360&fit=crop&auto=format",
        alt: "Reverie — concert",
        rotate: -3,
        noteKr: "단독 콘서트, 꿈같았어요",
        noteText: '"Solo concert felt\nlike a dream 🌙"',
        noteColor: "#f0f8f2",
        year: "2023.04",
        label: "Solo Concert",
      },
      {
        src: "https://images.unsplash.com/photo-1641351841616-faa0d3760980?w=280&h=360&fit=crop&auto=format",
        alt: "Reverie — fan sign",
        rotate: 2,
        noteKr: "항상 여러분 곁에 있을게요 ♡",
        noteText: '"I\'ll always be\nright here for you ♡"',
        noteColor: "#f6f2fd",
        year: "2023.05",
        label: "Fan Sign",
      },
    ],
  },
  {
    id: "rude",
    title: "RUDE!",
    year: "2026",
    type: "Digital Single",
    tagline: "How to Behave When the Heart is Missing",
    photos: [
      {
        src: "https://images.unsplash.com/photo-1616639943825-e0fbad20a3d3?w=280&h=360&fit=crop&auto=format",
        alt: "Reverie — album cover",
        rotate: 5,
        noteKr: "정규앨범이라 더욱 특별해요",
        noteText: '"Full album —\nbiggest dream achieved"',
        noteColor: "#fdf8f0",
        year: "2023.02",
        label: "Album Cover",
      },
      {
        src: "https://images.unsplash.com/photo-1671712292920-44d2e96d00d6?w=280&h=360&fit=crop&auto=format",
        alt: "Reverie — concert",
        rotate: -3,
        noteKr: "단독 콘서트, 꿈같았어요",
        noteText: '"Solo concert felt\nlike a dream 🌙"',
        noteColor: "#f0f8f2",
        year: "2023.04",
        label: "Solo Concert",
      },
      {
        src: "https://images.unsplash.com/photo-1641351841616-faa0d3760980?w=280&h=360&fit=crop&auto=format",
        alt: "Reverie — fan sign",
        rotate: 2,
        noteKr: "항상 여러분 곁에 있을게요 ♡",
        noteText: '"I\'ll always be\nright here for you ♡"',
        noteColor: "#f6f2fd",
        year: "2023.05",
        label: "Fan Sign",
      },
    ],
  },
  {
    id: "lemontang",
    title: "Lemon Tang",
    year: "2026",
    type: "2th Mini Album",
    tagline: "How to Behave When the Heart is Missing",
    photos: [
      {
        src: "https://images.unsplash.com/photo-1616639943825-e0fbad20a3d3?w=280&h=360&fit=crop&auto=format",
        alt: "Reverie — album cover",
        rotate: 5,
        noteKr: "정규앨범이라 더욱 특별해요",
        noteText: '"Full album —\nbiggest dream achieved"',
        noteColor: "#fdf8f0",
        year: "2023.02",
        label: "Album Cover",
      },
      {
        src: "https://images.unsplash.com/photo-1671712292920-44d2e96d00d6?w=280&h=360&fit=crop&auto=format",
        alt: "Reverie — concert",
        rotate: -3,
        noteKr: "단독 콘서트, 꿈같았어요",
        noteText: '"Solo concert felt\nlike a dream 🌙"',
        noteColor: "#f0f8f2",
        year: "2023.04",
        label: "Solo Concert",
      },
      {
        src: "https://images.unsplash.com/photo-1641351841616-faa0d3760980?w=280&h=360&fit=crop&auto=format",
        alt: "Reverie — fan sign",
        rotate: 2,
        noteKr: "항상 여러분 곁에 있을게요 ♡",
        noteText: '"I\'ll always be\nright here for you ♡"',
        noteColor: "#f6f2fd",
        year: "2023.05",
        label: "Fan Sign",
      },
    ],
  },
  {
    id: "iconicheart",
    title: "ICONIC HEART",
    year: "2026",
    type: "1th Single - japanese release",
    tagline: "The ICONIC Girl Recipe",
    photos: [
      {
        src: "https://images.unsplash.com/photo-1616639943825-e0fbad20a3d3?w=280&h=360&fit=crop&auto=format",
        alt: "Reverie — album cover",
        rotate: 5,
        noteKr: "정규앨범이라 더욱 특별해요",
        noteText: '"Full album —\nbiggest dream achieved"',
        noteColor: "#fdf8f0",
        year: "2023.02",
        label: "Album Cover",
      },
      {
        src: "https://images.unsplash.com/photo-1671712292920-44d2e96d00d6?w=280&h=360&fit=crop&auto=format",
        alt: "Reverie — concert",
        rotate: -3,
        noteKr: "단독 콘서트, 꿈같았어요",
        noteText: '"Solo concert felt\nlike a dream 🌙"',
        noteColor: "#f0f8f2",
        year: "2023.04",
        label: "Solo Concert",
      },
      {
        src: "https://images.unsplash.com/photo-1641351841616-faa0d3760980?w=280&h=360&fit=crop&auto=format",
        alt: "Reverie — fan sign",
        rotate: 2,
        noteKr: "항상 여러분 곁에 있을게요 ♡",
        noteText: '"I\'ll always be\nright here for you ♡"',
        noteColor: "#f6f2fd",
        year: "2023.05",
        label: "Fan Sign",
      },
    ],
  },
]

// ─── Profile hobbies ───────────────────────────────────────────────────────
export const hobbySections: HobbySection[] = [
  {
    id: "mbti",
    icon: "🧠",
    title: "MBTI",
    subtitle: "Personality Type",
    bg: "#f2eff8",
    border: "#d4cee8",
    items: [
      {
        name: "ISTJ — The Logistician",
        detail:
          "Practical, responsible, and highly reliable — values structure, duty, and doing things the right way",
      },
      {
        name: "내향형 (I) · Introverted",
        detail: "Recharges through solitude and quiet, unhurried reflection",
      },
      {
        name: "감각형 (S) · Sensing",
        detail:
          "Focuses on concrete facts, details, and practical reality rather than abstract possibilities",
      },
      {
        name: "사고형 (T) · Thinking",
        detail:
          "Makes decisions based on logic and objectivity — prioritizes fairness and efficiency",
      },
      {
        name: "판단형 (J) · Judging",
        detail:
          "Organized, intentional, and purposeful — prefers clear plans and structure",
      },
    ],
  },
  {
    id: "books",
    icon: "📚",
    title: "Books",
    subtitle: "Her Reading Shelf",
    bg: "#eef4ea",
    border: "#c4d4bc",
    items: [
      {
        name: "Demian",
        detail: "by Hermann Hesse — her confirmed favorite book",
      },
      {
        name: "Yumeiro Pâtissière (꿈빛 파티시엘)",
        detail:
          "her beloved manga — she wants to recreate all the desserts from it",
      },
      {
        name: "Diary / Journal",
        detail: "she has kept a detailed personal diary since her trainee days",
      },
    ],
  },
  {
    id: "accessories",
    icon: "💎",
    title: "Accessories",
    subtitle: "Her Little Collection",
    bg: "#f8f0ea",
    border: "#e0ccb8",
    items: [
      {
        name: "Glasses",
        detail:
          "Her signature item — she regularly wears stylish frames and even bought a new cute pair recently",
      },
      {
        name: "Favorite perfumes",
        detail:
          "Diptyque ‘Olene’ & ‘L’ombre d’Oranger’, Buly ‘Iris de Malte’, Huxley ‘Moroccan Gardener’",
      },
      {
        name: "Mood lamp",
        detail:
          "A gift from her dad that she keeps by her bedside and turns on until she falls asleep",
      },
      {
        name: "Personal scheduler / diary",
        detail:
          "Used since trainee days to carefully track schedules and daily notes",
      },
      {
        name: "Navy & deep green pieces",
        detail:
          "Her two favorite colors — often reflected in clothing and subtle accessories",
      },
      {
        name: "Minimal elegant jewelry",
        detail:
          "Prefers clean and refined pieces (pearls, simple rings, delicate necklaces) that match her chic style",
      },
    ],
  },
  {
    id: "music",
    icon: "🎵",
    title: "Music",
    subtitle: "What She Listens To",
    bg: "#f2eef8",
    border: "#d0c8e4",
    items: [
      {
        name: "aespa – Live My Life",
        detail:
          "Her favorite SM Entertainment song and a track that resonates with her current stage in life",
      },
      {
        name: "Red Velvet – Red Flavor",
        detail: "Her favorite summer song — bright, cute, and full of energy",
      },
      {
        name: "Girls’ Generation – Baby Baby",
        detail:
          "One of the songs she recommended to fans during early promotions",
      },
      {
        name: "BoA – Merry-Chri",
        detail: "Another track she has publicly recommended",
      },
      {
        name: "Hearts2Hearts – Blue Moon",
        detail:
          "Her favorite song from the FOCUS album — she often fell asleep listening to it in the practice room",
      },
      {
        name: "Wave To Earth – Sunny Days",
        detail:
          "Her personal pick for the group’s exclusive ‘Lemon Hour’ playlist",
      },
    ],
  },
  {
    id: "hobbies",
    icon: "🌿",
    title: "Daily Joys",
    subtitle: "Her Little Rituals",
    bg: "#eef4ee",
    border: "#c0d0bc",
    items: [
      {
        name: "Watercolor painting",
        detail:
          "Mostly botanicals and loose portraits — fills whole sketchbooks",
      },
      {
        name: "Film photography",
        detail: "Uses a point-and-shoot from her trainee days, cherishes it",
      },
      {
        name: "Journaling",
        detail: '"I write every night before I sleep — it keeps me grounded"',
      },
      {
        name: "Cooking for members",
        detail: "Signature dishes: doenjang jjigae and japchae",
      },
      {
        name: "Pressed flower art",
        detail: "Collects wildflowers on morning walks, presses them carefully",
      },
      {
        name: "Early morning walks",
        detail: '"Before the city wakes up — my favourite quiet time"',
      },
    ],
  },
  {
    id: "travel",
    icon: "✈️",
    title: "Travel",
    subtitle: "Places She Loves",
    bg: "#eaeff8",
    border: "#bcc8e0",
    items: [
      {
        name: "Jeju Island (제주도)",
        detail: "Grew up visiting with her family every summer",
      },
      {
        name: "Kyoto, Japan",
        detail:
          'First international trip — "I felt like I was inside a painting"',
      },
      {
        name: "Paris, France",
        detail: '"For the light in the afternoon and the quiet bookshops"',
      },
      {
        name: "Busan (부산)",
        detail: "Loves the coast — reminds her of her hometown",
      },
      {
        name: "Prague, Czech Republic",
        detail: '"It looks like a fairy tale — I have to go someday"',
      },
    ],
  },
]

export const momentPhotos: MomentPhoto[] = [
  {
    id: "moment-1",
    src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&h=700&fit=crop&auto=format",
    alt: "Jiwoo and members laughing together",
    year: "2025",
    caption: "Birthday rehearsal night",
    note: "We were all exhausted, but the laughter made the whole room feel warm.",
    member: "Heart2Heart",
  },
  {
    id: "moment-2",
    src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=900&h=700&fit=crop&auto=format",
    alt: "Jiwoo with member after performance",
    year: "2025",
    caption: "After the first fan meet",
    note: "Jiwoo looked so relieved and happy after seeing all the fans cheering for us.",
    member: "Members",
  },
  {
    id: "moment-3",
    src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&h=700&fit=crop&auto=format",
    alt: "Jiwoo and members in casual outing",
    year: "2026",
    caption: "Casual day out",
    note: "The simple moments are the ones we keep replaying in our heads.",
    member: "Jiwoo + members",
  },
]

export const memberLetters: MemberLetter[] = [
  {
    id: "letter-2024",
    year: "2024",
    title: "Thank you for leading us gently",
    from: "Yuna",
    to: "Jiwoo",
    message:
      "Jiwoo, thank you for always making the room feel safe and calm. Even when we were tired, your quiet leadership helped us stand together. We are proud of the way you care for all of us.",
  },
  {
    id: "letter-2025",
    year: "2025",
    title: "You are our warmest light",
    from: "Mina",
    to: "Jiwoo",
    message:
      "We know you carry a lot, and still you always find time to listen and encourage us. You are not only our leader, but also the light that keeps our team warm and steady.",
  },
  {
    id: "letter-2026",
    year: "2026",
    title: "Always believe in your own voice",
    from: "Sei",
    to: "Jiwoo",
    message:
      "Jiwoo, your voice is strong and honest. Even when the days get busy, remember that your quiet confidence is one of the reasons our group shines so beautifully.",
  },
]

export const hachuBoardMessages: BoardMessage[] = [
  {
    id: "board-1",
    author: "Hachu",
    message: "Jiwoo, thank you for always making us feel welcome and seen. Your smile is so comforting.",
    createdAt: "2026-08-18",
  },
  {
    id: "board-2",
    author: "Heart2Heart fan",
    message: "The way Jiwoo leads with patience and warmth is honestly inspiring. Keep shining!",
    createdAt: "2026-08-18",
  },
]
