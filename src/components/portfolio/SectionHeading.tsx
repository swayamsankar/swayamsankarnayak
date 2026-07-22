import { motion } from "motion/react";

export function SectionHeading({
  number,
  eyebrow,
  title,
  align = "left",
}: {
  number: string;
  eyebrow?: string;
  title: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`flex flex-col gap-3 ${align === "center" ? "items-center text-center" : "items-start"}`}
    >
      <div className="flex items-center gap-3 text-xs font-medium tracking-[0.25em] text-muted-foreground">
        <span className="font-mono">( {number} )</span>
        {eyebrow ? <span>— {eyebrow.toUpperCase()}</span> : null}
      </div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-display text-white"
        style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
      >
        {title}
      </motion.h2>
    </div>
  );
}
