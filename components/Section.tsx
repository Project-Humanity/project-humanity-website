"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { reveal, stagger, viewportOnce } from "@/lib/motion";

type SectionProps = {
  id?: string;
  kicker?: string;
  heading: string;
  children: ReactNode;
  tone?: "bg" | "bg-2";
};

/**
 * Two-column editorial section: heading on the left, prose on the right,
 * stacked under 768px. Mono kicker above the heading. Reveals once on
 * scroll-in, honoring reduced motion.
 */
export default function Section({
  id,
  kicker,
  heading,
  children,
  tone = "bg",
}: SectionProps) {
  const reduce = useReducedMotion();

  const container = reduce
    ? {}
    : {
        variants: stagger,
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: viewportOnce,
      };
  const item = reduce ? {} : { variants: reveal };

  return (
    <section
      id={id}
      className={`border-t border-rule ${tone === "bg-2" ? "bg-bg-2" : ""}`}
    >
      <div className="container-page py-24 sm:py-32">
        <motion.div
          {...container}
          className="grid gap-y-10 md:grid-cols-12 md:gap-x-12"
        >
          <motion.div {...item} className="md:col-span-4">
            {kicker ? (
              <p
                className="mb-5 font-mono text-[0.7rem] uppercase text-ink-soft"
                style={{ letterSpacing: "0.24em" }}
              >
                {kicker}
              </p>
            ) : null}
            <h2
              className="text-ink"
              style={{
                fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.03em",
                fontWeight: 600,
              }}
            >
              {heading}
            </h2>
          </motion.div>

          <motion.div
            {...item}
            className="measure space-y-6 text-base text-ink-soft md:col-span-7 md:col-start-6"
          >
            {children}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
