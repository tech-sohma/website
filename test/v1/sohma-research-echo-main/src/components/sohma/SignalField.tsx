import { useEffect, useRef, useState } from "react";

type Zone = "calm" | "engaged" | "stress";

type Dot = {
  zone: Zone;
  // base anchor in 0..1 space
  ax: number;
  ay: number;
  // drift parameters
  fx: number;
  fy: number;
  px: number;
  py: number;
  r: number;
};

const ZONES: { key: Zone; label: string; cx: number; cy: number; desc: string }[] = [
  { key: "calm", label: "Calm", cx: 0.22, cy: 0.78, desc: "Steady cadence, low retry density. The person is in flow." },
  { key: "engaged", label: "Engaged", cx: 0.52, cy: 0.42, desc: "Active problem-solving. Productive struggle, not distress." },
  { key: "stress", label: "Stress", cx: 0.82, cy: 0.22, desc: "Hesitation rising, retries clustering. A moment to act with care." },
];

function rand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function buildDots(): Dot[] {
  const r = rand(7);
  const dots: Dot[] = [];
  for (const z of ZONES) {
    const count = z.key === "engaged" ? 36 : 24;
    for (let i = 0; i < count; i++) {
      const spread = z.key === "stress" ? 0.12 : 0.14;
      const angle = r() * Math.PI * 2;
      const dist = Math.pow(r(), 0.7) * spread;
      dots.push({
        zone: z.key,
        ax: z.cx + Math.cos(angle) * dist,
        ay: z.cy + Math.sin(angle) * dist,
        fx: 0.15 + r() * 0.4,
        fy: 0.15 + r() * 0.4,
        px: r() * Math.PI * 2,
        py: r() * Math.PI * 2,
        r: 1.1 + r() * 1.2,
      });
    }
  }
  return dots;
}

