import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="container-page flex flex-col gap-4 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/project-humanity.png"
            alt=""
            width={31}
            height={29}
            className="opacity-90"
            style={{ width: "31px", height: "29px" }}
          />
          <span
            className="font-mono text-[0.65rem] uppercase text-ink-soft"
            style={{ letterSpacing: "0.22em" }}
          >
            Project Humanity
          </span>
        </div>
        <p
          className="font-mono text-[0.65rem] uppercase text-ink-mute"
          style={{ letterSpacing: "0.22em" }}
        >
          Open source, always.
        </p>
      </div>
    </footer>
  );
}
