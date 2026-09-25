import {
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

// Timing carried over from the GSAP version: each word's tween spans 0.5 units
// of a timeline, and words start 0.05 apart. The whole timeline is scrubbed
// across the scroll range, so word i is active over
// [i * STAGGER, i * STAGGER + TWEEN] / (TWEEN + STAGGER * (words - 1)).
const WORD_TWEEN = 0.5;
const WORD_STAGGER = 0.05;

interface ScrollRevealProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
}

interface WordProps {
  progress: MotionValue<number>;
  index: number;
  count: number;
  baseOpacity: number;
  blurStrength: number;
  enableBlur: boolean;
  children: string;
}

function Word({
  progress,
  index,
  count,
  baseOpacity,
  blurStrength,
  enableBlur,
  children,
}: WordProps) {
  const total = WORD_TWEEN + WORD_STAGGER * (count - 1);
  const range = [
    (WORD_STAGGER * index) / total,
    (WORD_STAGGER * index + WORD_TWEEN) / total,
  ];
  const opacity = useTransform(progress, range, [baseOpacity, 1]);
  const filter = useTransform(progress, range, [
    `blur(${blurStrength}px)`,
    "blur(0px)",
  ]);

  return (
    <motion.span
      className="inline-block word"
      style={
        enableBlur
          ? { opacity, filter, willChange: "opacity" }
          : { opacity, willChange: "opacity" }
      }
    >
      {children}
    </motion.span>
  );
}

export function ScrollReveal({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const { tokens, wordCount } = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    let count = 0;
    const parts = text
      .split(/(\s+)/)
      .filter((part) => part !== "")
      .map((part) => ({
        text: part,
        wordIndex: /^\s+$/.test(part) ? -1 : count++,
      }));
    return { tokens: parts, wordCount: count };
  }, [children]);

  // Heading straightens as it enters: "top bottom" -> "bottom bottom".
  const { scrollYProgress: rotationProgress } = useScroll({
    target: containerRef,
    container: scrollContainerRef,
    offset: ["start end", "end end"],
  });
  const rotate = useTransform(rotationProgress, [0, 1], [baseRotation, 0]);

  // A heading shorter than the 20% of viewport height between the two word
  // anchors would end before it starts, which reads as the words fading *out*
  // as they arrive. Those get a fixed 20% of scroll travel instead.
  const [isShort, setIsShort] = useState(false);
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const check = () => setIsShort(el.offsetHeight < window.innerHeight * 0.2);
    check();
    // The heading reflows when web fonts load, so watch it, not just the window.
    const observer = new ResizeObserver(check);
    observer.observe(el);
    window.addEventListener("resize", check);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", check);
    };
  }, []);

  // Words reveal from 20% up the viewport: "top bottom-=20%" -> "bottom bottom".
  const { scrollYProgress: wordProgress } = useScroll({
    target: containerRef,
    container: scrollContainerRef,
    offset: isShort ? ["start 0.8", "start 0.6"] : ["start 0.8", "end end"],
  });

  return (
    <motion.h2
      ref={containerRef}
      style={{ rotate, transformOrigin: "0% 50%" }}
      className={`my-5 ${containerClassName}`}
    >
      <p
        className={`text-[clamp(1.6rem,4vw,3rem)] leading-[1.5] font-semibold ${textClassName}`}
      >
        {tokens.map(({ text, wordIndex }, i) =>
          wordIndex < 0 ? (
            text
          ) : (
            <Word
              key={i}
              progress={wordProgress}
              index={wordIndex}
              count={wordCount}
              baseOpacity={baseOpacity}
              blurStrength={blurStrength}
              enableBlur={enableBlur}
            >
              {text}
            </Word>
          )
        )}
      </p>
    </motion.h2>
  );
}
