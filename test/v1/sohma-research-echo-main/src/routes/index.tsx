import { createFileRoute } from "@tanstack/react-router";
import { AtmosphereLayer } from "@/components/sohma/AtmosphereLayer";
import { Nav } from "@/components/sohma/Nav";
import { Hero, Thesis, Pillars, Capability, Governance, Vision, Footer } from "@/components/sohma/sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SOHMA. Behavioral intelligence layer for AI." },
      { name: "description", content: "SOHMA helps digital systems understand how people experience them, and adapt safely, ethically, and intelligently in real time. Signal, not decision. On-device. Auditable end to end." },
      { property: "og:title", content: "SOHMA. Behavioral intelligence layer for AI." },
      { property: "og:description", content: "Signal, not decision. On-device. Auditable end to end. The emotional intelligence infrastructure for the next generation of AI." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <AtmosphereLayer />
      <div className="relative z-10">
        <Nav />
        <main>
          <Hero />
          <Thesis />
          <Pillars />
          <Capability />
          <Governance />
          <Vision />
        </main>
        <Footer />
      </div>
    </div>
  );
}
