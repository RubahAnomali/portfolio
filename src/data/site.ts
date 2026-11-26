// All portfolio content lives here. Swap in your real info.

export interface NavItem {
  id: string
  label: string
}

export interface Social {
  label: string
  href: string
  icon: 'github' | 'linkedin' | 'dribbble' | 'youtube' | 'mail' | 'x' | 'facebook' | 'instagram' | 'discord' | 'tiktok'
}

export interface Project {
  title: string
  kind: string
  /** Month and year shown next to the kind, e.g. 'Aug 2026'. */
  year: string
  summary: string
  tags: string[]
  links: { label: string; href: string }[]
  /** Optional screenshot in /public, e.g. '/projects/ledgerly.jpg'. Falls back to the gradient. */
  image?: string
  /** Optional short muted loop in /public (mp4). Plays on the selected Projects card; `image` stays as the poster. */
  video?: string
  /** Optional square cut of the clip for the Projects card, e.g. one that follows the player. Falls back to `video`. */
  cardVideo?: string
  /** Optional square still for the Projects card, used instead of `image` (which is 16:9 and gets cropped there). */
  cardImage?: string
  /** Placeholder cover gradient. */
  cover: string
}

export interface UpdateItem {
  title: string
  date: string
  tag: string
  href: string
  image?: string
  /** Optional gameplay loop, played on the featured Updates card. */
  video?: string
  cover: string
}

export interface SkillNode {
  id: string
  title: string
  blurb: string
  items: string[]
  /** Position on the map in hex-grid coordinates (col,row). */
  col: number
  row: number
}

export interface Chapter {
  period: string
  role: string
  company: string
  points: string[]
  /** Optional picture for the big card; without one the card keeps its plain gradient. */
  image?: string
}

export interface GalleryItem {
  title: string
  cover: string
  image?: string
  /** Where the 16:9 tile crops the picture (CSS background-position), so a tall photo keeps its subject. */
  focus?: string
}

export const profile = {
  name: 'RubahAnomali',
  githubUser: 'RubahAnomali',
  /** Huge hero wordmark. */
  wordmark: 'RUBAHANOMALI',
  brandMark: 'RA',
  role: 'Web & Game Developer · Cyber Security Student',
  tagline: 'Building interactive web experiences, WebGL graphics, and indie games.',
  codename: 'Operator: Foxxy',
  rank: 4,
  class: 'Web & Game Developer',
  codeVoice: 'Open to internships · collaborations · freelance',
  bio: [
    'I’m a Computer Science (Informatika) student at Universitas Pelita Harapan specializing in Cyber Security, with a strong focus on web development, real-time WebGL graphics, and game design. I enjoy turning complex math and system logic into responsive, interactive browser experiences.',
    'Based in Tangerang, Indonesia, I spend my time building web applications, experimenting with shaders and game mechanics, and exploring how security fits into modern software architecture. Away from the screen I take photos around the city, mostly at night; they are on the Photography page. Currently open to internships, collaborations, and freelance projects.',
  ],
  stats: [
    { label: 'Web & Frontend', value: 88 },
    { label: 'Game Dev & WebGL', value: 85 },
    { label: 'Cyber Security', value: 80 },
    { label: 'UI / Design Sense', value: 82 },
  ],
  /** Full-length cut-out of you sitting, with a transparent background, a file in /public (WebP, 385 x 582). The About stage
   *  puts the frame's top edge at the seat (the `--seat` value in index.css), so a different picture needs that value
   *  checked. Leave undefined to show a silhouette. */
  photo: '/media/portrait.webp' as string | undefined,
  email: 'farrellfyelo@gmail.com',
  /** Path or URL of your résumé PDF (e.g. '/resume.pdf' in /public). Leave empty to hide the button. */
  resumeHref: '',
  location: 'Tangerang, Indonesia',
  footerLine: 'Crafting code, shaders, and controlled chaos.',
  copyright: '© 2026 RubahAnomali.',
}

export interface RosterEntry {
  id: string
  /** 3-4 letters shown on the thumbnail. */
  short: string
  label: string
  class: string
  blurb: string
  bio: string[]
  stats: { label: string; value: number }[]
}

