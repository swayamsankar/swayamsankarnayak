import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import { webProjects } from "@/data/portfolio";
import { SectionHeading } from "./SectionHeading";

const rotations = [-6, 4, -3, 5, -4, 3];

export function WebsiteShowcase() {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [progress, setProgress] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const update = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const p = max > 0 ? el.scrollLeft / max : 0;
    setProgress(p);
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < max - 4);
    // approximate active card index
    const cardWidth = el.scrollWidth / webProjects.length;
    setActiveIndex(Math.round(el.scrollLeft / cardWidth));
  }, []);

  useEffect(() => {
    update();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scrollByDir = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const step = el.clientWidth * 0.85;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const scrollToIndex = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const child = el.children[i] as HTMLElement | undefined;
    if (child) child.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  return (
    <section id="work" className="relative border-t border-white/5 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="flex items-end justify-between gap-6">
          <SectionHeading number="03" eyebrow="Website design" title="Live sites." />
          <div className="hidden shrink-0 items-center gap-2 sm:flex">
            <button
              type="button"
              aria-label="Previous project"
              onClick={() => scrollByDir(-1)}
              disabled={!canPrev}
              className="grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/[0.03] text-white transition-colors hover:border-ember hover:bg-ember hover:text-ember-foreground disabled:opacity-30 disabled:hover:border-white/15 disabled:hover:bg-white/[0.03] disabled:hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next project"
              onClick={() => scrollByDir(1)}
              disabled={!canNext}
              className="grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/[0.03] text-white transition-colors hover:border-ember hover:bg-ember hover:text-ember-foreground disabled:opacity-30 disabled:hover:border-white/15 disabled:hover:bg-white/[0.03] disabled:hover:text-white"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="relative mt-16">
        <ul
          ref={scrollerRef}
          className="flex snap-x snap-mandatory gap-8 overflow-x-auto scroll-smooth px-6 pb-6 sm:gap-14 sm:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {webProjects.map((p, i) => (
            <motion.li
              key={`${p.title}-${i}`}
              initial={{ opacity: 0, y: 60, rotate: rotations[i % rotations.length] }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ rotate: 0, scale: 1.02 }}
              style={{ rotate: `${rotations[i % rotations.length]}deg` }}
              className="snap-center shrink-0"
            >
              <a href={p.url} className="group block w-[85vw] max-w-[720px]">
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-card shadow-lift">
                  <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.03] px-4 py-3">
                    <span className="h-3 w-3 rounded-full bg-red-400/60" />
                    <span className="h-3 w-3 rounded-full bg-yellow-400/60" />
                    <span className="h-3 w-3 rounded-full bg-green-400/60" />
                    <span className="ml-3 truncate font-mono text-xs text-muted-foreground">
                      swayam.studio/{p.title.toLowerCase().split(" ")[0]}
                    </span>
                  </div>
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    width={1200}
                    height={800}
                    className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mt-5 flex items-center justify-between px-1">
                  <div>
                    <p className="text-xs tracking-widest text-muted-foreground uppercase">
                      {p.category}
                    </p>
                    <h3 className="font-display text-xl font-semibold text-white">{p.title}</h3>
                  </div>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/20 transition-colors group-hover:border-ember group-hover:bg-ember group-hover:text-ember-foreground">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </a>
            </motion.li>
          ))}
        </ul>

        <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-16 bg-gradient-to-r from-background to-transparent sm:block" />
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-16 bg-gradient-to-l from-background to-transparent sm:block" />
      </div>

      <div className="mx-auto mt-8 flex max-w-7xl items-center gap-6 px-6 sm:px-10">
        <div className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-white/10">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-ember transition-[width] duration-200"
            style={{ width: `${Math.max(8, progress * 100)}%` }}
          />
        </div>
        <div className="flex items-center gap-2">
          {webProjects.map((_, i) => (
            <button
              type="button"
              key={i}
              aria-label={`Go to project ${i + 1}`}
              onClick={() => scrollToIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === activeIndex ? "w-6 bg-ember" : "w-2 bg-white/25 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
        <span className="font-mono text-xs text-muted-foreground tabular-nums">
          {String(Math.min(activeIndex + 1, webProjects.length)).padStart(2, "0")} /{" "}
          {String(webProjects.length).padStart(2, "0")}
        </span>
      </div>

      <div className="mt-6 flex justify-center gap-2 sm:hidden">
        <button
          type="button"
          aria-label="Previous project"
          onClick={() => scrollByDir(-1)}
          disabled={!canPrev}
          className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/[0.03] text-white disabled:opacity-30"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="Next project"
          onClick={() => scrollByDir(1)}
          disabled={!canNext}
          className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/[0.03] text-white disabled:opacity-30"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
