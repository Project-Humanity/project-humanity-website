"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { LINKS } from "@/lib/links";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      setScrolled(window.scrollY > 80);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-rule bg-bg/70 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between">
        <a
          href="#top"
          aria-label="Project Humanity, back to top"
          className="group inline-flex items-center gap-3"
        >
          <Image
            src="/project-humanity.png"
            alt=""
            width={39}
            height={36}
            priority
            style={{ width: "39px", height: "36px" }}
          />
          <span
            className="font-mono text-[0.65rem] uppercase text-ink-soft transition-colors duration-200 group-hover:text-ink"
            style={{ letterSpacing: "0.22em" }}
          >
            Project Humanity
          </span>
        </a>

        <a
          href={LINKS.discord}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden min-h-10 items-center gap-2 border border-rule-strong px-5 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink transition-colors duration-200 hover:border-accent hover:text-accent md:inline-flex"
        >
          Join us
          <span aria-hidden="true">→</span>
        </a>
      </nav>
    </header>
  );
}
