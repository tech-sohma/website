import { Reveal } from "./Reveal";
import { SignalField } from "./SignalField";
import { SignalScope } from "./SignalScope";

import multiverseLogo from "@/assets/multiverse-logo.png";
import innovateukLogo from "@/assets/innovateuk-logo.png";

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center px-8 pt-32 md:px-14 md:pt-0">
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="grid grid-cols-12 items-center gap-10 lg:gap-16">
          <div className="col-span-12 lg:col-span-7">

            <Reveal delay={150}>
              <h1 className="font-serif text-[clamp(2.0rem,4.5vw,4.5rem)] leading-[1.02] tracking-[-0.015em] text-ivory">
                The emotional intelligence<br />
                infrastructure for the<br />
                <span className="italic text-signal">next generation</span> of AI.
              </h1>
            </Reveal>
            <Reveal delay={400}>
              <p className="mt-10 max-w-xl text-base leading-relaxed text-dim md:text-lg">
                SOHMA helps digital systems understand how people experience them, and adapt
                safely, ethically, and intelligently in real time. Signal, not decision. On-device.
                Auditable end to end.
              </p>
            </Reveal>
            <Reveal delay={600}>
              <div className="mt-12 flex flex-wrap items-center gap-8">
                <a href="#layer" className="group inline-flex items-center gap-3 text-sm text-ivory">
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-dim transition-colors group-hover:text-signal">
                    See how the layer works
                  </span>
                  <span className="h-px w-12 bg-[var(--signal)] transition-all duration-500 group-hover:w-20" />
                </a>
                <a href="#contact" className="font-mono text-[11px] uppercase tracking-[0.22em] text-dim transition-colors hover:text-ivory">
                  Talk to the team →
                </a>
              </div>
            </Reveal>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <Reveal delay={300}>
              <SignalScope />
            </Reveal>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-6 mx-auto flex max-w-[1400px] items-end justify-end px-8 md:px-14">
        <span className="mono-caption">v1 · 2026</span>
      </div>
    </section>
  );
}


