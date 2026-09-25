import React, { useRef, useState } from "react";
import { motion, AnimatePresence, animate } from "motion/react";
import type { AnimationPlaybackControls } from "motion/react";
import { cn } from "@/lib/utils";

type DockIcon = React.ComponentType<{ className?: string }>;

/** Morph animations that ship with the dock. */
export type MorphType = "home" | "email";

const MORPH_TYPES: MorphType[] = ["home", "email"];

export interface DockItem {
  /** Label shown in the tooltip. */
  title: string;
  /** Fallback icon used when no morph animation applies. */
  icon: DockIcon;
  /**
   * Which built-in morph animation to play on hover. Decoupled from `title`
   * so we can label an item "Home"/"Contact" while reusing a morph shape.
   * If omitted, falls back to a morph matching the lowercased title, else
   * renders the static `icon`.
   */
  morphType?: MorphType;
  onClick?: () => void;
  href?: string;
}

export interface GlassDockProps extends React.HTMLAttributes<HTMLDivElement> {
  items: DockItem[];
  dockClassName?: string;
}

/**
 * Hover morph per icon: resting shape -> squash -> squash -> resting shape.
 * Every path in a set is pre-normalized to the same command structure (cubic
 * segments, aligned start point and winding) so Motion can interpolate `d`
 * directly, instead of resolving the shapes at runtime with GSAP MorphSVG.
 * `durations` are the three segments of the sequence, in seconds.
 */
const MORPHS: Record<
  MorphType,
  { shapes: [string, string, string]; durations: [number, number, number] }
> = {
  home: {
    shapes: [
      "M3 18C3 15.511 3 13.023 3 10.534C3 9.571 3.463 8.666 4.244 8.102C6.244 6.657 8.244 5.213 10.244 3.769C11.292 3.011 12.708 3.011 13.757 3.769C15.757 5.213 17.757 6.657 19.757 8.102C20.537 8.666 21 9.571 21 10.534C21 13.023 21 15.511 21 18C21 19.657 19.657 21 18 21C14 21 10 21 6 21C4.343 21 3 19.657 3 18Z",
      "M12.615 20.077C11.274 16.857 9.932 13.638 8.591 10.418C8.22 9.528 8.3 8.513 8.805 7.692C9.657 6.307 10.509 4.923 11.361 3.538C11.654 3.062 12.346 3.062 12.639 3.538C13.491 4.923 14.343 6.307 15.195 7.692C15.7 8.513 15.78 9.528 15.409 10.418C14.068 13.638 12.726 16.857 11.385 20.077C11.202 20.516 11.524 21 12 21C12 21 12 21 12 21C12.476 21 12.798 20.516 12.615 20.077Z",
      "M8.085 18.829C9.581 15.837 11.077 12.846 12.573 9.854C12.851 9.298 12.949 8.67 12.855 8.056C12.619 6.525 12.384 4.995 12.148 3.464C12.122 3.294 11.878 3.294 11.852 3.464C11.616 4.995 11.381 6.525 11.145 8.056C11.051 8.67 11.149 9.298 11.427 9.854C12.923 12.846 14.419 15.837 15.915 18.829C16.413 19.827 15.688 21 14.573 21C12.858 21 11.142 21 9.427 21C8.312 21 7.587 19.827 8.085 18.829Z",
    ],
    durations: [0.1, 0.09, 0.71],
  },
  email: {
    shapes: [
      "M20 4C14.667 4 9.333 4 4 4C2.9 4 2 4.9 2 6C2 10 2 14 2 18C2 19.1 2.9 20 4 20C9.333 20 14.667 20 20 20C21.1 20 22 19.1 22 18C22 14 22 10 22 6C22 4.9 21.1 4 20 4ZM20 8C17.333 9.667 14.667 11.333 12 13C9.333 11.333 6.667 9.667 4 8C4 7.333 4 6.667 4 6C6.667 7.667 9.333 9.333 12 11C14.667 9.333 17.333 7.667 20 6C20 6.667 20 7.333 20 8Z",
      "M14.575 5.05C13.933 3.784 12.933 3 12 3C11.067 3 10.067 3.784 9.425 5.05C8.784 6.317 8.5 8.067 9 10C9.513 11.982 12.065 14.171 13.364 16C15.395 18.861 12 21 12 21C12 21 8.605 18.861 10.636 16C11.935 14.171 14.487 11.982 15 10C15.5 8.067 15.217 6.317 14.575 5.05ZM12 8.667C12 8.667 12 8.667 12 8.667C12 8.667 12 8.667 12 8.667C12 8.667 12 8.667 12 8.667C12 8.667 12 8.667 12 8.667C12 8.667 12 8.667 12 8.667C12 8.667 12 8.667 12 8.667Z",
      "M12.55 5.05C12.567 3.784 12.567 3 12 3C11.433 3 11.433 3.784 11.45 5.05C11.467 6.317 11.5 8.067 11 10C10.487 11.982 9.397 13.89 9.636 16C9.978 19.022 12 21 12 21C12 21 14.022 19.022 14.364 16C14.603 13.89 13.513 11.982 13 10C12.5 8.067 12.534 6.317 12.55 5.05ZM12 8.667C12 8.667 12 8.667 12 8.667C12 8.667 12 8.667 12 8.667C12 8.667 12 8.667 12 8.667C12 8.667 12 8.667 12 8.667C12 8.667 12 8.667 12 8.667C12 8.667 12 8.667 12 8.667Z",
    ],
    durations: [0.1, 0.05, 0.7],
  },
};

// GSAP's elastic.out(1, 0.9): the springy settle at the end of every morph.
const elasticOut = (t: number) =>
  t >= 1 ? 1 : 2 ** (-10 * t) * Math.sin(((t - 0.225) * 2 * Math.PI) / 0.9) + 1;

