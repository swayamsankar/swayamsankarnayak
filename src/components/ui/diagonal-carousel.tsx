"use client";

import * as React from "react";
import { motion, type Transition } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DiagonalCarouselItem {
  src: string;
  title: string;
  alt?: string;
}

export interface DiagonalCarouselProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  items: DiagonalCarouselItem[];
  activeIndex?: number;
  defaultActiveIndex?: number;
  onActiveIndexChange?: (index: number) => void;
  onActiveSlideClick?: (index: number) => void;
  loop?: boolean;
  slideSize?: number;
  rotationStep?: number;
  verticalStep?: number;
  inactiveScale?: number;
  transition?: Transition;
  showControls?: boolean;
  showDots?: boolean;
  viewportClassName?: string;
  slideClassName?: string;
  imageClassName?: string;
  labelClassName?: string;
  controlsClassName?: string;
}

const DEFAULT_TRANSITION: Transition = {
  type: "spring",
  bounce: 0.16,
  duration: 0.85,
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export function DiagonalCarousel({
  items,
  activeIndex,
  defaultActiveIndex = 0,
  onActiveIndexChange,
  onActiveSlideClick,
  loop = false,
  slideSize = 260,
  rotationStep = 12,
  verticalStep = 60,
  inactiveScale = 0.75,
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
  ...props
}: DiagonalCarouselProps) {
  const maxIndex = Math.max(0, items.length - 1);
  const [uncontrolledIndex, setUncontrolledIndex] = React.useState(() =>
    clamp(defaultActiveIndex, 0, maxIndex),
  );
  const currentIndex = clamp(activeIndex ?? uncontrolledIndex, 0, maxIndex);
  const safeSlideSize = Math.max(120, slideSize);
  const safeInactiveScale = clamp(inactiveScale, 0.35, 1);

  const selectSlide = React.useCallback(
    (nextIndex: number) => {
      if (!items.length) return;
      const resolvedIndex = loop
        ? (nextIndex + items.length) % items.length
        : clamp(nextIndex, 0, maxIndex);
      if (activeIndex === undefined) setUncontrolledIndex(resolvedIndex);
      onActiveIndexChange?.(resolvedIndex);
    },
    [activeIndex, items.length, loop, maxIndex, onActiveIndexChange],
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      selectSlide(currentIndex - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      selectSlide(currentIndex + 1);
    }
  };

  if (!items.length) return null;

  const isPreviousDisabled = !loop && currentIndex === 0;
  const isNextDisabled = !loop && currentIndex === maxIndex;

  return (
    <div
      {...props}
      tabIndex={tabIndex}
      onKeyDown={handleKeyDown}
      className={cn("relative w-full select-none outline-none", className)}
    >
      <div
        className={cn(
          "relative mx-auto flex items-center justify-center",
          "h-[520px] w-full overflow-hidden",
          viewportClassName,
        )}
        style={{ perspective: "1400px" }}
      >
        <div className="relative h-full w-full" style={{ transformStyle: "preserve-3d" }}>
          {items.map((item, index) => {
            const isActive = currentIndex === index;
            const distance = index - currentIndex;
            const absDist = Math.abs(distance);
            const visible = absDist <= 3;

            const x = distance * (safeSlideSize * 0.55);
            const y = distance * verticalStep;
            const rotate = distance * rotationStep;
            const scale = isActive ? 1 : Math.max(safeInactiveScale, 1 - absDist * 0.12);
            const opacity = visible ? (isActive ? 1 : 0.55 - absDist * 0.12) : 0;
            const zIndex = 100 - absDist;

            return (
              <motion.div
                key={`${item.src}-${index}`}
                className={cn(
                  "absolute left-1/2 top-1/2 flex flex-col items-center",
                  slideClassName,
                )}
                style={{
                  width: safeSlideSize,
                  marginLeft: -safeSlideSize / 2,
                  marginTop: -safeSlideSize * 0.7,
                  zIndex,
                }}
                animate={{
                  x,
                  y,
                  rotate,
                  scale,
                  opacity,
                }}
                transition={transition}
              >
                <div
                  className={cn(
                    "mb-3 text-center text-xs font-semibold uppercase tracking-[0.25em] text-cream/80",
                    labelClassName,
                  )}
                >
                  {item.title}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (isActive) onActiveSlideClick?.(index);
                    else selectSlide(index);
                  }}
                  className={cn(
                    "group relative block overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-2xl outline-none transition-shadow",
                    isActive && "ring-2 ring-ember shadow-[0_30px_80px_-20px_rgba(255,90,20,0.45)]",
                  )}
                  style={{
                    width: safeSlideSize,
                    aspectRatio: "4 / 3",
                  }}
                  aria-label={`View ${item.title}`}
                >
                  <img
                    src={item.src}
                    alt={item.alt ?? item.title}
                    loading="lazy"
                    className={cn(
                      "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105",
                      imageClassName,
                    )}
                  />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {showControls && (
        <div
          className={cn(
            "mt-6 flex items-center justify-center gap-4",
            controlsClassName,
          )}
        >
          <button
            type="button"
            aria-label="Previous certificate"
            disabled={isPreviousDisabled}
            onClick={() => selectSlide(currentIndex - 1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] text-cream transition-colors hover:bg-white/10 disabled:opacity-30"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {showDots && (
            <div className="flex items-center gap-2">
              {items.map((item, index) => (
                <button
                  key={`dot-${index}`}
                  type="button"
                  aria-label={`Go to ${item.title}`}
                  onClick={() => selectSlide(index)}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    currentIndex === index
                      ? "w-8 bg-ember"
                      : "w-2 bg-white/25 hover:bg-white/50",
                  )}
                />
              ))}
            </div>
          )}

          <button
            type="button"
            aria-label="Next certificate"
            disabled={isNextDisabled}
            onClick={() => selectSlide(currentIndex + 1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] text-cream transition-colors hover:bg-white/10 disabled:opacity-30"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}

export default DiagonalCarousel;
