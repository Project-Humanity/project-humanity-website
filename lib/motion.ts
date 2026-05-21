import type { Variants } from "motion/react";

// A calm, slightly decelerated ease. No bounce, no overshoot.
const EASE = [0.22, 1, 0.36, 1] as const;

// Scroll-triggered reveal: short fade + small upward settle.
export const reveal: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

// Container that releases its children one after another.
export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

// Domains entering from the left as they reach the viewport.
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: EASE },
  },
};

// A single hero word: blur + lift + fade, resolving in sequence.
export const word: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: EASE },
  },
};

// Shared whileInView config so every section fires once, just before entry.
export const viewportOnce = { once: true, amount: 0.25 } as const;
