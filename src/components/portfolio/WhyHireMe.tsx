import { Bolt, Code2, MessageCircle, Sparkles } from "lucide-react";
import { lazy, Suspense, useEffect, useState } from "react";
import { useCountUp } from "@/hooks/use-count-up";
import { useInView } from "@/hooks/use-in-view";
import { SectionHeading } from "./SectionHeading";
const Lanyard = lazy(() => import("@/components/reactbits/Lanyard"));

const stats = [
  { value: 20, suffix: "+", label: "Projects" },
  { value: 3, suffix: "+", label: "Years experience" },
  { value: 300, suffix: "+", label: "Github commits" },
  { value: 4.5, suffix: "★", label: "Average rating", decimals: 1 },
];

const perks = [
  { icon: Bolt, title: "Fast turnaround", copy: "Weeks, not quarters." },
  { icon: Sparkles, title: "Pixel-perfect", copy: "Design + engineering in one head." },
  { icon: Code2, title: "Clean code", copy: "Typed, tested, maintainable." },
  { icon: MessageCircle, title: "Clear comms", copy: "Async-friendly. No surprises." },
];

function Stat({ v, suffix, label, decimals }: { v: number; suffix: string; label: string; decimals?: number }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4 });
  const val = useCountUp(v, 1600, inView);
  return (
    <div ref={ref} className="w-full min-w-0 border-t border-white/10 py-4 sm:py-6">
      <div className="grid w-full min-w-0 grid-cols-[minmax(0,1fr)_auto] items-end gap-3 sm:block">
        <div
          className="text-display flex min-w-0 items-baseline text-white"
          style={{ lineHeight: 1, letterSpacing: 0, fontSize: "clamp(2rem, 10vw, 2.75rem)" }}
        >
          <span className="min-w-0 truncate">{decimals ? val.toFixed(decimals) : Math.round(val)}</span>
          <span className="shrink-0 text-ember">{suffix}</span>
        </div>
        <p className="max-w-[9rem] text-right text-xs leading-tight text-muted-foreground sm:mt-2 sm:max-w-none sm:text-left sm:text-sm">
          {label}
        </p>
      </div>
    </div>
  );
}

export function WhyHireMe() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section id="why" className="relative border-t border-white/5 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 sm:px-10 lg:grid-cols-2">
        <div className="min-w-0">
          <SectionHeading number="02" eyebrow="Why hire me" title="Craft, shipped." />
          <p className="mt-6 max-w-md text-lg text-muted-foreground">
            I work at the seam between design and engineering — where good ideas
            usually die. My job is to make sure yours doesn't.
          </p>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {perks.map((p) => (
              <div
                key={p.title}
                className="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-all hover:border-ember/40 hover:bg-ember/5"
              >
                <p.icon className="h-5 w-5 text-ember" />
                <h3 className="mt-4 font-display text-lg font-semibold text-white">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.copy}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex w-full min-w-0 flex-col sm:grid sm:grid-cols-2 sm:gap-x-6">
            {stats.map((s) => (
              <Stat key={s.label} v={s.value} suffix={s.suffix} label={s.label} decimals={s.decimals} />
            ))}
          </div>
        </div>
        <div className="relative lg:sticky lg:top-24 lg:self-start h-[70vh] min-h-[480px] lg:h-[calc(100vh-8rem)] lg:max-h-[780px]">
          {mounted ? (
            <Suspense fallback={null}>
              <Lanyard
                position={[0, 0, 18]}
                gravity={[0, -40, 0]}
                fov={20}
                frontImage={"/assets/profile-portrait.png"}
                backImage={"/assets/profile-portrait.png"}
                imageFit="cover"
              />
            </Suspense>
          ) : null}
        </div>
      </div>
    </section>
  );
}
