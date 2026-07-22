import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Menu, X, Search } from "lucide-react";

const links = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Gallery", href: "#gallery" },
];

type Entry = { label: string; href: string; keywords: string[] };

const searchIndex: Entry[] = [
  { label: "Home", href: "#home", keywords: ["home", "hero", "intro", "swayam", "designer", "start", "top"] },
  { label: "Services", href: "#services", keywords: ["services", "what we do", "branding", "web design", "development", "ui", "ux", "motion", "design"] },
  { label: "Why Hire Me", href: "#why", keywords: ["why hire me", "hire", "about", "stats", "experience", "profile", "card", "lanyard"] },
  { label: "Tech Stack", href: "#tech", keywords: ["tech", "stack", "technology", "skills", "tools", "logos", "react", "node", "figma"] },
  { label: "Website Showcase", href: "#work", keywords: ["work", "websites", "showcase", "sites", "web", "productpulse", "gastronome", "expense", "tasksway", "thrilling frames"] },
  { label: "Technical Work", href: "#projects", keywords: ["projects", "technical", "github", "code", "quizkit", "productpulse", "expense intelligence", "factify", "tasksway", "restaurant"] },
  { label: "Showreel", href: "#showreel", keywords: ["showreel", "video", "motion", "cinematic", "reel", "portrait", "landscape"] },
  { label: "Gallery", href: "#gallery", keywords: ["gallery", "design", "logo", "branding", "food", "packaging", "posters"] },
  { label: "Testimonials", href: "#testimonials", keywords: ["testimonials", "reviews", "clients", "feedback"] },
  { label: "Contact", href: "#contact", keywords: ["contact", "let's talk", "email", "hire", "message", "form", "reach"] },
];

function scoreEntry(e: Entry, q: string) {
  const s = q.toLowerCase().trim();
  if (!s) return 0;
  if (e.label.toLowerCase() === s) return 100;
  if (e.label.toLowerCase().startsWith(s)) return 80;
  if (e.label.toLowerCase().includes(s)) return 60;
  let best = 0;
  for (const k of e.keywords) {
    if (k === s) best = Math.max(best, 70);
    else if (k.startsWith(s)) best = Math.max(best, 50);
    else if (k.includes(s)) best = Math.max(best, 30);
  }
  return best;
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const searchWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!searchWrapRef.current?.contains(e.target as Node)) setShowResults(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return searchIndex
      .map((e) => ({ e, score: scoreEntry(e, query) }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map((r) => r.e);
  }, [query]);

  const go = (href: string) => {
    setShowResults(false);
    setQuery("");
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.location.hash = href;
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActiveIdx((i) => Math.min(i + 1, results.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActiveIdx((i) => Math.max(i - 1, 0)); }
    else if (e.key === "Enter" && results[activeIdx]) { e.preventDefault(); go(results[activeIdx].href); }
    else if (e.key === "Escape") { setShowResults(false); }
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      <nav
        className={`flex w-full max-w-5xl items-center gap-3 rounded-full border border-white/10 bg-black/70 px-3 py-2 backdrop-blur-xl transition-shadow ${
          scrolled ? "shadow-lift" : ""
        }`}
      >
        <a href="#home" className="font-display px-3 text-lg font-bold tracking-tight">
          SWAYAM<span className="text-ember">®</span>
        </a>
        <ul className="hidden items-center gap-1 text-sm md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-3 py-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Search */}
        <div ref={searchWrapRef} className="relative ml-auto hidden md:block">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 focus-within:border-white/30">
            <Search className="h-4 w-4 text-white/60" />
            <input
              type="search"
              aria-label="Search site"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setShowResults(true); setActiveIdx(0); }}
              onFocus={() => setShowResults(true)}
              onKeyDown={onKeyDown}
              placeholder="Search…"
              className="w-36 bg-transparent text-sm text-white placeholder:text-white/40 outline-none lg:w-48"
            />
          </div>
          <AnimatePresence>
            {showResults && results.length > 0 && (
              <motion.ul
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="absolute right-0 mt-2 w-72 overflow-hidden rounded-2xl border border-white/10 bg-black/90 p-1 backdrop-blur-xl shadow-lift"
              >
                {results.map((r, i) => (
                  <li key={r.href + r.label}>
                    <button
                      type="button"
                      onMouseEnter={() => setActiveIdx(i)}
                      onClick={() => go(r.href)}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                        i === activeIdx ? "bg-white/10 text-white" : "text-white/80 hover:bg-white/5"
                      }`}
                    >
                      <span>{r.label}</span>
                      <ArrowUpRight className="h-4 w-4 opacity-60" />
                    </button>
                  </li>
                ))}
              </motion.ul>
            )}
            {showResults && query.trim() && results.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="absolute right-0 mt-2 w-72 rounded-2xl border border-white/10 bg-black/90 p-4 text-sm text-white/60 backdrop-blur-xl"
              >
                No matches found
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <a
          href="#contact"
          className="hidden items-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-transform hover:scale-105 md:inline-flex"
        >
          Let's Talk <ArrowUpRight className="h-4 w-4" />
        </a>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          className="ml-auto grid h-10 w-10 place-items-center rounded-full bg-white text-black md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      {open ? (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-20 left-4 right-4 rounded-3xl border border-white/10 bg-black/90 p-4 backdrop-blur-xl md:hidden"
        >
          <div className="mb-3 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
            <Search className="h-4 w-4 text-white/60" />
            <input
              type="search"
              aria-label="Search site"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setShowResults(true); setActiveIdx(0); }}
              onKeyDown={onKeyDown}
              placeholder="Search…"
              className="flex-1 bg-transparent text-sm text-white placeholder:text-white/40 outline-none"
            />
          </div>
          {query.trim() && (
            <ul className="mb-2 flex flex-col gap-1">
              {results.length === 0 ? (
                <li className="px-3 py-2 text-sm text-white/50">No matches found</li>
              ) : results.map((r) => (
                <li key={r.href + r.label}>
                  <button
                    type="button"
                    onClick={() => go(r.href)}
                    className="flex w-full items-center justify-between rounded-2xl bg-white/5 px-4 py-3 text-left text-sm hover:bg-white/10"
                  >
                    <span>{r.label}</span>
                    <ArrowUpRight className="h-4 w-4 opacity-60" />
                  </button>
                </li>
              ))}
            </ul>
          )}
          <ul className="flex flex-col gap-1 text-base">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  onClick={() => setOpen(false)}
                  href={l.href}
                  className="block rounded-2xl px-4 py-3 hover:bg-white/10"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                onClick={() => setOpen(false)}
                href="#contact"
                className="mt-2 flex items-center justify-between rounded-2xl bg-white px-4 py-3 font-medium text-black"
              >
                Let's Talk <ArrowUpRight className="h-4 w-4" />
              </a>
            </li>
          </ul>
        </motion.div>
      ) : null}
    </motion.header>
  );
}
