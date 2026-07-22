import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/data/portfolio";
import { SectionHeading } from "./SectionHeading";
import { RatingStars } from "./RatingStars";
import { useCountUp } from "@/hooks/use-count-up";
import { useInView } from "@/hooks/use-in-view";

export function Testimonials() {
  const [i, setI] = useState(0);
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4 });
  const avg = useCountUp(4.5, 1400, inView);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, []);

  const t = testimonials[i];

  return (
    <section id="testimonials" className="relative border-t border-white/5 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <SectionHeading number="06" eyebrow="Feedback" title="What clients say." />

        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1fr)_1.4fr]">
          <div ref={ref} className="rounded-3xl border border-white/10 bg-white/[0.02] p-8">
            <div className="text-display text-white" style={{ fontSize: "clamp(3rem, 7vw, 5rem)" }}>
              {avg.toFixed(1)}
              <span className="text-ember">/5</span>
            </div>
            <RatingStars rating={5} size={22} />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Honest feedback from people I've worked with on real projects.
            </p>
          </div>

          <div className="flex flex-col justify-between rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-8 sm:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
              >
                <RatingStars rating={t.rating} size={20} />
                <blockquote className="mt-6 font-display text-2xl leading-snug text-white sm:text-3xl">
                  "{t.quote}"
                </blockquote>
                <div className="mt-8 flex items-center gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-ember font-display font-bold text-ember-foreground">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex items-center justify-between">
              <div className="flex gap-1.5">
                {testimonials.map((_, idx) => (
                  <button
                    type="button"
                    key={idx}
                    aria-label={`Testimonial ${idx + 1}`}
                    onClick={() => setI(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === i ? "w-8 bg-ember" : "w-1.5 bg-white/30"
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="Previous testimonial"
                  onClick={() => setI((v) => (v - 1 + testimonials.length) % testimonials.length)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/20 hover:border-white/40"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Next testimonial"
                  onClick={() => setI((v) => (v + 1) % testimonials.length)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/20 hover:border-white/40"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
