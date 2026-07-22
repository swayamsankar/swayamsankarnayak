import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useIsMobile } from "@/hooks/use-mobile";

import { SectionHeading } from "./SectionHeading";
import { PerspectiveCarousel, type PerspectiveCarouselItem } from "@/components/ui/perspective-carousel";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
const motionReels: PerspectiveCarouselItem[] = [
  { src: "/assets/ani_1.mp4", title: "Instagram Reel — Motion", kind: "video", orientation: "portrait" },
  { src: "/assets/ani_2.mp4", title: "Financials — Motion", kind: "video", orientation: "portrait" },
  { src: "/assets/ani_3.mp4", title: "Ads — Motion", kind: "video", orientation: "portrait" },
  { src: "/assets/ani_4.mp4", title: "Notepad", kind: "video", orientation: "portrait" },
  { src: "/assets/ani_5.mp4", title: "Car Crash Story", kind: "video", orientation: "portrait" },
];


const cinematicReels: PerspectiveCarouselItem[] = [
  { src: "/assets/vid_3.mp4", title: "Cinematic — Reel 03", kind: "video", orientation: "landscape" },
  { src: "/assets/cinematic-portrait.mp4", title: "Portrait Story — Founder", kind: "video", orientation: "portrait" },
  { src: "/assets/prabhlens-2025.mp4", title: "PrabhLens 2025 — Showcase", kind: "video", orientation: "portrait" },
  { src: "/assets/vid_4.mp4", title: "Cinematic — Reel 04", kind: "video", orientation: "landscape" },
  { src: "/assets/jai-jagannath.mp4", title: "Jai Jagannath — Devotional", kind: "video", orientation: "landscape" },
  { src: "/assets/vid_5.mp4", title: "Cinematic — Reel 05", kind: "video", orientation: "landscape" },
];

type Tab = "motion" | "cinematic";

export function VideoShowreel() {
  const [tab, setTab] = useState<Tab>("motion");
  const isMobile = useIsMobile();

  const tabs: { id: Tab; label: string; hint: string; aspect: "portrait" | "landscape" }[] = [
    { id: "motion", label: "Motion", hint: "Vertical / portrait", aspect: "portrait" },
    { id: "cinematic", label: "Cinematic", hint: "Storytelling · portrait & landscape", aspect: "landscape" },
  ];

  const items = tab === "motion" ? motionReels : cinematicReels;
  const aspect = tab === "motion" ? "portrait" : "landscape";
  const slideWidth = tab === "motion" ? (isMobile ? 180 : 260) : (isMobile ? 220 : 440);
  const carouselHeight = tab === "cinematic" && isMobile ? "h-[560px]" : "h-[440px] sm:h-[620px]";


  return (
    <section id="showreel" className="relative border-t border-white/5 py-16 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading number="04" eyebrow="Showreel" title="Motion." />

          <div
            role="tablist"
            aria-label="Showreel category"
            className="flex w-full gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1 sm:inline-flex sm:w-auto"
          >
            {tabs.map((t) => {
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTab(t.id)}
                  className={`relative flex-1 rounded-full px-4 py-2 text-left transition-colors sm:flex-none sm:px-5 ${
                    active ? "text-ember-foreground" : "text-cream/70 hover:text-white"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="reel-tab-pill"
                      transition={{ type: "spring", damping: 24, stiffness: 260 }}
                      className="absolute inset-0 -z-0 rounded-full bg-ember"
                    />
                  )}
                  <span className="relative z-10 block text-sm font-semibold uppercase tracking-widest">
                    {t.label}
                  </span>
                  <span className="relative z-10 block text-[10px] font-medium tracking-[0.25em] opacity-80">
                    {t.hint}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14"
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] px-2 py-10 sm:px-10 sm:py-20">
              <PerspectiveCarousel
                items={items}
                defaultActiveIndex={Math.floor(items.length / 2)}
                slideWidth={slideWidth}
                aspect={aspect}
                loop
                className={carouselHeight}
              />
            </div>

          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
