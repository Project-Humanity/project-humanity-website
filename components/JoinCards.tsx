"use client";

import { motion, useReducedMotion } from "motion/react";
import { reveal, stagger, viewportOnce } from "@/lib/motion";
import { LINKS } from "@/lib/links";

const SOCIALS = [
  {
    label: "X",
    href: LINKS.twitter,
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    label: "GitHub",
    href: LINKS.github,
    path: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12z",
  },
];

const CARD_CLASS =
  "group glow-on-hover flex h-full flex-col justify-between border border-rule bg-bg-2 p-8";

const KICKER_STYLE = { letterSpacing: "0.24em" } as const;

export default function JoinCards() {
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
    <section id="join" className="border-t border-rule scroll-mt-24">
      <div className="container-page py-28 sm:py-36">
        <motion.div {...container}>
          <motion.p
            {...item}
            className="mb-5 font-mono text-[0.7rem] uppercase text-ink-soft"
            style={KICKER_STYLE}
          >
            {"// 08 / The doors"}
          </motion.p>

          <motion.h2
            {...item}
            className="text-ink"
            style={{
              fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)",
              lineHeight: 1.0,
              letterSpacing: "-0.035em",
              fontWeight: 600,
            }}
          >
            <span className="block">If this sounds like</span>
            <span className="block">the right thing.</span>
          </motion.h2>

          <motion.p {...item} className="mt-6 text-lg text-ink-soft">
            Come find us. Pick the door that fits.
          </motion.p>
        </motion.div>

        <motion.div {...container} className="mt-14 grid gap-4 md:grid-cols-3">
          {/* Card 1: Discord */}
          <motion.a
            {...item}
            href={LINKS.discord}
            target="_blank"
            rel="noopener noreferrer"
            className={CARD_CLASS}
          >
            <div>
              <p
                className="font-mono text-[0.65rem] uppercase text-ink-mute"
                style={KICKER_STYLE}
              >
                01 // Chat
              </p>
              <h3 className="mt-6 text-2xl font-medium text-ink">Talk to us</h3>
              <p className="mt-3 text-ink-soft">
                Real-time chat. Where projects happen.
              </p>
            </div>
            <span
              className="mt-10 inline-flex min-h-12 items-center font-mono text-xs uppercase text-ink transition-colors duration-200 group-hover:text-accent"
              style={KICKER_STYLE}
            >
              Open Discord
              <span aria-hidden="true" className="ml-2">
                →
              </span>
            </span>
          </motion.a>

          {/* Card 2: WhatsApp */}
          <motion.a
            {...item}
            href={LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={CARD_CLASS}
          >
            <div>
              <p
                className="font-mono text-[0.65rem] uppercase text-ink-mute"
                style={KICKER_STYLE}
              >
                02 // Broadcast
              </p>
              <h3 className="mt-6 text-2xl font-medium text-ink">
                Get updates
              </h3>
              <p className="mt-3 text-ink-soft">
                Quiet broadcast list. Announcements only, no chatter.
              </p>
            </div>
            <span
              className="mt-10 inline-flex min-h-12 items-center font-mono text-xs uppercase text-ink transition-colors duration-200 group-hover:text-accent"
              style={KICKER_STYLE}
            >
              Join broadcast
              <span aria-hidden="true" className="ml-2">
                →
              </span>
            </span>
          </motion.a>

          {/* Card 3: Socials */}
          <motion.div {...item} className={CARD_CLASS}>
            <div>
              <p
                className="font-mono text-[0.65rem] uppercase text-ink-mute"
                style={KICKER_STYLE}
              >
                03 // Signal
              </p>
              <h3 className="mt-6 text-2xl font-medium text-ink">
                Follow along
              </h3>
              <p className="mt-3 text-ink-soft">
                X, GitHub, and wherever else you live online.
              </p>
            </div>
            <div className="mt-10 flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="inline-flex h-12 w-12 items-center justify-center border border-rule text-ink transition duration-200 hover:border-accent hover:text-accent"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.p
          {...container}
          className="mt-10 text-sm text-ink-mute"
        >
          <motion.span {...item} className="inline-block">
            Or just lurk for a while. That&apos;s fine too.
          </motion.span>
        </motion.p>
      </div>
    </section>
  );
}
