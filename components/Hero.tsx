"use client";

import { motion, useReducedMotion } from "motion/react";
import { word } from "@/lib/motion";

const HEADLINE = [
  "Advancing",
  "the frontiers of",
  "our shared future.",
];

// Page-load timing. Eyebrow first, headline reveals word-by-word at 70ms
// apart, then subline, then tagline. Total reveal under 1.5s.
const EYEBROW_DELAY = 0.05;
const HEADLINE_START = 0.28;
const PER_WORD = 0.07;

let wordCounter = 0;
const HEADLINE_LINES = HEADLINE.map((line) => ({
  line,
  words: line.split(" ").map((text) => ({ text, index: wordCounter++ })),
}));
const totalWords = wordCounter;
const HEADLINE_END = HEADLINE_START + (totalWords - 1) * PER_WORD;
const SUBLINE_DELAY = HEADLINE_END + 0.16;
const TAGLINE_DELAY = SUBLINE_DELAY + 0.14;

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex min-h-dvh items-center overflow-hidden">
      <div className="hero-glow" aria-hidden="true" />

      <div className="container-page relative z-10 w-full py-32">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: EYEBROW_DELAY,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="font-mono text-xs uppercase text-ink-soft"
          style={{ letterSpacing: "0.24em" }}
        >
          <span aria-hidden="true" className="mr-2 text-ink-mute">
            {"//"}
          </span>
          Project Humanity
        </motion.p>

        <h1
          className="mt-7 text-ink"
          style={{
            fontSize: "clamp(3.5rem, 8.5vw, 7.5rem)",
            lineHeight: 0.96,
            letterSpacing: "-0.035em",
            fontWeight: 600,
          }}
        >
          {HEADLINE_LINES.map(({ line, words }) => (
            <span key={line} className="block">
              {words.map(({ text, index }) => (
                <span
                  key={`${line}-${text}-${index}`}
                  className="inline-block whitespace-pre"
                >
                  <motion.span
                    className="inline-block"
                    variants={reduce ? undefined : word}
                    initial={reduce ? false : "hidden"}
                    animate={reduce ? undefined : "visible"}
                    transition={
                      reduce
                        ? undefined
                        : {
                            delay: HEADLINE_START + index * PER_WORD,
                            duration: 0.5,
                            ease: [0.22, 1, 0.36, 1],
                          }
                    }
                  >
                    {text}
                  </motion.span>{" "}
                </span>
              ))}
            </span>
          ))}
        </h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: SUBLINE_DELAY,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-8 text-lg text-ink-soft"
          style={{ maxWidth: "75ch" }}
        >
          An open-source community building across compute, healthcare,
          climate, energy, and the work in between. We start with the
          foundations and let the work compound from there.
        </motion.p>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: TAGLINE_DELAY,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-6 inline-flex items-center gap-3 font-mono text-sm uppercase text-ink-soft"
          style={{ letterSpacing: "0.2em" }}
        >
          <span aria-hidden="true" className="block h-px w-8 bg-rule-strong" />
          Built by anyone. Owned by everyone.
        </motion.p>
      </div>

      <div
        className="container-page pointer-events-none absolute inset-x-0 bottom-10 z-10 flex items-end"
        aria-hidden="true"
      >
        <div className="flex flex-col items-start gap-3">
          <span
            className="font-mono text-[0.65rem] uppercase text-ink-mute"
            style={{ letterSpacing: "0.28em" }}
          >
            Scroll
          </span>
          <span className="block h-14 w-px bg-rule-strong" />
        </div>
      </div>
    </section>
  );
}
