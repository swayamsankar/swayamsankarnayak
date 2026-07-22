import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Github } from "lucide-react";
import { techProjects } from "@/data/portfolio";
import { SectionHeading } from "./SectionHeading";

export function TechnicalWork() {
  const stacks = useMemo(() => {
    const s = new Set<string>();
    techProjects.forEach((p) => p.stack.forEach((t) => s.add(t)));
    return ["All", ...Array.from(s)];
  }, []);
  const [filter, setFilter] = useState<string>("All");

  const filtered = techProjects.filter((p) => filter === "All" || p.stack.includes(filter));

  return (
    <section id="projects" className="relative border-t border-white/5 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <SectionHeading number="04" eyebrow="Technical work" title="Under the hood." />

        <div className="mt-10 flex flex-wrap gap-2">
          {stacks.map((s) => (
            <button
              type="button"
              key={s}
              onClick={() => setFilter(s)}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
                filter === s
                  ? "border-ember bg-ember text-ember-foreground"
                  : "border-white/15 text-muted-foreground hover:border-white/40 hover:text-white"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {filtered.map((p, i) => (
            <motion.li
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-8 transition-all hover:-translate-y-1 hover:border-ember/40 hover:bg-ember/[0.03]"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-2xl font-semibold text-white">{p.title}</h3>
                <div className="flex shrink-0 gap-2">
                  <a
                    href={p.repo}
                    aria-label={`${p.title} repository`}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/15 hover:border-white/40"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                  <a
                    href={p.live}
                    aria-label={`${p.title} live demo`}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/15 hover:border-ember hover:bg-ember hover:text-ember-foreground"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{p.description}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {p.stack.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[11px] tracking-wide text-muted-foreground"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