export function SignalField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hovered, setHovered] = useState<Zone | null>(null);
  const hoveredRef = useRef<Zone | null>(null);
  const [readout, setReadout] = useState({ state: "Engaged", sigma: "0.0024", delta: "41" });
  const dotsRef = useRef<Dot[]>(buildDots());

  useEffect(() => { hoveredRef.current = hovered; }, [hovered]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const signalColor = getComputedStyle(document.documentElement).getPropertyValue("--signal").trim() || "oklch(0.84 0.055 78)";
    const dim = getComputedStyle(document.documentElement).getPropertyValue("--muted-foreground").trim() || "oklch(0.66 0.012 70)";

    const trail: { x: number; y: number }[] = [];
    let raf = 0;
    let last = 0;
    let t = 0;
    let hidden = false;
    const onVis = () => { hidden = document.hidden; };
    document.addEventListener("visibilitychange", onVis);

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (hidden) return;
      const dt = Math.min(60, now - last) / 1000;
      last = now;
      if (!reduce) t += dt * 0.35;

      const w = canvas.width;
      const h = canvas.height;
      const pad = 28 * dpr;
      const fw = w - pad * 2;
      const fh = h - pad * 2;
      ctx.clearRect(0, 0, w, h);

      // frame
      ctx.strokeStyle = `color-mix(in oklch, ${dim} 22%, transparent)`;
      ctx.lineWidth = dpr;
      ctx.strokeRect(pad, pad, fw, fh);

      // grid ticks
      for (let i = 1; i < 8; i++) {
        const x = pad + (fw / 8) * i;
        ctx.beginPath();
        ctx.moveTo(x, pad);
        ctx.lineTo(x, pad + 4 * dpr);
        ctx.moveTo(x, pad + fh);
        ctx.lineTo(x, pad + fh - 4 * dpr);
        ctx.stroke();
        const y = pad + (fh / 8) * i;
        ctx.beginPath();
        ctx.moveTo(pad, y);
        ctx.lineTo(pad + 4 * dpr, y);
        ctx.moveTo(pad + fw, y);
        ctx.lineTo(pad + fw - 4 * dpr, y);
        ctx.stroke();
      }

      // dots
      const hov = hoveredRef.current;
      for (const d of dotsRef.current) {
        const dx = Math.sin(t * d.fx + d.px) * 0.015;
        const dy = Math.cos(t * d.fy + d.py) * 0.015;
        const x = pad + (d.ax + dx) * fw;
        const y = pad + (d.ay + dy) * fh;
        const active = hov === null || hov === d.zone;
        const alpha = active ? 0.55 : 0.12;
        ctx.fillStyle = `color-mix(in oklch, ${signalColor} ${Math.round(alpha * 100)}%, transparent)`;
        ctx.beginPath();
        ctx.arc(x, y, d.r * dpr, 0, Math.PI * 2);
        ctx.fill();
      }

      // current migrating dot — slow figure-eight across zones
      const mx = 0.5 + Math.sin(t * 0.4) * 0.32;
      const my = 0.5 + Math.sin(t * 0.27 + 1.2) * 0.28;
      const cx = pad + mx * fw;
      const cy = pad + my * fh;
      trail.push({ x: cx, y: cy });
      if (trail.length > 50) trail.shift();

      // trail
      ctx.strokeStyle = `color-mix(in oklch, ${signalColor} 35%, transparent)`;
      ctx.lineWidth = dpr;
      ctx.beginPath();
      trail.forEach((p, i) => {
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.stroke();

      // glow
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 14 * dpr);
      grad.addColorStop(0, `color-mix(in oklch, ${signalColor} 55%, transparent)`);
      grad.addColorStop(1, `color-mix(in oklch, ${signalColor} 0%, transparent)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, 14 * dpr, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = signalColor;
      ctx.beginPath();
      ctx.arc(cx, cy, 2.6 * dpr, 0, Math.PI * 2);
      ctx.fill();
    };
    raf = requestAnimationFrame(draw);

    const tick = setInterval(() => {
      const mx = 0.5 + Math.sin(t * 0.4) * 0.32;
      const my = 0.5 + Math.sin(t * 0.27 + 1.2) * 0.28;
      // nearest zone
      let best: Zone = "engaged";
      let bestD = Infinity;
      for (const z of ZONES) {
        const d = (z.cx - mx) ** 2 + (z.cy - my) ** 2;
        if (d < bestD) { bestD = d; best = z.key; }
      }
      const label = best === "calm" ? "Calm" : best === "engaged" ? "Engaged" : "Stress";
      const sigma = (0.001 + Math.abs(Math.sin(t * 0.9)) * 0.004).toFixed(4);
      const delta = Math.round(30 + Math.abs(Math.cos(t * 0.7)) * 40).toString();
      setReadout({ state: label, sigma, delta });
    }, 800);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      clearInterval(tick);
    };
  }, []);

  const hovDesc = hovered ? ZONES.find((z) => z.key === hovered)?.desc : null;

  return (
    <div className="relative mx-auto w-full max-w-[460px] border border-[var(--hairline)] bg-[oklch(0.12_0.02_252_/_0.4)] p-5 backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-dim">
          Signal Field · State Map
        </span>
        <div className="flex items-center gap-2">
          <span className="h-1 w-1 rounded-full bg-[var(--signal)] breathe" />
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-dim">Live</span>
        </div>
      </div>

      <div className="relative">
        <canvas ref={canvasRef} className="block aspect-square w-full" aria-hidden />
        {/* zone labels positioned over the canvas */}
        {ZONES.map((z) => (
          <button
            key={z.key}
            type="button"
            onMouseEnter={() => setHovered(z.key)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(z.key)}
            onBlur={() => setHovered(null)}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2 font-mono text-[10px] uppercase tracking-[0.22em] outline-none transition-colors"
            style={{
              left: `${z.cx * 100}%`,
              top: `${z.cy * 100}%`,
              color: hovered === z.key ? "var(--signal)" : "var(--muted-foreground)",
            }}
          >
            {z.label}
          </button>
        ))}
      </div>

      {/* axis captions */}
      <div className="mt-2 flex justify-between font-mono text-[9px] uppercase tracking-[0.22em] text-dim">
        <span>x: input timing variance</span>
        <span>y: retry density</span>
      </div>

      {/* readout */}
      <div className="mt-4 flex items-center justify-between border-t border-[var(--hairline)] pt-3 font-mono text-[10px] uppercase tracking-[0.22em]">
        <span className="text-dim">
          State: <span className="text-signal">{readout.state}</span>
        </span>
        <span className="text-dim">σ {readout.sigma}</span>
        <span className="text-dim">Δ {readout.delta}ms</span>
      </div>

      <div className="mt-3 min-h-[2.5em]">
        <p className="text-[12px] leading-relaxed text-dim">
          {hovDesc ?? "Hover a zone to read its meaning."}
        </p>
      </div>
    </div>
  );
}
