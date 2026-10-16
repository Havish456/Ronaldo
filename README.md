# CR7 — Career Timeline

An interactive, scroll-driven career timeline of Cristiano Ronaldo — from the streets of Funchal to the pinnacle of world football.

## 🎨 Visual Design

A cinematic, dark-mode portfolio with era-specific color theming:

| Era | Club | Accent Color |
|-----|------|-------------|
| Era 1 | Sporting CP | 🟢 Emerald (#10b981) |
| Era 2 | Manchester United | 🔴 Crimson (#ef011d) |
| Era 3 | Real Madrid | ⚪ White (#f5f5f5) |
| Era 4 | Portugal | 🔴 Crimson (#ef011d) |
| Era 5 | Juventus | 🟡 Amber (#fbbf24) |
| Era 6 | Manchester United | 🔴 Crimson (#ef011d) |
| Era 7 | Al-Nassr | 🟡 Gold (#f7c600) |

### Visual Features

- **WebGL distortion background** — A custom Three.js shader that reacts to cursor movement and scroll progress, with cinematic hue shifts
- **Duotone era overlays** — Background photos are subtly tinted with each era's club color
- **Glassmorphism UI** — Frosted glass card surfaces with colored hover glows
- **Cinematic noise texture** — Subtle film grain overlay for depth
- **Global vignette** — Radial darkness at screen edges for focused viewing
- **Per-era accent theming** — Every component adapts its colors to the active era

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
npm run build
```

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | **Next.js 16** (App Router, Turbopack) |
| Styling | **Tailwind CSS** v4 |
| Animations | **GSAP** (scroll-triggered) + CSS transitions |
| 3D / Shaders | **React Three Fiber** + **Three.js** |
| Fonts | **Inter** (headings/body), **Fira Code** (mono) |

## 🖼️ Photo Gallery & Slideshow

The site features **high-definition CR7 photos** across two placements:

### Era Section Images
Each era section displays a **featured image** below the header, styled with:
- Era color overlay (duotone tint matching the club colors)
- Colored border and drop-shadow matching the active era accent
- GSAP-reveal animation (fade + slide-up on scroll)

### Legend in Motion Gallery (Slideshow)
A click-to-advance slideshow at the **bottom of the page** featuring all 7 career eras:

- **Click** the front image or use arrow buttons to advance
- **Pop animation**: Fade-out → image swap → pop-in with `back.out(1.2)` easing
- Era color-coded caption and navigation dots
- Shows the progression: Sporting CP → Manchester United → Real Madrid → Portugal → Juventus → Al-Nassr → return

## 📂 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with Inter + Fira Code fonts
│   ├── globals.css         # Base styles, noise texture, glass utilities
│   └── page.tsx            # Main page — Hero, Timeline, Footer
├── components/
│   ├── Hero.tsx            # Hero section — headline, stats, CTA, scroll cue
│   ├── Timeline.tsx        # Scroll progress tracker + era sections
│   ├── EraSection.tsx      # Era card with featured image, milestones, stats, achievements
│   ├── EraNavBar.tsx       # Sticky era navigation bar with CR7 logo mark
│   ├── TimelineBackground.tsx  # Parallax era backgrounds, duotone overlays, vignette
│   ├── DistortionBackground.tsx # WebGL shader plane (cursor + scroll reactive)
│   ├── Slideshow.tsx       # Click-to-advance career photo gallery
│   ├── ScrollProgress.tsx  # Top scroll progress bar
│   ├── BackToTop.tsx       # Floating scroll-to-top button
│   └── Footer.tsx          # Footer with CR7 logo, career totals
├── data/
│   └── timeline.ts         # Typed career data (7 eras, 21+ milestones)
├── lib/
│   └── store.ts            # Lightweight reactive store (scroll progress, active era)
├── public/
│   ├── cr7-logo.svg        # Full CR7 shield logo (Hero watermark)
│   └── favicon.svg         # Simplified CR7 favicon
└── tailwind.config.js      # Extended color palette, gradients, animations
```

## 📊 Career Data

The timeline covers **7 eras** spanning 1985–2026:

- **977 career goals** (23 from 1,000)
- **5 Ballon d'Or** trophies (2008, 2013, 2014, 2016, 2017)
- **5 Champions League titles** (4 with Real Madrid, 1 with United)
- **146 Portugal international goals** (world record)
- **6 World Cups** scored in (2006–2026)
- Current club: **Al-Nassr** (contract until 2027)

## 🎯 Interactive Features

- **Scroll-driven timeline** — Era backgrounds shift with parallax as you scroll
- **Active era tracking** — Navbar and CharacterFigure update to the current era
- **Smooth scroll navigation** — Click any era in the nav or quick-jump pills
- **WebGL background** — Cursor-reactive distortion shader (falls back to CSS gradient if WebGL unavailable)

## 📝 License

Fan-made educational project. Not affiliated with Cristiano Ronaldo or any football club.

---

*Built with Next.js 16, Tailwind CSS, GSAP, and Three.js.*
