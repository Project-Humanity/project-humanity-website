"use client";

import { motion, useReducedMotion } from "motion/react";
import { reveal, stagger, viewportOnce } from "@/lib/motion";

export default function Quiet() {
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
    <section className="border-t border-rule">
      <div className="container-page py-28 text-center sm:py-36">
        <motion.div {...container} className="mx-auto max-w-2xl">
          <motion.h2
            {...item}
            className="font-mono text-[0.7rem] uppercase text-ink-soft"
            style={{ letterSpacing: "0.24em" }}
          >
            {"// 07 / And one more thing"}
          </motion.h2>

          <motion.p
            {...item}
            className="mt-8 text-ink-soft"
            style={{
              fontSize: "clamp(1.4rem, 2.8vw, 1.75rem)",
              lineHeight: 1.45,
              fontWeight: 400,
              letterSpacing: "-0.015em",
            }}
          >
            You&apos;re building for you too. You are part of whatever we make,
            in whatever capacity you contributed. You get to be involved in
            something you can hopefully feel proud of. When the work starts
            paying off,{" "}
            <span className="font-medium text-ink">
              you reap the benefits, as you should.
            </span>
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