/** The "operator roster" on the About slide: switch between facets of your profile. */
export const roster: RosterEntry[] = [
  { id: 'all', short: 'ALL', label: 'Overview', class: profile.class, blurb: 'The full profile.', bio: profile.bio, stats: profile.stats },
  {
    id: 'web',
    short: 'WEB',
    label: 'Web & Frontend',
    class: 'Web Developer',
    blurb: 'Responsive, interactive browser experiences.',
    bio: [
      'I build web applications and responsive interfaces, turning complex math and system logic into smooth, interactive browser experiences.',
      'I care about the details between design and code: layout, motion and usability.',
    ],
    stats: [
      { label: 'Web & Frontend', value: 88 },
      { label: 'UI / Design Sense', value: 82 },
    ],
  },
  {
    id: 'game',
    short: 'GAME',
    label: 'Game Dev & WebGL',
    class: 'Game Developer',
    blurb: 'Shaders, real-time graphics and game mechanics.',
    bio: [
      'Real-time WebGL graphics, shaders and game mechanics are where I spend most of my free time.',
      'Six games you can play in the browser so far: tactical, action, 3D, physics, network stealth and a Unity soulslike, all drawn procedurally with synthesised audio.',
    ],
    stats: [{ label: 'Game Dev & WebGL', value: 85 }],
  },
  {
    id: 'security',
    short: 'SEC',
    label: 'Cyber Security',
    class: 'Cyber Security Student',
    blurb: 'Security in modern software architecture.',
    bio: [
      'I study Cyber Security at Universitas Pelita Harapan: network and system security, cryptography and secure web engineering.',
      'I’m exploring how security fits into modern software architecture, and I build open-source tools: patchlint, a beginner-friendly security linter for Dockerfiles and GitHub Actions workflows, is on PyPI.',
    ],
    stats: [{ label: 'Cyber Security', value: 80 }],
  },
]

/**
 * Sections you can switch on and off. The Photography slide (id `gallery`) shows the pictures listed in
 * `galleryTabs` below; set `gallery: false` to hide it, nav link included.
 */
export const features = { gallery: true }

const allNavItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'updates', label: 'Updates' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'journey', label: 'Journey' },
  { id: 'gallery', label: 'Photography' },
  { id: 'contact', label: 'Contact' },
]
export const navItems: NavItem[] = allNavItems.filter((n) => n.id !== 'gallery' || features.gallery)

/** The Instagram account the photos come from: the Photography slide's "More" button and a social link go here. */
export const photographyHref = 'https://www.instagram.com/almbakapuji/'

export const socials: Social[] = [
  { label: 'GitHub', href: 'https://github.com/RubahAnomali', icon: 'github' },
  { label: 'Email', href: `mailto:${profile.email}`, icon: 'mail' },
  { label: 'Instagram', href: 'https://www.instagram.com/prlpyl/', icon: 'instagram' },
  { label: 'Photography on Instagram', href: photographyHref, icon: 'instagram' },
  // To add another network, push an entry here; the right strip and the Contact slide pick it up. An entry with an
  // empty href is drawn as an inactive icon in the strip and left out of Contact.
]

export const updates: UpdateItem[] = [
  { title: 'Drowned Bell — 2D soulslike made in Unity', date: '2026.11.26', tag: 'Game', href: 'https://github.com/RubahAnomali/drowned-bell', cover: 'linear-gradient(120deg, #0b0f14, #2f4b55 60%, #d79a3b)', image: '/media/games/drowned-bell.jpg', video: '/media/games/drowned-bell.mp4' },
  { title: 'patchlint — security linter for Dockerfiles and GitHub Actions', date: '2026.11.25', tag: 'Security', href: 'https://github.com/RubahAnomali/patchlint', cover: 'linear-gradient(120deg, #07141a, #0b7894 60%, #ff7a59)', image: '/media/projects/patchlint.jpg', video: '/media/projects/patchlint.mp4' },
  { title: 'Packet Ghost — network stealth and infiltration', date: '2026.11.25', tag: 'Game', href: 'https://github.com/RubahAnomali/packet-ghost', cover: 'linear-gradient(120deg, #0a1014, #2c6f66 60%, #ff5a3c)', image: '/media/games/packet-ghost.jpg', video: '/media/games/packet-ghost.mp4' },
  { title: 'Slingshot Salvage — orbital salvage game', date: '2026.11.10', tag: 'Game', href: 'https://github.com/RubahAnomali/slingshot-salvage', cover: 'linear-gradient(120deg, #0a2a5e, #2a6fd6 60%, #e8c25a)', image: '/media/games/slingshot-salvage.jpg', video: '/media/games/slingshot-salvage.mp4' },
  { title: 'Kinetic Courier — grapple-hook time trial', date: '2026.10.12', tag: 'Game', href: 'https://github.com/RubahAnomali/kinetic-courier', cover: 'linear-gradient(120deg, #2b2b2e, #c4562a 60%, #f0b27a)', image: '/media/games/kinetic-courier.jpg', video: '/media/games/kinetic-courier.mp4' },
  { title: 'Cyber-Parry Arena — parry-driven arena action', date: '2026.09.20', tag: 'Game', href: 'https://github.com/RubahAnomali/cyber-parry-arena', cover: 'linear-gradient(120deg, #0b0f24, #1fb5d6 55%, #d63ad0)', image: '/media/games/cyber-parry-arena.jpg', video: '/media/games/cyber-parry-arena.mp4' },
  { title: 'Breach Protocol — tactical room clearing', date: '2026.08.15', tag: 'Game', href: 'https://github.com/RubahAnomali/breach-protocol', cover: 'linear-gradient(120deg, #1a1d22, #4a5560 55%, #c0392b)', image: '/media/games/breach-protocol.jpg', video: '/media/games/breach-protocol.mp4' },
]

