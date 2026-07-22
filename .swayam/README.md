<div align="center"> 

# ✦ SWAYAM ✦

 

### Digital Multimedia Designer — Portfolio

 

**A cinematic, motion-driven personal portfolio site** Built with React 19 · TypeScript · TanStack Start · Tailwind v4 · Framer Motion · Three.js

 

[Live Preview](https://swayamportfoliosite.netlify.app/) · [LinkedIn](https://www.linkedin.com/in/swayam-sankar-nayak-86b048292/) · [Instagram](https://www.instagram.com/swayam_sankar)

 

---

 </div> 

## ✨ Overview

 

**SWAYAM Portfolio** is a fully self-contained, production-ready personal portfolio for a Digital Multimedia Designer based in Jajpur Town, Odisha. It showcases branding, web design, UI/UX, motion, and creative development work through a bold agency-style visual language: deep near-black backgrounds, oversized display type, an ember-orange accent palette, grain overlay, and physics-driven 3D interactions.

 

The project is **100% independent of any hosted platform** — no CDN pointers, no external asset servers, no third-party lock-in. Every image, video, audio file, and PDF lives in `public/assets/`. Clone it, run `bun install && bun dev`, and it works.

 

---

 

## 🎯 What's Inside

 

### Sections (in scroll order)

 


| #   | Section              | What it does                                                                                                                          |
| --- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| 01  | **Hero**             | Cinematic portrait, oversized H1, animated `OptionWheel` category selector with gear-tick sound                                       |
| 02  | **Services**         | Hover-reveal image cards with `FlowingMenu` — orange sweep on hover/tap                                                               |
| 03  | **Marquee**          | Infinite scrolling brand strip with `LogoLoop`                                                                                        |
| 04  | **Why Hire Me**      | Draggable 3D `Lanyard` card (Three.js + Rapier physics) + count-up stats grid                                                         |
| 05  | **Tech Stack**       | Rotating tech badges via `RotatingText`                                                                                               |
| 06  | **Website Showcase** | Horizontal-scroll browser mockups of shipped web projects                                                                             |
| 07  | **Video Showreel**   | Custom-built HTML5 player with Play/Pause, Mute, portrait (9:16) / landscape (16:9) auto-switching, click-to-lightbox                 |
| 08  | **Technical Work**   | Filterable grid of code / development projects                                                                                        |
| 09  | **Gallery**          | Masonry-style filterable graphic design gallery (Branding · Food · Logos · Packaging)                                                 |
| 10  | **Testimonials**     | Client feedback cards with rating stars                                                                                               |
| 11  | **Certificates**     | Diagonal 3D carousel — click any certificate to open a lightbox, cross to dismiss (Google UX, Adobe InDesign, Anthropic, Oracle, AWS) |
| 12  | **Contact**          | Zod-validated form wired to a Google Apps Script endpoint                                                                             |
| 13  | **Footer**           | Socials (LinkedIn → GitHub → Instagram → X) + Tech Portfolio link                                                                     |


 

### Global Features

 

- **Fuzzy search** in the navbar — type any keyword ("motion", "branding", "testimonials") and smooth-scroll to the matching section
- **Fully responsive** — mobile-first breakpoints, tested on phone, tablet, laptop, desktop
- **Custom cursor & splash effects** on desktop, disabled on touch
- **Sound design** — synthesized gear-click on wheel scroll, muteable video audio
- **SEO complete** — semantic HTML, single H1, JSON-LD schema, sitemap.xml, robots.txt, llms.txt, per-route Open Graph metadata
- **Dark theme by design** — OKLCH color system with `--ember` orange accent, grain-textured background

 

---

 

## 🖼️ UI Preview

 

```
┌──────────────────────────────────────────────────────────────────┐
│  [ SWAYAM® ]     home  work  motion  contact         [ 🔍 ]     │  ← floating pill navbar
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│    ╔══════════════════════════════════════╗   [ 01 / BRAND ]     │
│    ║                                      ║   [ 02 / WEB   ]     │
│    ║        DIGITAL                       ║   [ 03 / MOTION]     │  ← OptionWheel
│    ║        MULTIMEDIA                    ║   [ 04 / UI/UX ]     │     (gear-tick sound)
│    ║        DESIGNER.                     ║                      │
│    ║                                      ║   ┌──────────┐       │
│    ║   Crafting brands, motion &          ║   │ portrait │       │
│    ║   interfaces that feel alive.        ║   │ (video)  │       │
│    ╚══════════════════════════════════════╝   └──────────┘       │
│                                                                  │
├─── SERVICES ─────────────────────────────────────────────────────┤
│                                                                  │
│  ▶ BRANDING ─────────────────────── [orange sweep on hover] ───  │
│  ▶ WEB DESIGN ────────────────────────────────────────────────   │
│  ▶ UI / UX ───────────────────────────────────────────────────   │
│  ▶ MOTION ────────────────────────────────────────────────────   │
│                                                                  │
├─── WHY HIRE ME ──────────────────────────────────────────────────┤
│                                                                  │
│    ┌─────────┐   ┌───────┬───────┐                               │
│    │ 3D      │   │  120+ │  4y   │  ← animated count-up stats    │
│    │ lanyard │   ├───────┼───────┤                               │
│    │ (drag!) │   │  50+  │  98%  │                               │
│    └─────────┘   └───────┴───────┘                               │
│                                                                  │
├─── SHOWREEL ─────────────────────────────────────────────────────┤
│                                                                  │
│    [ CINEMATIC ]  [ REELS ]  [ TECHNICAL ]  ← tabs               │
│                                                                  │
│      ◀   ┌──────┐  ┌────────┐  ┌──────┐   ▶                     │
│          │ 9:16 │  │  16:9  │  │ 9:16 │                          │
│          │ ►  ♪ │  │  ► ♪   │  │ ►  ♪ │      click → lightbox   │
│          └──────┘  └────────┘  └──────┘                          │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘

```

 

**Palette** `#0A0A0B` background · `#F25C1F` ember · `#F5F5F0` bone · grain overlay **Type** Oversized uppercase display · thin sans body · monospace labels

 

---

 

## 📁 Folder Structure

 

```
swayam-portfolio/
├── public/
│   ├── assets/                        # All local images, videos, audio, PDFs
│   │   ├── ani_1..5.mp4               # Motion clips
│   │   ├── cinematic-portrait.mp4     # Hero portrait video
│   │   ├── prabhlens-2025.mp4         # Cinematic reel
│   │   ├── jai-jagannath.mp4          # Devotional reel (ffmpeg-compressed)
│   │   ├── gear-click.mp3             # OptionWheel scroll sound
│   │   ├── google-ux-certificate.jpg  # Certificates
│   │   ├── gallery-*.png              # Filterable gallery items
│   │   ├── profile-portrait-suit.png  # Why Hire Me lanyard photo
│   │   └── ...                        # 44 assets total
│   ├── robots.txt
│   └── llms.txt
│
├── src/
│   ├── routes/                        # TanStack Start file-based routing
│   │   ├── __root.tsx                 # App shell — html/head/body, JSON-LD, SEO meta
│   │   ├── index.tsx                  # Home page — composes all sections
│   │   ├── sitemap[.]xml.ts           # Dynamic sitemap route
│   │   └── README.md
│   │
│   ├── components/
│   │   ├── portfolio/                 # Page sections (12 files, one per section)
│   │   │   ├── Navbar.tsx             # Floating pill nav + fuzzy search
│   │   │   ├── Hero.tsx               # H1, portrait, OptionWheel + gear sound
│   │   │   ├── Services.tsx
│   │   │   ├── Marquee.tsx
│   │   │   ├── WhyHireMe.tsx          # Lanyard + count-up stats
│   │   │   ├── TechStack.tsx
│   │   │   ├── WebsiteShowcase.tsx
│   │   │   ├── VideoShowreel.tsx      # Custom player + lightbox
│   │   │   ├── TechnicalWork.tsx
│   │   │   ├── Gallery.tsx            # Filterable masonry
│   │   │   ├── Testimonials.tsx
│   │   │   ├── Certificates.tsx       # Diagonal carousel + lightbox
│   │   │   ├── Contact.tsx            # Zod form → Google Apps Script
│   │   │   ├── Footer.tsx
│   │   │   ├── RatingStars.tsx
│   │   │   └── SectionHeading.tsx
│   │   │
│   │   ├── reactbits/                 # Motion / animation primitives
│   │   │   ├── BlurText.tsx           # Semantic heading blur reveal
│   │   │   ├── FallingText.tsx        # Matter.js physics text
│   │   │   ├── FlowingMenu.tsx        # Hover-sweep menu
│   │   │   ├── GhostCursor.tsx
│   │   │   ├── Lanyard.tsx            # Three.js + Rapier 3D card
│   │   │   ├── LogoLoop.tsx
│   │   │   ├── OptionWheel.tsx        # iOS-style scroll wheel
│   │   │   ├── RotatingText.tsx
│   │   │   ├── SplashCursor.tsx       # WebGL fluid cursor
│   │   │   └── TrueFocus.tsx
│   │   │
│   │   └── ui/                        # shadcn primitives + custom widgets
│   │       ├── diagonal-carousel.tsx  # Certificates carousel
│   │       └── perspective-carousel.tsx # Video showreel carousel
│   │
│   ├── data/
│   │   └── portfolio.ts               # All copy, testimonials, gallery items
│   │
│   ├── hooks/
│   │   ├── use-count-up.ts
│   │   ├── use-in-view.ts
│   │   └── use-mobile.tsx
│   │
│   ├── lib/
│   │   ├── utils.ts                   # cn() helper
│   │   ├── error-capture.ts
│   │   └── error-page.ts
│   │
│   ├── assets/                        # Model files only (card.glb, lanyard.png)
│   ├── styles.css                     # Tailwind v4 + OKLCH tokens + @theme
│   ├── router.tsx
│   ├── server.ts
│   ├── start.ts
│   └── routeTree.gen.ts               # ⚠ auto-generated — do not edit
│
├── package.json
├── vite.config.ts
├── tsconfig.json
├── components.json                    # shadcn config
├── eslint.config.js
├── .prettierrc
├── .env.example
└── README.md

```

 

---

 

## 🚀 Getting Started

 

### Prerequisites

 

- **Node.js** 20+ or **Bun** 1.1+
- macOS · Linux · Windows (WSL recommended)

 

### Install & run

 

```bash
# 1. Install dependencies
bun install
# or:  npm install

# 2. Copy env template (optional — none required for local dev)
cp .env.example .env

# 3. Start dev server (http://localhost:8080)
bun dev
# or:  npm run dev

# 4. Production build
bun run build

# 5. Preview the production build
bun run start

```

 

---

 

## 🧰 Tech Stack

 


| Layer         | Choice                                                                         |
| ------------- | ------------------------------------------------------------------------------ |
| Framework     | **TanStack Start v1** (React 19 · SSR-capable)                                 |
| Bundler       | **Vite 7**                                                                     |
| Language      | **TypeScript** (strict)                                                        |
| Styling       | **Tailwind CSS v4** (native `@import`, `@theme` tokens, OKLCH palette)         |
| UI Primitives | **shadcn/ui** + Radix                                                          |
| Animation     | **Framer Motion** · **GSAP** (where needed)                                    |
| 3D / Physics  | **Three.js** · **@react-three/fiber** · **@react-three/rapier** · **meshline** |
| Physics Text  | **Matter.js**                                                                  |
| Forms         | **React Hook Form** + **Zod**                                                  |
| Toasts        | **Sonner**                                                                     |
| Icons         | **lucide-react**                                                               |


 

---

 

## 🔎 SEO & Accessibility

 

- Single semantic `<h1>` per route with proper heading hierarchy
- JSON-LD `Person` schema in `__root.tsx`
- Per-route `head()` with unique `title`, `meta description`, `og:title`, `og:description`
- `robots.txt`, `llms.txt`, dynamic `/sitemap.xml`
- ARIA labels on the search input and interactive controls
- Alt text on every image · lazy-loading enabled

 

---

 

## 📜 License

 

Personal portfolio — © Swayam Sankar Nayak. Code is available for reference and learning; assets (photos, videos, certificates) are proprietary.

 

---

 <div align="center"> 

**Crafted with obsessive attention to motion, type, and detail.** Jajpur Town, Odisha · 2026

 </div>