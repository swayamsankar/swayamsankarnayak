import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { DiagonalCarousel, type DiagonalCarouselItem } from "@/components/ui/diagonal-carousel";
const certificates: DiagonalCarouselItem[] = [
  { src: "/assets/google-ux-certificate.jpg", title: "Google UX Design" },
  { src: "/assets/Adobe_Indesign.jpg", title: "InDesign 2025 Essential Training" },
  { src: "/assets/anthropic-certificate.jpg", title: "Anthropic — AI Fluency: Framework & Foundations" },
  { src: "/assets/oracle-certificate.jpg", title: "Oracle Cloud Infrastructure 2025 AI Foundations Associate" },
  { src: "/assets/aws-genai-certificate.jpg", title: "AWS — Introduction to Generative AI" },
];

export function Certificates() {
  const [active, setActive] = useState(Math.floor(certificates.length / 2));
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section
      id="certificates"
      className="relative border-t border-white/5 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <SectionHeading number="09" eyebrow="Credentials" title="Certificates." />
        <p className="mt-6 max-w-xl text-sm text-cream/60">
          A selection of programs and courses that shape the way I design and build. Click a certificate to view it in full.
        </p>

        <div className="mt-14 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] px-4 py-16 sm:px-10">
          <DiagonalCarousel
            items={certificates}
            activeIndex={active}
            onActiveIndexChange={setActive}
            onActiveSlideClick={(i) => setLightbox(i)}
            loop
            slideSize={280}
            rotationStep={10}
            verticalStep={50}
          />
        </div>
      </div>

      <AnimatePresence>
        {lightbox !== null && certificates[lightbox] ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 backdrop-blur"
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              aria-label="Close certificate"
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/5 text-white hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-[90vh] max-w-5xl flex-col items-center gap-4"
            >
              <img
                src={certificates[lightbox].src}
                alt={certificates[lightbox].title}
                className="max-h-[80vh] max-w-full rounded-xl object-contain"
              />
              <p className="text-center text-sm font-semibold uppercase tracking-[0.25em] text-cream/80">
                {certificates[lightbox].title}
              </p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
