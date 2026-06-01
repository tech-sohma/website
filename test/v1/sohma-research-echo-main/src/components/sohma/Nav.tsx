import { useEffect, useState } from "react";
import multiverseLogo from "@/assets/multiverse-logo.png";
import innovateukLogo from "@/assets/innovateuk-logo.png";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrolled(window.scrollY > 30));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);
  return (
    <header
      className="fixed inset-x-0 top-0 z-40 transition-all duration-700"
      style={{
        backdropFilter: scrolled ? "blur(14px) saturate(120%)" : "blur(0px)",
        backgroundColor: scrolled ? "oklch(0.12 0.02 252 / 0.55)" : "transparent",
        borderBottom: `1px solid ${scrolled ? "var(--hairline)" : "transparent"}`,
      }}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-8 py-6 md:px-14">
        <a href="#top" className="flex items-center gap-3">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--signal)] breathe" />
          <span className="font-serif text-xl tracking-tight">SOHMA</span>
        </a>
        <nav className="hidden gap-10 text-[12px] uppercase tracking-[0.22em] text-dim lg:flex">
          <a href="#layer" className="transition-colors hover:text-ivory">The Layer</a>
          <a href="#pillars" className="transition-colors hover:text-ivory">How it works</a>
          <a href="#governance" className="transition-colors hover:text-ivory">Governance</a>
        </nav>
        <div className="flex items-center gap-6 md:gap-10">
          <a href="https://www.linkedin.com/company/sohma-ai/posts/?feedView=all" target="_blank" rel="noreferrer" className="hidden font-mono text-[11px] uppercase tracking-[0.22em] text-dim transition-colors hover:text-ivory md:block">
            LinkedIn
          </a>
          <a href="#contact" className="font-mono text-[11px] uppercase tracking-[0.22em] text-dim transition-colors hover:text-signal">
            Contact →
          </a>
        </div>
      </div>
    </header>
  );
}
