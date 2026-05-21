"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { reveal, slideInLeft, stagger, viewportOnce } from "@/lib/motion";

const DOMAINS = [
  "Medical",
  "Space",
  "Finance",
  "Energy",
  "Climate",
  "And a lot more",
];

const accent: Variants = {
  hidden: { width: 0, opacity: 0 },
  visible: {
    width: "clamp(3rem, 8vw, 6rem)",
    opacity: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function DomainShowcase() {
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
  const rowList = reduce
    ? {}
    : {
        variants: stagger,
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: viewportOnce,
      };
  const row = reduce ? {} : { variants: slideInLeft };

  return (
    <section className="border-t border-rule">
      <div className="container-page py-24 sm:py-32">
        <motion.div {...container}>
          <motion.p
            {...item}
            className="mb-5 font-mono text-[0.7rem] uppercase text-ink-soft"
            style={{ letterSpacing: "0.24em" }}
          >
            {"// 02 / Surface area"}
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
            What we&apos;ll be building
          </motion.h2>

          <motion.p {...item} className="measure mt-6 text-ink-soft">
            This isn&apos;t only a tech community. The projects we run will
            eventually live in all kinds of spaces.
          </motion.p>
        </motion.div>

        <motion.ul {...rowList} className="mt-16 border-t border-rule">
          {DOMAINS.map((domain, i) => (
            <motion.li
              key={domain}
              {...row}
              className="flex items-end justify-between gap-6 border-b border-rule py-6"
            >
              <div className="flex items-end gap-6">
                <span
                  className="hidden font-mono text-xs text-ink-mute sm:inline-block"
                  style={{ letterSpacing: "0.2em" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="text-ink"
                  style={{
                    fontSize: "clamp(3rem, 9vw, 7rem)",
                    lineHeight: 1,
                    letterSpacing: "-0.04em",
                    fontWeight: 600,
                  }}
                >
                  {domain}
                </span>
              </div>
              <motion.span
                aria-hidden="true"
                variants={reduce ? undefined : accent}
                className="mb-4 block h-px shrink-0 bg-ink-soft"
                style={
                  reduce ? { width: "clamp(3rem, 8vw, 6rem)" } : undefined
                }
              />
            </motion.li>
          ))}
        </motion.ul>

        <motion.div {...container} className="mt-14">
          <motion.p {...item} className="measure text-ink-soft">
            We&apos;ll have multiple projects going on at the same time, in
            different fields, with different teams behind each.{" "}
            <span className="text-ink">Slowly and surely</span>, this gets us to
            a place where the work actually starts paying off in people&apos;s
            lives.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