export const skillNodes: SkillNode[] = [
  {
    id: 'web',
    title: 'Web',
    blurb: 'Responsive, interactive browser experiences.',
    items: ['JavaScript', 'TypeScript', 'HTML / CSS', 'Vite'],
    col: 4,
    row: 2,
  },
  {
    id: 'games',
    title: 'Game Dev',
    blurb: 'Shaders, real-time graphics and game mechanics.',
    items: ['Game Development', 'Unity / C#', 'WebGL', 'Canvas 2D', 'Three.js', 'WebAudio synthesis', 'Utility AI', 'HFSM'],
    col: 7,
    row: 2,
  },
  {
    id: 'security',
    title: 'Security',
    blurb: 'Studying how security fits into modern software architecture.',
    items: ['Cyber Security', 'Cryptography', 'Network security', 'System security', 'Secure web engineering', 'DevSecOps', 'Static analysis', 'Python'],
    col: 4,
    row: 4,
  },
  {
    id: 'systems',
    title: 'Systems',
    blurb: 'Linux servers and virtual machines.',
    items: ['Linux / Ubuntu Server', 'Oracle VM'],
    col: 7,
    row: 5,
  },
  {
    id: 'photo',
    title: 'Photography',
    blurb: 'Night and street photography around the city, plus skies.',
    items: ['Night photography', 'Street photography', 'Long exposure'],
    col: 9,
    row: 3,
  },
]

