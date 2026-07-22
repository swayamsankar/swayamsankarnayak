import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  memo,
  type CSSProperties,
  type Key,
  type ReactNode,
  type RefObject,
} from "react";
import "./LogoLoop.css";

const ANIMATION_CONFIG = { SMOOTH_TAU: 0.25, MIN_COPIES: 2, COPY_HEADROOM: 2 };

export type LogoItem =
  | { node: ReactNode; title?: string; href?: string; ariaLabel?: string }
  | { src: string; alt?: string; title?: string; href?: string };

export type LogoLoopProps = {
  logos: LogoItem[];
  speed?: number;
  direction?: "left" | "right" | "up" | "down";
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  hoverSpeed?: number;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  renderItem?: (item: LogoItem, key: Key) => ReactNode;
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
};

const toCssLength = (value?: number | string) =>
  typeof value === "number" ? `${value}px` : (value ?? undefined);

const useResizeObserver = (
  callback: () => void,
  elements: RefObject<HTMLElement | null>[],
  deps: unknown[],
) => {
  useEffect(() => {
    if (!window.ResizeObserver) {
      const handler = () => callback();
      window.addEventListener("resize", handler);
      callback();
      return () => window.removeEventListener("resize", handler);
    }
    const observers = elements.map((ref) => {
      if (!ref.current) return null;
      const o = new ResizeObserver(callback);
      o.observe(ref.current);
      return o;
    });
    callback();
    return () => observers.forEach((o) => o?.disconnect());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export const LogoLoop = memo<LogoLoopProps>(
  ({
    logos,
    speed = 120,
    direction = "left",
    width = "100%",
    logoHeight = 28,
    gap = 32,
    pauseOnHover,
    hoverSpeed,
    fadeOut = false,
    fadeOutColor,
    scaleOnHover = false,
    renderItem,
    ariaLabel = "Partner logos",
    className,
    style,
  }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const seqRef = useRef<HTMLUListElement | null>(null);

    const [seqWidth, setSeqWidth] = useState(0);
    const [seqHeight, setSeqHeight] = useState(0);
    const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES);
    const [isHovered, setIsHovered] = useState(false);

    const effectiveHoverSpeed = useMemo(() => {
      if (hoverSpeed !== undefined) return hoverSpeed;
      if (pauseOnHover === true) return 0;
      if (pauseOnHover === false) return undefined;
      return undefined;
    }, [hoverSpeed, pauseOnHover]);

    const isVertical = direction === "up" || direction === "down";

    const targetVelocity = useMemo(() => {
      const magnitude = Math.abs(speed);
      const dirMul = isVertical ? (direction === "up" ? 1 : -1) : direction === "left" ? 1 : -1;
      const speedMul = speed < 0 ? -1 : 1;
      return magnitude * dirMul * speedMul;
    }, [speed, direction, isVertical]);

    const updateDimensions = useCallback(() => {
      const containerWidth = containerRef.current?.clientWidth ?? 0;
      const rect = seqRef.current?.getBoundingClientRect?.();
      const sw = rect?.width ?? 0;
      const sh = rect?.height ?? 0;
      if (isVertical) {
        const parentH = containerRef.current?.parentElement?.clientHeight ?? 0;
        if (containerRef.current && parentH > 0) {
          const target = Math.ceil(parentH);
          if (containerRef.current.style.height !== `${target}px`)
            containerRef.current.style.height = `${target}px`;
        }
        if (sh > 0) {
          setSeqHeight(Math.ceil(sh));
          const viewport = containerRef.current?.clientHeight ?? parentH ?? sh;
          setCopyCount(
            Math.max(ANIMATION_CONFIG.MIN_COPIES, Math.ceil(viewport / sh) + ANIMATION_CONFIG.COPY_HEADROOM),
          );
        }
      } else if (sw > 0) {
        setSeqWidth(Math.ceil(sw));
        setCopyCount(
          Math.max(ANIMATION_CONFIG.MIN_COPIES, Math.ceil(containerWidth / sw) + ANIMATION_CONFIG.COPY_HEADROOM),
        );
      }
    }, [isVertical]);

    useResizeObserver(updateDimensions, [containerRef, seqRef], [logos, gap, logoHeight, isVertical]);

    useEffect(() => {
      const imgs = seqRef.current?.querySelectorAll("img") ?? [];
      if (imgs.length === 0) {
        updateDimensions();
        return;
      }
      let remaining = imgs.length;
      const done = () => {
        remaining -= 1;
        if (remaining === 0) updateDimensions();
      };
      imgs.forEach((img) => {
        if ((img as HTMLImageElement).complete) done();
        else {
          img.addEventListener("load", done, { once: true });
          img.addEventListener("error", done, { once: true });
        }
      });
    }, [logos, gap, logoHeight, isVertical, updateDimensions]);

    // Animation
    const rafRef = useRef<number | null>(null);
    const lastTsRef = useRef<number | null>(null);
    const offsetRef = useRef(0);
    const velRef = useRef(0);

    useEffect(() => {
      const track = trackRef.current;
      if (!track) return;
      const seqSize = isVertical ? seqHeight : seqWidth;
      if (seqSize > 0) {
        offsetRef.current = ((offsetRef.current % seqSize) + seqSize) % seqSize;
        track.style.transform = isVertical
          ? `translate3d(0, ${-offsetRef.current}px, 0)`
          : `translate3d(${-offsetRef.current}px, 0, 0)`;
      }
      const animate = (ts: number) => {
        if (lastTsRef.current === null) lastTsRef.current = ts;
        const dt = Math.max(0, ts - lastTsRef.current) / 1000;
        lastTsRef.current = ts;
        const target =
          isHovered && effectiveHoverSpeed !== undefined ? effectiveHoverSpeed : targetVelocity;
        const ease = 1 - Math.exp(-dt / ANIMATION_CONFIG.SMOOTH_TAU);
        velRef.current += (target - velRef.current) * ease;
        if (seqSize > 0) {
          let next = offsetRef.current + velRef.current * dt;
          next = ((next % seqSize) + seqSize) % seqSize;
          offsetRef.current = next;
          track.style.transform = isVertical
            ? `translate3d(0, ${-next}px, 0)`
            : `translate3d(${-next}px, 0, 0)`;
        }
        rafRef.current = requestAnimationFrame(animate);
      };
      rafRef.current = requestAnimationFrame(animate);
      return () => {
        if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
        lastTsRef.current = null;
      };
    }, [targetVelocity, seqWidth, seqHeight, isHovered, effectiveHoverSpeed, isVertical]);

    const cssVars = useMemo(
      () =>
        ({
          "--logoloop-gap": `${gap}px`,
          "--logoloop-logoHeight": `${logoHeight}px`,
          ...(fadeOutColor && { "--logoloop-fadeColor": fadeOutColor }),
        }) as CSSProperties,
      [gap, logoHeight, fadeOutColor],
    );

    const rootClassName = [
      "logoloop",
      isVertical ? "logoloop--vertical" : "logoloop--horizontal",
      fadeOut && "logoloop--fade",
      scaleOnHover && "logoloop--scale-hover",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const renderLogoItem = (item: LogoItem, key: Key) => {
      if (renderItem) {
        return (
          <li className="logoloop__item" key={key} role="listitem">
            {renderItem(item, key)}
          </li>
        );
      }
      const isNode = "node" in item;
      const content = isNode ? (
        <span className="logoloop__node" aria-hidden={!!item.href && !item.ariaLabel}>
          {item.node}
        </span>
      ) : (
        <img src={item.src} alt={item.alt ?? ""} loading="lazy" draggable={false} />
      );
      const label = isNode ? (item.ariaLabel ?? item.title) : (item.alt ?? item.title);
      const inner = item.href ? (
        <a className="logoloop__link" href={item.href} aria-label={label} target="_blank" rel="noreferrer noopener">
          {content}
        </a>
      ) : (
        content
      );
      return (
        <li className="logoloop__item" key={key} role="listitem">
          {inner}
        </li>
      );
    };

    const lists = Array.from({ length: copyCount }, (_, ci) => (
      <ul
        className="logoloop__list"
        key={`copy-${ci}`}
        role="list"
        aria-hidden={ci > 0}
        ref={ci === 0 ? seqRef : undefined}
      >
        {logos.map((item, i) => renderLogoItem(item, `${ci}-${i}`))}
      </ul>
    ));

    const containerStyle: CSSProperties = {
      width: isVertical
        ? toCssLength(width) === "100%"
          ? undefined
          : toCssLength(width)
        : (toCssLength(width) ?? "100%"),
      ...cssVars,
      ...style,
    };

    return (
      <div
        ref={containerRef}
        className={rootClassName}
        style={containerStyle}
        role="region"
        aria-label={ariaLabel}
        onMouseEnter={() => effectiveHoverSpeed !== undefined && setIsHovered(true)}
        onMouseLeave={() => effectiveHoverSpeed !== undefined && setIsHovered(false)}
      >
        <div className="logoloop__track" ref={trackRef}>
          {lists}
        </div>
      </div>
    );
  },
);

LogoLoop.displayName = "LogoLoop";
export default LogoLoop;
