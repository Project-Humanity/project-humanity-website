"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";

type TierKey = "foundation" | "near" | "frontier";

type Tier = {
  key: TierKey;
  index: string;
  name: string;
  subtitle: string;
  headline: string;
  blurb: string;
  start: number;
  end: number;
};

type Project = {
  id: string;
  tierKey: TierKey;
  title: string;
  description: string;
  x: number; // 0..1 along the chart's x-axis
  y: number; // 0..1 in chart vertical (only used when !isKey)
  isKey: boolean; // true = sits on the curve (compound-effect anchor)
};

const TIERS: Tier[] = [
  {
    key: "foundation",
    index: "01",
    name: "Foundation",
    subtitle: "Now",
    headline: "The starting line.",
    blurb:
      "Open compute is the bottleneck blocking every other domain. It's where we focus first.",
    start: 0,
    end: 0.33,
  },
  {
    key: "near",
    index: "02",
    name: "Near-term",
    subtitle: "Next",
    headline: "The compound begins.",
    blurb:
      "Where the foundation begins to pay off. Tools that meet pressing, present-day problems.",
    start: 0.33,
    end: 0.66,
  },
  {
    key: "frontier",
    index: "03",
    name: "Frontier",
    subtitle: "Later",
    headline: "The frontier opens.",
    blurb:
      "Long-horizon work. The infrastructure of the world we actually want to live in.",
    start: 0.66,
    end: 1,
  },
];

/**
 * Projects shown across the chart.
 *
 * Key projects (`isKey: true`) sit on the curve — they're the compound-
 * effect anchors that pull every other domain forward. The rest are
 * "atmospheric" possibilities scattered through each phase: examples of
 * what someone could pick up, not a roadmap of what must happen.
 */
const PROJECTS: Project[] = [
  // ===== Foundation (x: 0 - 0.33) =====
  {
    id: "compute",
    tierKey: "foundation",
    title: "Compute & Infrastructure",
    description:
      "Open clusters, distributed pools, training pipelines. Without it, every other domain hits a wall.",
    x: 0.18,
    y: 0,
    isKey: true,
  },
  {
    id: "f-data",
    tierKey: "foundation",
    title: "Open data pipelines",
    description:
      "Shared ingestion, cleaning, and labeling tools every research domain ends up needing.",
    x: 0.08,
    y: 0.4,
    isKey: false,
  },
  {
    id: "f-experiments",
    tierKey: "foundation",
    title: "Experiment tracking",
    description:
      "Reproducibility infrastructure so research builds on research, not on memory.",
    x: 0.12,
    y: 0.7,
    isKey: false,
  },
  {
    id: "f-security",
    tierKey: "foundation",
    title: "Open-source security",
    description:
      "Audit tooling, dependency scanning, and the maintenance work nobody wants but everyone needs.",
    x: 0.27,
    y: 0.55,
    isKey: false,
  },
  {
    id: "f-bench",
    tierKey: "foundation",
    title: "Open evaluation suites",
    description:
      "Shared benchmarks for models, tools, and methods. The honest scoreboard the field is missing.",
    x: 0.3,
    y: 0.3,
    isKey: false,
  },

  // ===== Near-term (x: 0.33 - 0.66) =====
  {
    id: "health",
    tierKey: "near",
    title: "Healthcare",
    description:
      "Open diagnostics, triage, and care pipelines that reach the people the current system misses. Where the foundation pays off in lives.",
    x: 0.5,
    y: 0,
    isKey: true,
  },
  {
    id: "n-surveillance",
    tierKey: "near",
    title: "Disease surveillance",
    description:
      "Open sequencing pipelines, outbreak modeling, and early-warning networks. The biggest near-term lever against another pandemic.",
    x: 0.38,
    y: 0.62,
    isKey: false,
  },
  {
    id: "n-drugs",
    tierKey: "near",
    title: "Open drug discovery",
    description:
      "Open computational pharmacology and molecular design. The medicines that change lives shouldn't sit behind patent walls.",
    x: 0.42,
    y: 0.38,
    isKey: false,
  },
  {
    id: "n-disaster",
    tierKey: "near",
    title: "Disaster response",
    description:
      "Real-time mapping, coordination, and early warning for the moments that matter.",
    x: 0.55,
    y: 0.55,
    isKey: false,
  },
  {
    id: "n-citizen",
    tierKey: "near",
    title: "Citizen science",
    description:
      "Infrastructure for non-experts to contribute to real research.",
    x: 0.6,
    y: 0.3,
    isKey: false,
  },
  {
    id: "n-genomics",
    tierKey: "near",
    title: "Open genomics",
    description:
      "Pipelines, reference data, and variant tooling that the proprietary stack still gatekeeps.",
    x: 0.62,
    y: 0.7,
    isKey: false,
  },

  // ===== Frontier (x: 0.66 - 1) =====
  {
    id: "climate",
    tierKey: "frontier",
    title: "Climate",
    description:
      "Modeling, monitoring, and intervention tooling. Compound effects of getting this right.",
    x: 0.82,
    y: 0,
    isKey: true,
  },
  {
    id: "fr-energy",
    tierKey: "frontier",
    title: "Energy systems",
    description:
      "Grids, distribution modeling, fusion data. The substrate for the next century.",
    x: 0.7,
    y: 0.62,
    isKey: false,
  },
  {
    id: "fr-space",
    tierKey: "frontier",
    title: "Space infrastructure",
    description:
      "Open satellite data, planetary defense, debris tracking. The orbital commons.",
    x: 0.74,
    y: 0.38,
    isKey: false,
  },
  {
    id: "fr-bio",
    tierKey: "frontier",
    title: "Bioengineering",
    description:
      "Open protocols for the work reshaping medicine and food.",
    x: 0.78,
    y: 0.82,
    isKey: false,
  },
  {
    id: "fr-materials",
    tierKey: "frontier",
    title: "Material science",
    description:
      "Discovery pipelines for the materials everything physical depends on.",
    x: 0.86,
    y: 0.55,
    isKey: false,
  },
  {
    id: "fr-fusion",
    tierKey: "frontier",
    title: "Fusion data",
    description:
      "Open datasets and simulation tools for the energy transition's hardest bet.",
    x: 0.9,
    y: 0.86,
    isKey: false,
  },
  {
    id: "fr-quantum",
    tierKey: "frontier",
    title: "Quantum tooling",
    description:
      "Open frameworks for the compute paradigm that's about to matter.",
    x: 0.94,
    y: 0.44,
    isKey: false,
  },
];

