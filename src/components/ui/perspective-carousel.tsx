import * as React from "react";
import { motion, AnimatePresence, type Transition } from "motion/react";
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PerspectiveCarouselItem {
  src: string;
  title: string;
  alt?: string;
  poster?: string;
  kind?: "image" | "video";
  orientation?: "portrait" | "landscape";
}

export interface PerspectiveCarouselProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  items: PerspectiveCarouselItem[];
  activeIndex?: number;
  defaultActiveIndex?: number;
  onActiveIndexChange?: (index: number) => void;
  loop?: boolean;
  slideWidth?: number;
  slideHeight?: number;
  rotationStep?: number;
  inactiveScale?: number;
  transition?: Transition;
  showControls?: boolean;
  showDots?: boolean;
  viewportClassName?: string;
  slideClassName?: string;
  imageClassName?: string;
  labelClassName?: string;
  controlsClassName?: string;
  aspect?: "portrait" | "landscape" | "square";
}

const DEFAULT_TRANSITION: Transition = {
  type: "spring",
  bounce: 0.14,
  duration: 0.9,
};

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

export function PerspectiveCarousel({
  items,
  activeIndex,
  defaultActiveIndex = 0,
  onActiveIndexChange,
  loop = false,
  slideWidth = 240,
  slideHeight,
  rotationStep = 55,
  inactiveScale = 0.82,
  transition = DEFAULT_TRANSITION,
  showControls = true,
  showDots = true,
  viewportClassName,
  slideClassName,
  imageClassName,
  labelClassName,
  controlsClassName,
  className,
  onKeyDown,
  tabIndex = 0,
  aspect = "portrait",
  ...props
}: PerspectiveCarouselProps) {
  const maxIndex = Math.max(0, items.length - 1);
  const [uncontrolled, setUncontrolled] = React.useState(() =>
    clamp(defaultActiveIndex, 0, maxIndex),
  );
  const current = clamp(activeIndex ?? uncontrolled, 0, maxIndex);
  const baseW = Math.max(96, slideWidth);

  const getRatio = (orientation?: "portrait" | "landscape") => {
    const mode = orientation ?? aspect;
    // 9:16 portrait => width/height = 9/16
    // 16:9 landscape => width/height = 16/9
    if (mode === "portrait") return 9 / 16;
    if (mode === "square") return 1;
    return 16 / 9;
  };

  const getDimensions = (orientation?: "portrait" | "landscape") => {
    const ratio = getRatio(orientation);
    const isPortrait = (orientation ?? aspect) === "portrait";
    const w = isPortrait ? Math.round(baseW * 0.75) : baseW;
    const h = slideHeight ?? Math.round(w / ratio);
    return { w, h };
  };

  const activeItem = items[current];
  const { w, h } = getDimensions(activeItem.orientation);
  const inactive = clamp(inactiveScale, 0.5, 1);

  const select = React.useCallback(
    (next: number) => {
      if (!items.length) return;
      const idx = loop
        ? (next + items.length) % items.length
        : clamp(next, 0, maxIndex);
      if (activeIndex === undefined) setUncontrolled(idx);
      onActiveIndexChange?.(idx);
    },
    [activeIndex, items.length, loop, maxIndex, onActiveIndexChange],
  );

  if (!items.length) return null;

  const prevDisabled = !loop && current === 0;
  const nextDisabled = !loop && current === maxIndex;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      select(current - 1);
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      select(current + 1);
    }
  };

  const active = items[current];

  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = React.useState(true);
  const [playing, setPlaying] = React.useState(true);

  // Reset when active item changes
  React.useEffect(() => {
    setPlaying(true);
  }, [current]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    const next = !muted;
    setMuted(next);
    if (v) v.muted = next;
  };

  const isActiveVideo = active?.kind === "video";

  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const lightboxVideoRef = React.useRef<HTMLVideoElement | null>(null);
  const [lightboxMuted, setLightboxMuted] = React.useState(false);
  const [lightboxPlaying, setLightboxPlaying] = React.useState(true);

  React.useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [lightboxOpen]);

  const openLightbox = () => {
    setLightboxPlaying(true);
    setLightboxMuted(false);
    setLightboxOpen(true);
  };

  const toggleLightboxPlay = () => {
    const v = lightboxVideoRef.current;
    if (!v) return;
    if (v.paused) v.play().then(() => setLightboxPlaying(true)).catch(() => {});
    else { v.pause(); setLightboxPlaying(false); }
  };
  const toggleLightboxMute = () => {
    const v = lightboxVideoRef.current;
    const next = !lightboxMuted;
    setLightboxMuted(next);
    if (v) v.muted = next;
  };

  return (
    <div
      {...props}
      role="region"
      aria-roledescription="carousel"
      tabIndex={tabIndex}
      onKeyDown={handleKeyDown}
      className={cn(
        "relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-3xl",
        className,
      )}
    >
      <div
        className={cn(
          "relative flex flex-1 w-full items-center justify-center",
          viewportClassName,
        )}
        style={{ perspective: 1400 }}
      >
        <div
          className="relative flex items-center justify-center"
          style={{ transformStyle: "preserve-3d", width: w, height: h }}
        >
          {items.map((item, i) => {
            const offset = i - current;
            const abs = Math.abs(offset);
            const isActive = offset === 0;
            const dims = getDimensions(item.orientation);
            const x = offset * (w * 1.05);
            const rotateY = -offset * rotationStep;
            const scale = isActive ? 1 : Math.max(inactive - (abs - 1) * 0.08, 0.4);
            const z = -abs * 120;
            const opacity = abs > 3 ? 0 : 1 - abs * 0.15;

            return (
              <motion.button
                key={`${item.src}-${i}`}
                type="button"
                aria-label={item.title}
                aria-current={isActive ? "true" : undefined}
                onClick={() => (isActive ? openLightbox() : select(i))}
                initial={false}
                animate={{ x, rotateY, scale, z, opacity, width: dims.w, height: dims.h }}
                transition={transition}
                style={{
                  transformStyle: "preserve-3d",
                  pointerEvents: opacity < 0.2 ? "none" : "auto",
                }}
                className={cn(
                  "absolute overflow-hidden rounded-2xl border border-white/10 bg-black shadow-lift",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember",
                  slideClassName,
                )}
              >
                {item.kind === "video" ? (
                  isActive ? (
                    <video
                      ref={videoRef}
                      key={item.src}
                      src={item.src}
                      poster={item.poster}
                      autoPlay
                      muted={muted}
                      loop
                      playsInline
                      onPlay={() => setPlaying(true)}
                      onPause={() => setPlaying(false)}
                      className={cn("h-full w-full object-cover", imageClassName)}
                    />
                  ) : item.poster ? (
                    <img
                      src={item.poster}
                      alt={item.alt ?? item.title}
                      loading="lazy"
                      className={cn("h-full w-full object-cover", imageClassName)}
                    />
                  ) : (
                    <div className={cn("h-full w-full bg-black", imageClassName)} aria-hidden="true" />
                  )
                ) : (
                  <img
                    src={item.poster ?? item.src}
                    alt={item.alt ?? item.title}
                    loading="lazy"
                    className={cn("h-full w-full object-cover", imageClassName)}
                  />
                )}
                {!isActive && (
                  <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center gap-4">
        <motion.p
          key={active.title}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={cn(
            "font-mono text-xs uppercase tracking-[0.3em] text-cream/80",
            labelClassName,
          )}
        >
          {active.title}
        </motion.p>

        {isActiveVideo && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label={playing ? "Pause" : "Play"}
              onClick={togglePlay}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/[0.03] text-white transition-colors hover:border-ember hover:bg-ember hover:text-ember-foreground"
            >
              {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            </button>
            <button
              type="button"
              aria-label={muted ? "Unmute" : "Mute"}
              onClick={toggleMute}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/[0.03] text-white transition-colors hover:border-ember hover:bg-ember hover:text-ember-foreground"
            >
              {muted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
            </button>
          </div>
        )}


        {showControls && (
          <div
            className={cn(
              "flex items-center gap-4",
              controlsClassName,
            )}
          >
            <button
              type="button"
              aria-label="Previous"
              disabled={prevDisabled}
              onClick={() => select(current - 1)}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/[0.03] text-white transition-colors hover:border-ember hover:bg-ember hover:text-ember-foreground disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {showDots && (
              <div className="flex items-center gap-2">
                {items.map((it, i) => (
                  <button
                    key={`${it.src}-dot-${i}`}
                    type="button"
                    aria-label={`Go to ${it.title}`}
                    onClick={() => select(i)}
                    className={cn(
                      "h-2 rounded-full transition-all",
                      i === current ? "w-6 bg-ember" : "w-2 bg-white/25 hover:bg-white/50",
                    )}
                  />
                ))}
              </div>
            )}

            <button
              type="button"
              aria-label="Next"
              disabled={nextDisabled}
              onClick={() => select(current + 1)}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/[0.03] text-white transition-colors hover:border-ember hover:bg-ember hover:text-ember-foreground disabled:opacity-30"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {lightboxOpen && active && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-sm"
            onClick={() => setLightboxOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
          >
            <motion.div
              layoutId={`carousel-slide-${current}`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 24, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
              className={cn(
                "relative overflow-hidden rounded-2xl border border-white/10 bg-black shadow-lift",
                active.orientation === "portrait"
                  ? "h-[min(90vh,900px)] w-auto aspect-[9/16]"
                  : "w-[min(95vw,1400px)] aspect-video",
              )}
            >
              {active.kind === "video" ? (
                <video
                  ref={lightboxVideoRef}
                  key={active.src}
                  src={active.src}
                  poster={active.poster}
                  autoPlay
                  muted={lightboxMuted}
                  loop
                  playsInline
                  controls={false}
                  onPlay={() => setLightboxPlaying(true)}
                  onPause={() => setLightboxPlaying(false)}
                  className="h-full w-full object-contain bg-black"
                />
              ) : (
                <img
                  src={active.poster ?? active.src}
                  alt={active.alt ?? active.title}
                  className="h-full w-full object-contain bg-black"
                />
              )}

              {active.kind === "video" && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                  <button
                    type="button"
                    aria-label={lightboxPlaying ? "Pause" : "Play"}
                    onClick={toggleLightboxPlay}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-black/60 text-white transition-colors hover:border-ember hover:bg-ember hover:text-ember-foreground"
                  >
                    {lightboxPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </button>
                  <button
                    type="button"
                    aria-label={lightboxMuted ? "Unmute" : "Mute"}
                    onClick={toggleLightboxMute}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-black/60 text-white transition-colors hover:border-ember hover:bg-ember hover:text-ember-foreground"
                  >
                    {lightboxMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </button>
                </div>
              )}
            </motion.div>

            <button
              type="button"
              aria-label="Close"
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-black/60 text-white transition-colors hover:border-ember hover:bg-ember hover:text-ember-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default PerspectiveCarousel;
