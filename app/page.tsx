import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Section from "@/components/Section";
import DomainShowcase from "@/components/DomainShowcase";
import Roadmap from "@/components/Roadmap";
import WontDo from "@/components/WontDo";
import HowItWorks from "@/components/HowItWorks";
import Quiet from "@/components/Quiet";
import JoinCards from "@/components/JoinCards";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <Marquee />

        <Section heading="What this is" kicker="// 01 / Manifesto">
          <p>
            Project Humanity is an{" "}
            <strong className="font-medium text-ink">
              open source community
            </strong>{" "}
            with one mission. We want to push the horizons of humanity forward,
            and to help people live their best lives{" "}
            <em className="text-ink">in this lifetime</em> instead of dreaming
            about existing in another one.
          </p>
          <p>
            The idea is pretty simple. The future arrives faster when humans
            build things together, out in the open. A lot of the tools that
            could genuinely change someone&apos;s life are sitting{" "}
            <strong className="font-medium text-ink">behind a paywall</strong>.
            A lot of the people who could build them don&apos;t think
            they&apos;re allowed to. We want to close that gap.
          </p>
        </Section>

        <DomainShowcase />
        <Roadmap />

        <Section heading="Who we want here" kicker="// 04 / Who">
          <p>
            All of you.{" "}
            <strong className="font-medium text-ink">Students</strong>,{" "}
            <strong className="font-medium text-ink">teachers</strong>,{" "}
            <strong className="font-medium text-ink">developers</strong>,{" "}
            <strong className="font-medium text-ink">designers</strong>,{" "}
            <strong className="font-medium text-ink">researchers</strong>, and
            people who just like tinkering with stuff. Whatever your field is,
            whatever your experience level is, whatever your goals are, you are
            welcome.
          </p>
          <p>
            You don&apos;t need a resume. You don&apos;t need an interview. You
            don&apos;t need permission.{" "}
            <em className="text-ink">
              Just show up, find something that interests you, and get started.
            </em>
          </p>
        </Section>

        <WontDo />
        <HowItWorks />
        <Quiet />
        <JoinCards />
      </main>
      <Footer />
    </>
  );
}