// SVG geometry. Taller now that it sits in a column.
const W = 1000;
const H = 620;
const PAD_X = 70;
const PAD_TOP = 60;
const PAD_BOTTOM = 70;
const CURVE_K = 3;

function toSvg(xn: number): [number, number] {
  const px = PAD_X + xn * (W - 2 * PAD_X);
  const expN = (Math.exp(CURVE_K * xn) - 1) / (Math.exp(CURVE_K) - 1);
  const py = H - PAD_BOTTOM - expN * (H - PAD_TOP - PAD_BOTTOM);
  return [px, py];
}

/** Map a free (x, y) point in normalized chart space (y=1 top, y=0 bottom). */
function toSvgPoint(xn: number, yn: number): [number, number] {
  const px = PAD_X + xn * (W - 2 * PAD_X);
  const py = H - PAD_BOTTOM - yn * (H - PAD_TOP - PAD_BOTTOM);
  return [px, py];
}

function projectCoord(p: Project): [number, number] {
  return p.isKey ? toSvg(p.x) : toSvgPoint(p.x, p.y);
}

function segmentPath(a: number, b: number, samples = 80): string {
  const pts: [number, number][] = [];
  for (let i = 0; i <= samples; i++) {
    pts.push(toSvg(a + (b - a) * (i / samples)));
  }
  return (
    `M ${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)} ` +
    pts
      .slice(1)
      .map(([x, y]) => `L ${x.toFixed(2)} ${y.toFixed(2)}`)
      .join(" ")
  );
}

const TIER_SEGMENTS: Record<TierKey, string> = {
  foundation: segmentPath(0, 0.33),
  near: segmentPath(0.33, 0.66),
  frontier: segmentPath(0.66, 1),
};

const CURVE_DRAW_STAGGER = 0.45;
const CURVE_DRAW_DURATION = 0.7;
const TOTAL_DRAW_TIME =
  CURVE_DRAW_STAGGER * (TIERS.length - 1) + CURVE_DRAW_DURATION + 0.2;

