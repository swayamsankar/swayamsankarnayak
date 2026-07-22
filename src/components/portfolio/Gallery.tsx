import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryCategories, galleryItems } from "@/data/portfolio";
import { SectionHeading } from "./SectionHeading";

export function Gallery() {
  const [cat, setCat] = useState<string>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const items = galleryItems.filter((g) => cat === "All" || g.category === cat);

  const next = () => setLightbox((i) => (i === null ? null : (i + 1) % items.length));
  const prev = () => setLightbox((i) => (i === null ? null : (i - 1 + items.length) % items.length));

  return (
    <section id="gallery" className="relative border-t border-white/5 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <SectionHeading number="05" eyebrow="Gallery of work" title="A little bit of everything." />

        <div className="mt-10 flex flex-wrap gap-2">
          {galleryCategories.map((c) => (
            <button
              type="button"
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
                cat === c
                  ? "border-ember bg-ember text-ember-foreground"
                  : "border-white/15 text-muted-foreground hover:border-white/40 hover:text-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {items.map((g, i) => {
            const aspect =
              g.orientation === "landscape"
                ? "aspect-[4/3]"
                : g.orientation === "square"
                ? "aspect-square"
                : "aspect-[3/4]";
            return (
              <motion.button
                type="button"
                key={`${g.title}-${i}`}
                onClick={() => setLightbox(i)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
                className="group relative block w-full overflow-hidden rounded-2xl border border-white/10 bg-card break-inside-avoid text-left"
              >
                <img
                  src={g.image}
                  alt={g.title}
                  loading="lazy"
                  className={`w-full ${aspect} object-cover transition-transform duration-700 group-hover:scale-105`}
                />
                <div className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-xs tracking-widest text-ember uppercase">{g.category}</p>
                  <p className="font-display text-lg font-semibold text-white">{g.title}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {lightbox !== null && items[lightbox] ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 backdrop-blur"
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/5 text-white hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Previous"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-4 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/5 text-white hover:bg-white/10 sm:left-8"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <motion.img
              key={lightbox}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              src={items[lightbox].image}
              alt={items[lightbox].title}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] max-w-full rounded-xl object-contain"
            />
            <button
              type="button"
              aria-label="Next"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-4 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/5 text-white hover:bg-white/10 sm:right-8"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
