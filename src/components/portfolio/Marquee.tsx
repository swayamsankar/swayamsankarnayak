import { motion } from "motion/react";

const words = [
  "Branding",
  "Web Design",
  "Development",
  "UI / UX",
  "Motion",
  "Strategy",
];

export function Marquee() {
  return (
    <section
      aria-hidden="true"
      className="relative overflow-hidden border-y border-white/10 bg-ember py-6 text-ember-foreground"
    >
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap"
      >
        {[...words, ...words, ...words, ...words].map((w, i) => (
          <span
            key={i}
            className="text-display mx-8 flex items-center gap-8"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            {w}
            <span className="text-2xl">✦</span>
          </span>
        ))}
      </motion.div>
    </section>
  );
}