// Helper component for Morphing Icons
const MorphingIcon = ({
  type,
  isActive,
  onClick,
  onMouseEnter,
}: {
  type: MorphType;
  isActive: boolean;
  onClick: () => void;
  onMouseEnter?: () => void;
}) => {
  const pathRef = useRef<SVGPathElement>(null);
  const morph = useRef<AnimationPlaybackControls | null>(null);
  const { shapes, durations } = MORPHS[type];

  const handleMouseEnter = () => {
    onMouseEnter?.();
    if (!pathRef.current) return;
    const [squash, squash2, settle] = durations;
    const total = squash + squash2 + settle;
    morph.current?.stop();
    morph.current = animate(
      pathRef.current,
      { d: [null, shapes[1], shapes[2], shapes[0]] },
      {
        // 0.1s beat before the morph starts, as before
        delay: 0.1,
        duration: total,
        times: [0, squash / total, (squash + squash2) / total, 1],
        ease: ["easeInOut", "easeInOut", elasticOut],
      }
    );
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      className={cn("morph-icon", type, isActive ? "active" : "")}
      tabIndex={-1}
    >
      <svg viewBox="0 0 24 24">
        <path ref={pathRef} d={shapes[0]} />
      </svg>
    </button>
  );
};

export const GlassDock = React.forwardRef<HTMLDivElement, GlassDockProps>(
  ({ items, className, dockClassName, ...props }, ref) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [direction, setDirection] = useState(0);

    const handleMouseEnter = (index: number) => {
      if (hoveredIndex !== null && index !== hoveredIndex) {
        setDirection(index > hoveredIndex ? 1 : -1);
      }
      setHoveredIndex(index);
    };

    // Center of icon `index` within the dock's inner box:
    // px-6 (24) left padding + half of a 40px (w-10) item + index * pitch.
    // pitch = 40px item + 16px gap (gap-4) = 56px.
    const getIconCenter = (index: number) => 24 + 20 + index * 56;

    const resolveMorph = (item: DockItem): MorphType | undefined => {
      if (item.morphType) return item.morphType;
      const t = item.title.toLowerCase();
      return (MORPH_TYPES as string[]).includes(t)
        ? (t as MorphType)
        : undefined;
    };

    return (
      <div ref={ref} className={cn("w-max", className)} {...props}>
        <div
          className={cn(
            "glass-dock relative flex gap-4 items-center px-6 py-4 rounded-2xl",
            "glass-border backdrop-blur-xl shadow-2xl justify-center",
            dockClassName
          )}
          onMouseLeave={() => {
            setHoveredIndex(null);
            setDirection(0);
          }}
        >
          <AnimatePresence>
            {hoveredIndex !== null && (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.92, y: 12 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: -60,
                  x: getIconCenter(hoveredIndex),
                }}
                exit={{ opacity: 0, scale: 0.92, y: 12 }}
                transition={{ type: "spring", stiffness: 120, damping: 18 }}
                className="absolute top-0 left-0 pointer-events-none z-30"
              >
                <div className="-translate-x-1/2">
                  <div
                    className={cn(
                      "px-5 py-2 rounded-lg",
                      "bg-white text-black shadow-md flex items-center justify-center",
                      "border border-neutral-300",
                      "min-w-[100px]"
                    )}
                  >
                    <div className="relative h-4 flex items-center justify-center overflow-hidden w-full">
                      <AnimatePresence mode="popLayout" custom={direction}>
                        <motion.span
                          key={items[hoveredIndex].title}
                          custom={direction}
                          initial={{
                            x: direction > 0 ? 35 : -35,
                            opacity: 0,
                            filter: "blur(6px)",
                          }}
                          animate={{
                            x: 0,
                            opacity: 1,
                            filter: "blur(0px)",
                          }}
                          exit={{
                            x: direction > 0 ? -35 : 35,
                            opacity: 0,
                            filter: "blur(6px)",
                          }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="text-[13px] font-medium tracking-wide whitespace-nowrap"
                        >
                          {items[hoveredIndex].title}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {items.map((el, index) => {
            const Icon = el.icon;
            const isHovered = hoveredIndex === index;
            const isActive = isHovered;
            const morph = resolveMorph(el);

            const handleClick = () => {
              if (el.onClick) {
                el.onClick();
              } else if (el.href) {
                if (el.href.startsWith("#")) {
                  document
                    .querySelector(el.href)
                    ?.scrollIntoView({ behavior: "smooth" });
                } else if (
                  el.href.startsWith("http") ||
                  el.href.startsWith("mailto") ||
                  el.href.startsWith("tel")
                ) {
                  window.open(el.href, "_blank", "noopener,noreferrer");
                } else {
                  window.location.href = el.href;
                }
              }
            };

            return (
              <div
                key={el.title}
                onMouseEnter={() => handleMouseEnter(index)}
                onClick={handleClick}
                className="relative w-10 h-10 flex items-center justify-center cursor-pointer"
                role="button"
                aria-label={el.title}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleClick();
                  }
                }}
              >
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    scale: isHovered ? 1.1 : 1,
                    y: isHovered ? -3 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                >
                  {morph ? (
                    <MorphingIcon
                      type={morph}
                      isActive={isActive}
                      onClick={handleClick}
                      onMouseEnter={() => {}}
                    />
                  ) : (
                    <Icon
                      className={cn(
                        "h-[22px] w-[22px] transition-colors duration-200",
                        isHovered ? "text-white" : "text-neutral-400"
                      )}
                    />
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

GlassDock.displayName = "GlassDock";
export default GlassDock;