export default function Roadmap() {
  const reduce = useReducedMotion();
  const [activeKey, setActiveKey] = useState<TierKey>("foundation");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [drawDone, setDrawDone] = useState(false);

  useEffect(() => {
    if (reduce) return;
    if (!inView || drawDone) return;
    const t = window.setTimeout(
      () => setDrawDone(true),
      TOTAL_DRAW_TIME * 1000,
    );
    return () => window.clearTimeout(t);
  }, [inView, drawDone, reduce]);

  const hasDrawn = reduce ? true : drawDone;

  const hoveredProject = hoveredId
    ? (PROJECTS.find((p) => p.id === hoveredId) ?? null)
    : null;
  const hoveredTier = hoveredProject
    ? (TIERS.find((t) => t.key === hoveredProject.tierKey) ?? null)
    : null;

  return (
    <section
      id="roadmap"
      ref={sectionRef}
      className="border-t border-rule scroll-mt-24"
    >
      <div className="container-page py-24 sm:py-32">
        {/* Header */}
        <div className="mb-16 grid gap-y-8 md:grid-cols-12 md:gap-x-12">
          <div className="md:col-span-5">
            <p
              className="mb-5 font-mono text-[0.7rem] uppercase text-ink-soft"
              style={{ letterSpacing: "0.24em" }}
            >
              {"// 03 / Roadmap"}
            </p>
            <h2
              className="text-ink"
              style={{
                fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.03em",
                fontWeight: 600,
              }}
            >
              How the work compounds.
            </h2>
          </div>
          <div className="measure text-ink-soft md:col-span-6 md:col-start-7">
            <p>
              Three phases of impact, each enabling the next. This is a
              vision, not a commitment. Projects only happen when people
              decide to build them.
            </p>
          </div>
        </div>

        {/* 2-column layout */}
        <div className="grid gap-y-12 md:grid-cols-12 md:gap-x-12">
          {/* LEFT: vertically stacked phase selector */}
          <div className="flex flex-col md:col-span-4">
            {TIERS.map((t) => {
              const isActive = t.key === activeKey;
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setActiveKey(t.key)}
                  onMouseEnter={() => setActiveKey(t.key)}
                  aria-pressed={isActive}
                  className={`relative w-full border-l-2 py-6 pl-6 pr-2 text-left transition-colors duration-300 ${
                    isActive
                      ? "border-accent"
                      : "border-rule hover:border-rule-strong"
                  }`}
                >
                  <p
                    className={`font-mono text-[0.7rem] uppercase transition-colors duration-300 ${
                      isActive ? "text-accent" : "text-ink-mute"
                    }`}
                    style={{ letterSpacing: "0.24em" }}
                  >
                    {t.index} / {t.name}
                    <span className="ml-2 text-ink-mute">· {t.subtitle}</span>
                  </p>
                  <h3
                    className={`mt-3 font-medium transition-colors duration-300 ${
                      isActive ? "text-ink" : "text-ink-soft"
                    }`}
                    style={{
                      fontSize: "1.35rem",
                      lineHeight: 1.15,
                      letterSpacing: "-0.015em",
                    }}
                  >
                    {t.headline}
                  </h3>
                  <p
                    className={`mt-3 text-sm transition-colors duration-300 ${
                      isActive ? "text-ink-soft" : "text-ink-mute"
                    }`}
                  >
                    {t.blurb}
                  </p>
                </button>
              );
            })}
          </div>

          {/* RIGHT: animated chart */}
          <div className="md:col-span-7 md:col-start-6">
            <div
              className="relative"
              onMouseLeave={() => setHoveredId(null)}
            >
              <svg
                viewBox={`0 0 ${W} ${H}`}
                role="img"
                aria-label="Exponential curve across three vision phases. Hover a point on the curve to see what we imagine building there."
                className="block h-auto w-full"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <linearGradient
                    id="ph-base"
                    x1="0%"
                    x2="100%"
                    y1="0%"
                    y2="0%"
                  >
                    <stop
                      offset="0%"
                      stopColor="var(--accent)"
                      stopOpacity="0.14"
                    />
                    <stop
                      offset="100%"
                      stopColor="var(--accent)"
                      stopOpacity="0.28"
                    />
                  </linearGradient>
                  <linearGradient
                    id="ph-bright"
                    x1="0%"
                    x2="100%"
                    y1="0%"
                    y2="0%"
                  >
                    <stop
                      offset="0%"
                      stopColor="var(--accent)"
                      stopOpacity="0.55"
                    />
                    <stop
                      offset="100%"
                      stopColor="var(--accent)"
                      stopOpacity="1"
                    />
                  </linearGradient>
                  <filter
                    id="ph-soft-glow"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Faint horizontal reference grid */}
                {[0.25, 0.5, 0.75].map((g) => {
                  const py =
                    H - PAD_BOTTOM - g * (H - PAD_TOP - PAD_BOTTOM);
                  return (
                    <line
                      key={g}
                      x1={PAD_X}
                      x2={W - PAD_X}
                      y1={py}
                      y2={py}
                      stroke="var(--rule)"
                      strokeWidth="1"
                      strokeDasharray="1 8"
                    />
                  );
                })}

                {/* Tier dividers */}
                {TIERS.slice(1).map((t) => {
                  const x = PAD_X + t.start * (W - 2 * PAD_X);
                  return (
                    <line
                      key={`div-${t.key}`}
                      x1={x}
                      x2={x}
                      y1={PAD_TOP - 18}
                      y2={H - PAD_BOTTOM + 16}
                      stroke="var(--rule)"
                      strokeWidth="1"
                      strokeDasharray="2 8"
                    />
                  );
                })}

                {/* Tier numeric markers */}
                {TIERS.map((t) => {
                  const cx =
                    ((t.start + t.end) / 2) * (W - 2 * PAD_X) + PAD_X;
                  const isActive = t.key === activeKey;
                  return (
                    <motion.text
                      key={`num-${t.key}`}
                      x={cx}
                      y={32}
                      textAnchor="middle"
                      initial={false}
                      animate={{ opacity: isActive ? 1 : 0.4 }}
                      transition={{ duration: 0.3 }}
                      className={isActive ? "fill-accent" : "fill-ink-mute"}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        letterSpacing: "0.24em",
                        textTransform: "uppercase",
                      }}
                    >
                      {t.index}
                    </motion.text>
                  );
                })}

                {/* Active column tint */}
                {TIERS.map((t) => {
                  const x1 = PAD_X + t.start * (W - 2 * PAD_X);
                  const x2 = PAD_X + t.end * (W - 2 * PAD_X);
                  const isActive = t.key === activeKey;
                  return (
                    <motion.rect
                      key={`tint-${t.key}`}
                      x={x1}
                      y={PAD_TOP - 18}
                      width={x2 - x1}
                      height={H - PAD_TOP - PAD_BOTTOM + 32}
                      fill="var(--accent)"
                      initial={false}
                      animate={{ opacity: isActive ? 0.04 : 0 }}
                      transition={{
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  );
                })}

                {/* Y-axis label */}
                <text
                  x={28}
                  y={H / 2}
                  textAnchor="middle"
                  transform={`rotate(-90, 28, ${H / 2})`}
                  className="fill-ink-mute"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                  }}
                >
                  Humanitarian impact →
                </text>

                {/* X-axis baseline */}
                <line
                  x1={PAD_X}
                  x2={W - PAD_X}
                  y1={H - PAD_BOTTOM}
                  y2={H - PAD_BOTTOM}
                  stroke="var(--rule)"
                  strokeWidth="1"
                />

                {/* Active tier baseline underline */}
                {TIERS.map((t) => {
                  const x1 = PAD_X + t.start * (W - 2 * PAD_X);
                  const x2 = PAD_X + t.end * (W - 2 * PAD_X);
                  const isActive = t.key === activeKey;
                  return (
                    <motion.line
                      key={`underline-${t.key}`}
                      x1={x1}
                      x2={x2}
                      y1={H - PAD_BOTTOM}
                      y2={H - PAD_BOTTOM}
                      stroke="var(--accent)"
                      strokeWidth="2"
                      initial={false}
                      animate={{ opacity: isActive ? 1 : 0 }}
                      transition={{ duration: 0.35 }}
                    />
                  );
                })}

                {/* Curve segments per tier */}
                {TIERS.map((t, i) => {
                  const isActive = t.key === activeKey;
                  const drawDelay = hasDrawn
                    ? 0
                    : 0.15 + i * CURVE_DRAW_STAGGER;
                  return (
                    <g key={`curve-${t.key}`}>
                      <motion.path
                        d={TIER_SEGMENTS[t.key]}
                        fill="none"
                        stroke="url(#ph-base)"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        initial={reduce ? false : { pathLength: 0 }}
                        animate={
                          reduce
                            ? undefined
                            : inView
                              ? { pathLength: 1 }
                              : { pathLength: 0 }
                        }
                        transition={
                          reduce
                            ? undefined
                            : {
                                duration: CURVE_DRAW_DURATION,
                                ease: [0.22, 1, 0.36, 1],
                                delay: drawDelay,
                              }
                        }
                      />
                      <motion.path
                        d={TIER_SEGMENTS[t.key]}
                        fill="none"
                        stroke="url(#ph-bright)"
                        strokeWidth="2.75"
                        strokeLinecap="round"
                        filter="url(#ph-soft-glow)"
                        initial={
                          reduce ? false : { pathLength: 0, opacity: 0 }
                        }
                        animate={
                          reduce
                            ? { pathLength: 1, opacity: isActive ? 1 : 0 }
                            : inView
                              ? {
                                  pathLength: 1,
                                  opacity: isActive ? 1 : 0,
                                }
                              : { pathLength: 0, opacity: 0 }
                        }
                        transition={
                          reduce
                            ? { duration: 0 }
                            : {
                                pathLength: {
                                  duration: CURVE_DRAW_DURATION,
                                  ease: [0.22, 1, 0.36, 1],
                                  delay: drawDelay,
                                },
                                opacity: {
                                  duration: 0.4,
                                  ease: [0.22, 1, 0.36, 1],
                                  delay: hasDrawn ? 0 : drawDelay + 0.2,
                                },
                              }
                        }
                      />
                    </g>
                  );
                })}

                {/* Atmospheric possibility dots — rendered first so the
                    key dots sit on top of them visually. */}
                {PROJECTS.filter((p) => !p.isKey).map((p, i) => {
                  const [cx, cy] = projectCoord(p);
                  const isHovered = hoveredId === p.id;
                  const isInActiveTier = activeKey === p.tierKey;
                  const baseOpacity = isInActiveTier ? 0.6 : 0.2;
                  return (
                    <motion.g
                      key={p.id}
                      initial={reduce ? false : { opacity: 0 }}
                      animate={
                        inView
                          ? { opacity: isHovered ? 1 : baseOpacity }
                          : { opacity: 0 }
                      }
                      transition={{
                        duration: 0.3,
                        delay: hasDrawn
                          ? 0
                          : TOTAL_DRAW_TIME * 0.7 + i * 0.04,
                      }}
                      onMouseEnter={() => {
                        setHoveredId(p.id);
                        setActiveKey(p.tierKey);
                      }}
                      onClick={() => {
                        setHoveredId(p.id);
                        setActiveKey(p.tierKey);
                      }}
                      onFocus={() => {
                        setHoveredId(p.id);
                        setActiveKey(p.tierKey);
                      }}
                      tabIndex={0}
                      role="button"
                      aria-label={`${p.title}. Possibility in ${TIERS.find((tt) => tt.key === p.tierKey)?.name}. View details.`}
                      className="cursor-pointer"
                      style={{ outline: "none" }}
                    >
                      <circle
                        cx={cx}
                        cy={cy}
                        r="20"
                        fill="transparent"
                      />
                      {isHovered ? (
                        <circle
                          cx={cx}
                          cy={cy}
                          r="14"
                          fill="var(--accent)"
                          fillOpacity="0.1"
                        />
                      ) : null}
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isHovered ? 4 : 2.6}
                        fill={isHovered ? "var(--accent)" : "transparent"}
                        stroke="var(--accent)"
                        strokeWidth={isHovered ? 0 : 1}
                        filter={
                          isHovered ? "url(#ph-soft-glow)" : undefined
                        }
                      />
                    </motion.g>
                  );
                })}

                {/* Key compound-effect dots that sit on the curve. */}
                {PROJECTS.filter((p) => p.isKey).map((p, i) => {
                  const [cx, cy] = projectCoord(p);
                  const isHovered = hoveredId === p.id;
                  const isInActiveTier = activeKey === p.tierKey;
                  const baseOpacity = isInActiveTier ? 1 : 0.5;
                  return (
                    <motion.g
                      key={p.id}
                      initial={
                        reduce ? false : { opacity: 0, scale: 0.5 }
                      }
                      animate={
                        inView
                          ? {
                              opacity: isHovered ? 1 : baseOpacity,
                              scale: 1,
                            }
                          : { opacity: 0, scale: 0.5 }
                      }
                      transition={{
                        opacity: { duration: 0.3 },
                        scale: {
                          duration: 0.45,
                          delay: hasDrawn
                            ? 0
                            : TOTAL_DRAW_TIME * 0.9 + i * 0.08,
                          ease: [0.22, 1, 0.36, 1],
                        },
                      }}
                      onMouseEnter={() => {
                        setHoveredId(p.id);
                        setActiveKey(p.tierKey);
                      }}
                      onClick={() => {
                        setHoveredId(p.id);
                        setActiveKey(p.tierKey);
                      }}
                      onFocus={() => {
                        setHoveredId(p.id);
                        setActiveKey(p.tierKey);
                      }}
                      tabIndex={0}
                      role="button"
                      aria-label={`${p.title}. Key compound point in ${TIERS.find((tt) => tt.key === p.tierKey)?.name}. View details.`}
                      className="cursor-pointer"
                      style={{
                        outline: "none",
                        transformOrigin: `${cx}px ${cy}px`,
                      }}
                    >
                      <circle
                        cx={cx}
                        cy={cy}
                        r="24"
                        fill="transparent"
                      />
                      {isHovered ? (
                        <>
                          <circle
                            cx={cx}
                            cy={cy}
                            r="22"
                            fill="var(--accent)"
                            fillOpacity="0.12"
                          />
                          <circle
                            cx={cx}
                            cy={cy}
                            r="14"
                            fill="none"
                            stroke="var(--accent)"
                            strokeOpacity="0.45"
                            strokeWidth="1"
                          />
                        </>
                      ) : null}
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isHovered ? 7 : 5}
                        fill="var(--accent)"
                        filter="url(#ph-soft-glow)"
                      />
                    </motion.g>
                  );
                })}
              </svg>

              {/* Hover tooltip overlay */}
              <AnimatePresence>
                {hoveredProject && hoveredTier
                  ? (() => {
                      const [cx, cy] = projectCoord(hoveredProject);
                      const placeAbove = cy > H * 0.35;
                      const leftPct = (cx / W) * 100;
                      const clampedLeft = Math.max(
                        24,
                        Math.min(76, leftPct),
                      );
                      return (
                        <motion.div
                          key={hoveredProject.id}
                          className="pointer-events-none absolute z-10 w-72 max-w-[78vw]"
                          style={{
                            left: `${clampedLeft}%`,
                            top: `${(cy / H) * 100}%`,
                            transform: placeAbove
                              ? "translate(-50%, calc(-100% - 18px))"
                              : "translate(-50%, 18px)",
                          }}
                          initial={{
                            opacity: 0,
                            y: placeAbove ? 6 : -6,
                          }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: placeAbove ? 6 : -6 }}
                          transition={{
                            duration: 0.2,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          <div className="border-t-2 border-accent bg-bg-2/95 px-5 py-4 backdrop-blur-sm">
                            <p
                              className="font-mono text-[0.6rem] uppercase text-ink-mute"
                              style={{ letterSpacing: "0.22em" }}
                            >
                              {hoveredTier.index} / {hoveredTier.name}
                              <span className="ml-2">· {hoveredTier.subtitle}</span>
                            </p>
                            <h4
                              className="mt-2 text-lg font-medium text-ink"
                              style={{ letterSpacing: "-0.015em" }}
                            >
                              {hoveredProject.title}
                            </h4>
                            <p className="mt-2 text-xs leading-relaxed text-ink-soft">
                              {hoveredProject.description}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })()
                  : null}
              </AnimatePresence>

            </div>
          </div>
        </div>

        {/* Community note */}
        <div className="mt-16 max-w-3xl">
          <p
            className="font-mono text-[0.7rem] uppercase text-ink-mute"
            style={{ letterSpacing: "0.22em" }}
          >
            {"// Vision, not mandate"}
          </p>
          <p className="mt-2 text-sm text-ink-soft">
            Projects on this curve are how we see the work compounding.
            None of it is committed. Anyone can start working on what they
            care about, wherever it sits on the curve. The community votes
            on what becomes real.
          </p>
        </div>
      </div>
    </section>
  );
}
