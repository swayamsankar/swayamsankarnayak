import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import BlurText from "@/components/reactbits/BlurText";
import RotatingText from "@/components/reactbits/RotatingText";
import OptionWheel from "@/components/reactbits/OptionWheel";

import heroPortrait from "@/assets/hero-portrait.jpg";
import { services } from "@/data/portfolio";

// Play the uploaded gear click sound on each wheel step.
let _gearAudio: HTMLAudioElement | null = null;
function playGear() {
  if (typeof window === "undefined") return;
  try {
    if (!_gearAudio) {
      _gearAudio = new Audio("/assets/gear-click.mp3");
      _gearAudio.preload = "auto";
      _gearAudio.volume = 0.7;
    }
    _gearAudio.currentTime = 0;
    void _gearAudio.play().catch(() => {});
  } catch {
    /* ignore */
  }
}

export function Hero() {
  return (
    <section id="home" className="relative isolate min-h-dvh overflow-hidden grain">
      {/* Background portrait */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroPortrait}
          alt=""
          aria-hidden="true"
          width={1400}
          height={1600}
          className="h-full w-full object-cover object-top opacity-95"
        />
        <div className="absolute inset-0 ember-radial mix-blend-multiply opacity-95" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      </div>





      {/* Content */}
      <div className="relative flex min-h-dvh flex-col justify-between px-4 pt-28 pb-6 sm:px-8 sm:pt-32 lg:px-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="max-w-sm min-w-0"
          >

            <BlurText
              text="I'm a Digital Multimedia Designer crafting immersive digital experiences that inspire, engage, and leave a lasting impression."
              delay={40}
              animateBy="words"
              direction="top"
              className="text-base font-medium text-cream sm:text-lg md:text-xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="w-full h-[240px] sm:min-w-[320px] lg:min-w-[400px] xl:min-w-[460px] sm:h-[340px] lg:h-[400px]"
          >
            <OptionWheel
              items={services.map((s) => `( ${s.number} )  ${s.title}`)}
              defaultSelected={0}
              textColor="rgba(255,240,220,0.55)"
              activeColor="#ffffff"
              side="right"
              fontSize={1.35}
              spacing={1.5}
              curve={1}
              tilt={8}
              blur={1.5}
              fade={0.22}
              smoothing={220}
              inset={20}
              loop
              onChange={playGear}
            />
          </motion.div>

        </div>

        <div className="mt-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mb-4 flex flex-wrap items-center gap-2 text-[10px] font-medium tracking-[0.25em] text-cream/90 sm:mb-6 sm:gap-3 sm:text-xs sm:tracking-[0.3em]"
          >
            <span>FUTURE</span>
            <RotatingText
              texts={["DIGITAL", "VISUAL", "IMMERSIVE", "MODERN", "MOTION", "CREATIVE", "BOLD", "INTERACTIVE"]}
              mainClassName="px-2 py-0.5 bg-white text-black rounded-md overflow-hidden"
              staggerFrom="last"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.02}
              splitLevelClassName="overflow-hidden"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2200}
            />
            <span>DESIGNER</span>
          </motion.div>

          <BlurText
            as="h1"
            text="SWAYAM® — Digital Multimedia Designer"
            animateBy="letters"
            direction="bottom"
            delay={90}
            stepDuration={0.5}
            wrap={false}
            className="text-display text-white leading-[0.85]"
            style={{ fontSize: "clamp(3.25rem, 20vw, 22rem)" }}
          />


          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-105"
            >
              Let's Talk <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
            >
              View Work
            </a>
            <a
              href="#services"
              className="ml-auto inline-flex items-center gap-2 text-xs tracking-widest text-cream/80 hover:text-white"
            >
              SCROLL <ArrowDown className="h-4 w-4 animate-bounce" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
