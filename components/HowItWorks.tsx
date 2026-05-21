"use client";

import { motion, useReducedMotion } from "motion/react";
import { reveal, stagger, viewportOnce } from "@/lib/motion";

const RULES = [
  {
    n: "01",
    lead: "Anyone can propose a project.",
    body: "If enough people back the idea, it gets moving.",
  },
  {
    n: "02",
    lead: "Decisions are discussed and voted on, openly.",
    body: "No closed rooms.",
  },
  {
    n: "03",
    lead: "Roles are flexible.",
    body: "Lead a team, write code, design, document, mentor, organize meetups, or do something else entirely.",
  },
  {
    n: "04",
    lead: "Don't see what you want to do?",
    body: "Tell us. We'll figure it out together.",
  },
  {
    n: "05",
    lead: "Every contributor gets credited.",
    body: "Names go on the site. The world sees who built what.",
  },
  {
    n: "06",
    lead: "Leadership grows from the work.",
    body: "The people who keep showing up become leads and core team. There is no closed track.",
  },
];

export default function HowItWorks() {
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
      <div className="container-page py-24 sm:py-32">
        <motion.div {...container}>
          <motion.p
            {...item}
            className="mb-5 font-mono text-[0.7rem] uppercase text-ink-soft"
            style={{ letterSpacing: "0.24em" }}
          >
            {"// 06 / Operating principles"}
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
            How this will work
          </motion.h2>

          <motion.p {...item} className="measure mt-6 text-ink-soft">
            There is going to be a structure, and everything about it will be
            open to the public.
          </motion.p>
        </motion.div>

        <motion.ul {...container} className="mt-14 border-t border-rule">
          {RULES.map((rule) => (
            <motion.li
              key={rule.n}
              {...item}
              className="grid gap-x-10 gap-y-2 border-b border-rule py-8 md:grid-cols-12"
            >
              <span
                className="font-mono text-xs uppercase text-ink-soft md:col-span-2"
                style={{ letterSpacing: "0.24em" }}
              >
                {rule.n} /
              </span>
              <div className="md:col-span-10">
                <p className="text-lg font-medium text-ink">{rule.lead}</p>
                <p className="mt-1 text-ink-soft">{rule.body}</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div {...container} className="mt-14">
          <motion.p {...item} className="measure text-ink-soft">
            We are early on, so the incentives and perks we can offer right now
            are limited. What we can offer is meaningful work, alongside people
            who actually care.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