export const projects: Project[] = [
  {
    title: 'Breach Protocol',
    kind: 'Tactical game',
    year: 'Aug 2026',
    summary: 'Turn-based room clearing in the spirit of Into the Breach. Enemies telegraph their next move; you kill, shove or pin them to break it. Procedural art, synthesised sound, undo/redo.',
    tags: ['TypeScript', 'Canvas 2D', 'WebAudio', 'Vite'],
    links: [
      { label: 'Play', href: '/games/breach-protocol/' },
      { label: 'Source', href: 'https://github.com/RubahAnomali/breach-protocol' },
    ],
    cover: 'linear-gradient(135deg, #14171b, #3d4a56 55%, #c0392b)',
    image: '/media/games/breach-protocol.jpg',
    video: '/media/games/breach-protocol.mp4',
  },
  {
    title: 'Cyber-Parry Arena',
    kind: 'Action game',
    year: 'Sep 2026',
    summary: 'Top-down arena action. Deflect sniper rail shots back at their owners, stun lunges with a timed parry, dash through lines and flank shielded units.',
    tags: ['TypeScript', 'Canvas 2D', 'Utility AI', 'WebAudio'],
    links: [
      { label: 'Play', href: '/games/cyber-parry-arena/' },
      { label: 'Source', href: 'https://github.com/RubahAnomali/cyber-parry-arena' },
    ],
    cover: 'linear-gradient(135deg, #0a0e22, #1fb5d6 55%, #d63ad0)',
    image: '/media/games/cyber-parry-arena.jpg',
    video: '/media/games/cyber-parry-arena.mp4',
    cardVideo: '/media/games/cyber-parry-arena-card.mp4',
  },
  {
    title: 'Kinetic Courier',
    kind: '3D game',
    year: 'Oct 2026',
    summary: 'First-person, momentum-based grapple-hook time trial across a brutalist rooftop course. Spring-damper rope, wall-runs, drones and a ghost replay of your best run.',
    tags: ['TypeScript', 'Three.js', 'HFSM', 'Procedural'],
    links: [
      { label: 'Play', href: '/games/kinetic-courier/' },
      { label: 'Source', href: 'https://github.com/RubahAnomali/kinetic-courier' },
    ],
    cover: 'linear-gradient(135deg, #2a2a2d, #c4562a 55%, #f4c28f)',
    image: '/media/games/kinetic-courier.jpg',
    video: '/media/games/kinetic-courier.mp4',
  },
  {
    title: 'Slingshot Salvage',
    kind: 'Physics game',
    year: 'Nov 2026',
    summary: 'A cyanotype-blueprint orbital salvage game. Tether pods, use free gravity, tow them to the drop zone and keep fuel, hull and cargo alive.',
    tags: ['TypeScript', 'Canvas 2D', 'Orbital physics', 'WebAudio'],
    links: [
      { label: 'Play', href: '/games/slingshot-salvage/' },
      { label: 'Source', href: 'https://github.com/RubahAnomali/slingshot-salvage' },
    ],
    cover: 'linear-gradient(135deg, #0a2a5e, #2a6fd6 55%, #e8c25a)',
    image: '/media/games/slingshot-salvage.jpg',
    video: '/media/games/slingshot-salvage.mp4',
  },
  {
    title: 'Packet Ghost',
    kind: 'Stealth game',
    year: 'Nov 2026',
    summary: 'Real-time network infiltration. Crack a procedural corporate graph node by node while ICE hunters triangulate your noise through a shared blackboard. Play from the graph or the built-in console.',
    tags: ['TypeScript', 'Canvas 2D', 'Graph AI', 'WebAudio'],
    links: [
      { label: 'Play', href: '/games/packet-ghost/' },
      { label: 'Source', href: 'https://github.com/RubahAnomali/packet-ghost' },
    ],
    cover: 'linear-gradient(135deg, #0a1014, #2c6f66 55%, #ff5a3c)',
    image: '/media/games/packet-ghost.jpg',
    video: '/media/games/packet-ghost.mp4',
  },
  {
    title: 'Drowned Bell',
    kind: 'Unity game',
    year: 'Nov 2026',
    summary: 'A short 2D soulslike made in Unity. A salvage diver climbs down a flooded bell tower: read enemy wind-ups, jump the floor ripples, open a shortcut back to the lamp and silence the Undertoll, a boss with three telegraphed attacks.',
    tags: ['Unity', 'C#', 'Pixel art', 'FSM'],
    links: [
      { label: 'Play', href: '/games/drowned-bell/' },
      { label: 'Source', href: 'https://github.com/RubahAnomali/drowned-bell' },
    ],
    cover: 'linear-gradient(135deg, #0b0f14, #2f4b55 55%, #d79a3b)',
    image: '/media/games/drowned-bell.jpg',
    video: '/media/games/drowned-bell.mp4',
  },
  {
    title: 'patchlint',
    kind: 'Security tool',
    year: 'Nov 2026',
    summary: 'A beginner-friendly security linter for Dockerfiles, GitHub Actions workflows and docker-compose files. Every finding explains why it matters and how to fix it. Text, JSON and SARIF output for GitHub code scanning, rule plugins, and published on PyPI.',
    tags: ['Python', 'DevSecOps', 'SARIF', 'PyPI'],
    links: [
      { label: 'PyPI', href: 'https://pypi.org/project/patchlint/' },
      { label: 'Source', href: 'https://github.com/RubahAnomali/patchlint' },
    ],
    cover: 'linear-gradient(135deg, #07141a, #0b7894 55%, #ff7a59)',
    image: '/media/projects/patchlint.jpg',
    video: '/media/projects/patchlint.mp4',
    cardImage: '/media/projects/patchlint-card.jpg',
    cardVideo: '/media/projects/patchlint-card.mp4',
  },
]

/** Games you can play in the browser: their first link is "Play". The hero and the Games tabs only list these. */
export const isPlayable = (p: Project) => p.links[0]?.label === 'Play'
/** True when `href` is the repository or play link of a playable project. */
export const isGameHref = (href: string) => projects.some((p) => isPlayable(p) && p.links.some((l) => l.href === href))