export function Thesis() {
  return (
    <section id="layer" className="relative px-8 py-40 md:px-14 md:py-56">
      <div className="veil pointer-events-none absolute inset-x-0 top-0 h-40" />
      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-3">
          <Reveal><span className="mono-caption">01 / The Layer</span></Reveal>
        </div>
        <div className="col-span-12 md:col-span-8 md:col-start-5">
          <Reveal>
            <p className="font-serif text-[clamp(1.6rem,3vw,2.6rem)] leading-[1.25] tracking-[-0.01em] text-ivory">
              AI systems adapt in real time. But they're flying blind. They have no live
              understanding of how the person using them actually feels. SOHMA closes that gap
              <span className="italic text-signal"> safely, transparently,</span> and within
              governance boundaries the operator defines.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-12 grid grid-cols-2 gap-x-10 gap-y-6 border-t border-[var(--hairline)] pt-8 md:grid-cols-4">
              {[
                ["Signal", "Detected from interaction patterns"],
                ["Governance", "Rules defined by the operator"],
                ["On-device", "No camera. No microphone. No cloud."],
                ["Auditable", "Every adaptive action logged"],
              ].map(([t, d]) => (
                <div key={t}>
                  <div className="font-serif text-lg text-ivory">{t}</div>
                  <div className="mt-2 text-[13px] leading-relaxed text-dim">{d}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const PILLARS = [
  {
    n: "01",
    label: "Real-time signal, not retrospective data",
    body: "SOHMA detects emotional state as it develops, not after the quit event fires or the session ends. Studios and platforms can act during the interaction, not after it.",
  },
  {
    n: "02",
    label: "Signal, not decision",
    body: "Developer and platform control is non-negotiable. SOHMA provides the intelligence. The operator defines the rules. Nothing adapts without explicit thresholds the team sets.",
  },
  {
    n: "03",
    label: "On-device and auditable",
    body: "No camera. No microphone. No cloud dependency. Every adaptive action is logged: what changed, why, and when. Full explainability isn't an optional feature. It's the product.",
  },
  {
    n: "04",
    label: "Productive struggle is not the enemy",
    body: "SOHMA distinguishes frustration that leads to mastery from frustration that leads to quitting, disengagement, or harm. You keep the experience you designed. SOHMA helps you manage the edge.",
  },
];

export function Pillars() {
  return (
    <section id="pillars" className="relative bg-deep px-8 py-32 md:px-14 md:py-44">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="mb-20 flex flex-wrap items-end justify-between gap-6 border-b border-[var(--hairline)] pb-8">
            <div>
              <span className="mono-caption">02 / How it works</span>
              <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3.6rem)] leading-[1.05] tracking-[-0.015em]">
                Four commitments,<br />held in every release.
              </h2>
            </div>
          </div>
        </Reveal>

        <div className="divide-y divide-[var(--hairline)]">
          {PILLARS.map((e, i) => (
            <Reveal key={e.n} delay={i * 120}>
              <article className="grid grid-cols-12 gap-6 py-12 md:py-16">
                <div className="col-span-12 md:col-span-2">
                  <div className="font-mono text-xs tracking-[0.2em] text-dim">{e.n}</div>
                </div>
                <div className="col-span-12 md:col-span-4">
                  <h3 className="font-serif text-2xl leading-tight text-ivory md:text-3xl">{e.label}</h3>
                </div>
                <div className="col-span-12 md:col-span-6">
                  <p className="text-[15px] leading-relaxed text-dim">{e.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Capability() {
  return (
    <section className="relative px-8 py-40 md:px-14 md:py-56">
      <div className="veil pointer-events-none absolute inset-x-0 top-0 h-40" />
      <div className="mx-auto grid max-w-[1400px] grid-cols-12 items-center gap-12">
        <div className="col-span-12 md:col-span-6">
          <Reveal>
            <span className="mono-caption">03 / The signal layer</span>
            <h2 className="mt-6 font-serif text-[clamp(2rem,4vw,3.4rem)] leading-[1.08] tracking-[-0.015em]">
              You can see when people quit.<br />
              <span className="italic text-signal">SOHMA shows what happened</span> before they did.
            </h2>
            <p className="mt-8 max-w-md text-[15px] leading-relaxed text-dim">
              We read process signals such as hesitation, retry loops, input timing, and
              correction patterns, and output categorical emotional state with full explainability.
              No biometric data. No self-report. Observable, on-device, auditable.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-[var(--hairline)] pt-8">
              {[
                ["Hesitation", "Input timing variance"],
                ["Retry", "Loop and correction patterns"],
                ["State", "Stress · Engagement · Calm"],
              ].map(([v, l]) => (
                <div key={v}>
                  <div className="font-serif text-xl text-ivory">{v}</div>
                  <div className="mono-caption mt-2">{l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        <div className="col-span-12 md:col-span-6">
          <Reveal delay={200}>
            <SignalField />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Partners() {
  return (
    <section className="relative border-y border-[var(--hairline)] bg-deep px-8 py-16 md:px-14 md:py-20">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="mb-10 flex items-center gap-4">
            <span className="h-px w-8 bg-[var(--signal)] opacity-40" />
            <span className="mono-caption">Supported by</span>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <div className="flex flex-wrap items-center justify-start gap-x-16 gap-y-8 md:gap-x-32">
            <img
              src={multiverseLogo}
              alt="Multiverse Computing"
              className="h-24 opacity-50 grayscale transition-all duration-500 hover:opacity-80 hover:grayscale-0 md:h-40"
              loading="lazy"
            />
            <img
              src={innovateukLogo}
              alt="Innovate UK"
              className="h-24 opacity-50 grayscale transition-all duration-500 hover:opacity-80 hover:grayscale-0 md:h-40"
              loading="lazy"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const VALUES = [
  ["Emotion with integrity", "We design to understand and protect emotional signals, never to exploit them. Consent and care are non-negotiable."],
  ["Human-centric", "Technology adapts to people, not the other way around. Human experience is the starting point of every decision."],
  ["Ethical by design", "Safety, safeguarding, and transparency are built in from the ground up, not added later."],
  ["Transparent by nature", "We explain what the technology does, what data it uses, and what it infers."],
  ["Collaboration as a catalyst", "We grow through shared intelligence with partners who care about responsible innovation."],
  ["Inclusive at heart", "We design and test with diverse communities to reduce bias across real-world contexts."],
];

export function Governance() {
  return (
    <section id="governance" className="relative px-8 py-40 md:px-14 md:py-56">
      <div className="veil pointer-events-none absolute inset-x-0 top-0 h-40" />
      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-3">
          <Reveal><span className="mono-caption">04 / Governance and values</span></Reveal>
        </div>
        <div className="col-span-12 md:col-span-8 md:col-start-5">
          <Reveal>
            <h2 className="font-serif text-[clamp(1.8rem,3.4vw,3rem)] leading-[1.15] tracking-[-0.01em] text-ivory">
              We treat emotional inference<br />as critical infrastructure.
            </h2>
            <p className="mt-10 max-w-2xl text-[15px] leading-relaxed text-dim">
              A system that can read interior state can also misread it. SOHMA's governance is
              architectural: developer-defined thresholds, no autonomous override, full audit
              trail. Independent observation precedes capability. Where the two diverge,
              capability waits.
            </p>
            <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
              {VALUES.map(([t, d], i) => (
                <div key={t} className="border-t border-[var(--hairline)] pt-5">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[11px] tracking-[0.2em] text-dim">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="font-serif text-xl text-ivory">{t}</h3>
                  </div>
                  <p className="mt-3 pl-9 text-[14px] leading-relaxed text-dim">{d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Vision() {
  return (
    <section id="vision" className="relative bg-void px-8 py-48 md:px-14 md:py-64">
      <div className="horizon-glow pointer-events-none absolute inset-x-0 bottom-0 h-[60vh]" />
      <div className="relative mx-auto max-w-[1400px]">
        <Reveal>
          <span className="mono-caption">Long horizon</span>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-10 max-w-5xl font-serif text-[clamp(2rem,5vw,4.5rem)] leading-[1.06] tracking-[-0.015em] text-ivory">
            We're building the <span className="italic text-signal">emotional operating system</span>
            {" "}for AI. A universal layer that allows machines to understand and respond to
            human emotion across games, education, health, and robotics.
          </p>
        </Reveal>
        <Reveal delay={500}>
          <div id="contact" className="mt-20 flex flex-wrap items-end justify-between gap-6 border-t border-[var(--hairline)] pt-8">
            <span className="mono-caption">Talk to the team</span>
            <span className="mono-caption">Building quietly · since 2026</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--hairline)] px-8 py-12 md:px-14">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--signal)] breathe" />
          <span className="font-serif text-lg">SOHMA</span>
          <span className="mono-caption ml-4 hidden md:inline">Behavioral intelligence and governance layer</span>
        </div>
        <div className="flex flex-wrap items-center gap-8">
          <a href="https://www.linkedin.com/company/sohma-ai/posts/?feedView=all" target="_blank" rel="noreferrer" className="mono-caption transition-colors hover:text-ivory">LinkedIn</a>
          <span className="mono-caption">© 2026 SOHMA AI</span>
        </div>
      </div>
    </footer>
  );
}
