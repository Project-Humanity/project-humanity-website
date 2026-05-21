"use client";

import { motion, useReducedMotion } from "motion/react";
import { reveal, stagger, viewportOnce } from "@/lib/motion";

export default function WontDo() {
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
    <section className="relative border-y border-rule bg-bg-2">
      <div className="container-page py-28 sm:py-36">
        <motion.div {...container} className="mx-auto max-w-3xl">
          <motion.p
            {...item}
            className="mb-6 font-mono text-[0.7rem] uppercase text-ink-soft"
            style={{ letterSpacing: "0.24em" }}
          >
            {"// 05 / The line"}
          </motion.p>

          <motion.h2
            {...item}
            className="text-ink"
            style={{
              fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              fontWeight: 600,
            }}
          >
            What we won&apos;t do
          </motion.h2>

          <motion.div
            {...item}
            className="mt-10 space-y-7 text-ink"
            style={{ fontSize: "1.5rem", lineHeight: 1.45 }}
          >
            <p>
              We are not going to put our work behind a paywall while people are
              struggling to make ends meet.{" "}
              <span className="font-medium text-ink">
                That&apos;s basically the whole point.
              </span>
            </p>
            <p className="text-ink-soft">
              If a company later wants to build something on top of what
              we&apos;ve made, that&apos;s a good thing and we are happy about
              it. But we don&apos;t plan on stopping any time soon, and we are
              not interested in selling out.{" "}
              <span className="text-ink">
                The mission isn&apos;t a stepping stone to something else.
              </span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