export const chapters: Chapter[] = [
  {
    period: 'Nov 2026',
    role: 'Drowned Bell',
    company: 'Soulslike · Unity, C#',
    points: ['A 2D soulslike in Unity: seven connected rooms, enemies with readable wind-ups, a checkpoint, an unlockable shortcut and a three-attack boss.', 'Game rules in plain C# with a headless test suite, plus an autopilot bot that plays the real build from start to finish for QA.'],
    image: '/media/games/drowned-bell.jpg',
  },
  {
    period: 'Nov 2026',
    role: 'patchlint',
    company: 'Security tool · Python, PyPI',
    points: ['Beginner-friendly security linter for Dockerfiles, GitHub Actions workflows and docker-compose files. Every finding says why it matters and how to fix it.', 'Published on PyPI with SARIF output for GitHub code scanning, rule plugins and rules contributed by other developers.'],
    image: '/media/projects/patchlint.jpg',
  },
  {
    period: 'Nov 2026',
    role: 'Packet Ghost',
    company: 'Stealth game · TypeScript, Canvas',
    points: ['Network infiltration on a seeded, validated graph with a deterministic fixed-step simulation.', 'ICE agents share an AI blackboard, run a hierarchical state machine and path with heat-weighted Dijkstra.'],
    image: '/media/games/packet-ghost.jpg',
  },
  {
    period: 'Nov 2026',
    role: 'Slingshot Salvage',
    company: 'Physics game · TypeScript, Canvas',
    points: ['Cyanotype-blueprint orbital salvage: tether pods, use gravity, tow them home.', 'Orbital physics, gravity-field visualisation and synthesised audio.'],
    image: '/media/games/slingshot-salvage.jpg',
  },
  {
    period: 'Oct 2026',
    role: 'Kinetic Courier',
    company: '3D game · TypeScript, Three.js',
    points: ['First-person grapple-hook time trial with a spring-damper rope and wall-runs.', 'Player state machine, EMP drones and ghost replay of your best run.'],
    image: '/media/games/kinetic-courier.jpg',
  },
  {
    period: 'Sep 2026',
    role: 'Cyber-Parry Arena',
    company: 'Action game · TypeScript, Canvas',
    points: ['Parry-driven arena combat: deflect rail shots, stun lunges, dash through lines.', 'Utility-AI enemies and a debug HUD for tuning.'],
    image: '/media/games/cyber-parry-arena.jpg',
  },
  {
    period: 'Aug 2026',
    role: 'Breach Protocol',
    company: 'Tactical game · TypeScript, Canvas',
    points: ['Turn-based room clearing where enemies telegraph their next move.', 'Exact-outcome previews, undo/redo and procedural art.'],
    image: '/media/games/breach-protocol.jpg',
  },
  {
    period: '2024 — Present',
    role: 'B.Sc. Informatics (Cyber Security)',
    company: 'Universitas Pelita Harapan',
    points: ['Network and system security, cryptography, web engineering.', 'Interactive computer graphics and game design.'],
  },
]

// The pictures are in public/media/photos/ (960 px wide, no metadata). A slide shows the first six of a tab.
export const galleryTabs: { id: string; label: string; items: GalleryItem[] }[] = [
  {
    id: 'city',
    label: 'City & night',
    items: [
      { title: 'Fogging the courtyard', cover: 'linear-gradient(135deg, #2a1a1a, #7a4a3a)', image: '/media/photos/fogging-the-courtyard.jpg', focus: 'center 72%' },
      { title: 'Underpass', cover: 'linear-gradient(135deg, #1a0b05, #a8501c)', image: '/media/photos/underpass.jpg', focus: 'center 30%' },
      { title: 'Night food cart', cover: 'linear-gradient(135deg, #0b1013, #c4562a)', image: '/media/photos/night-food-cart.jpg', focus: 'center 40%' },
      { title: 'Ice cream cat', cover: 'linear-gradient(135deg, #14301f, #c0392b)', image: '/media/photos/ice-cream-cat.jpg' },
      { title: 'Light trails', cover: 'linear-gradient(135deg, #07090d, #3a3f4a)', image: '/media/photos/light-trails.jpg', focus: 'center 65%' },
      { title: 'Concourse', cover: 'linear-gradient(135deg, #2b1c10, #8a5a30)', image: '/media/photos/concourse.jpg', focus: 'center 45%' },
    ],
  },
  {
    id: 'sky',
    label: 'Skies',
    items: [
      { title: 'Storm over the gas station', cover: 'linear-gradient(135deg, #07243a, #1c6a8a)', image: '/media/photos/storm-over-the-gas-station.jpg', focus: 'center 60%' },
      { title: 'Evening clouds', cover: 'linear-gradient(135deg, #3a2a14, #d99a4a)', image: '/media/photos/evening-clouds.jpg', focus: 'center 55%' },
      { title: 'Sunset over the city', cover: 'linear-gradient(135deg, #2a2210, #b8861f)', image: '/media/photos/sunset-over-the-city.jpg', focus: 'center 40%' },
    ],
  },
]
