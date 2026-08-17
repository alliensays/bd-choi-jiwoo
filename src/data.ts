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
    style: { top: "14%", left: "3%", rotate: "-6deg", width: "130px" },
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
    style: { top: "10%", right: "4%", rotate: "5deg", width: "120px" },
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
    style: { bottom: "14%", left: "2%", rotate: "-4deg", width: "115px" },
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
    style: { bottom: "12%", right: "3%", rotate: "7deg", width: "120px" },
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
    style: { top: "44%", left: "0.5%", rotate: "-8deg", width: "100px" },
  },
]

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
