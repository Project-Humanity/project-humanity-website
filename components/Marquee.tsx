const ITEMS = [
  "Built openly",
  "No paywalls",
  "No gatekeeping",
  "No résumés",
  "Built for keeps",
  "By us, for us",
];

function Sequence({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      className="flex shrink-0 items-center"
      aria-hidden={hidden || undefined}
    >
      {ITEMS.map((item) => (
        <li key={item} className="flex items-center">
          <span
            className="px-8 font-mono text-xs uppercase text-ink"
            style={{ letterSpacing: "0.24em" }}
          >
            {item}
          </span>
          <span
            aria-hidden="true"
            className="font-mono text-xs text-ink-mute"
            style={{ letterSpacing: "0.24em" }}
          >
            {"//"}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function Marquee() {
  return (
    <section
      className="marquee overflow-hidden border-y border-rule bg-bg-2 py-4"
      aria-label="Built openly. No paywalls. No gatekeeping. No résumés. Built for keeps. By us, for us."
    >
      <div className="marquee-track">
        <Sequence />
        <Sequence hidden />
      </div>
    </section>
  );
}
