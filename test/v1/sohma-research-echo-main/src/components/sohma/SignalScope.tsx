import { useEffect, useRef, useState } from "react";

type Channel = {
  n: string;
  label: string;
  unit: string;
  desc: string;
  // wave config: array of [freq, amp, phase]
  waves: [number, number, number][];
  alpha: number;
};

const CHANNELS: Channel[] = [
  {
    n: "01",
    label: "Hesitation",
    unit: "σ",
    desc: "Variance in keypress intervals. Flags emerging frustration.",
    waves: [[0.6, 0.55, 0], [0.22, 0.25, 1.3]],
    alpha: 0.9,
  },
  {
    n: "02",
    label: "Retry cadence",
    unit: "Δ",
    desc: "Loop and correction patterns when a goal slips out of reach.",
    waves: [[1.4, 0.35, 0.4], [0.9, 0.25, 2.1], [2.6, 0.12, 0]],
    alpha: 0.65,
  },
  {
    n: "03",
    label: "Input timing",
    unit: "ms",
    desc: "Micro-rhythm of action. Engagement felt as steady cadence.",
    waves: [[2.4, 0.45, 0.8], [1.1, 0.2, 1.7]],
    alpha: 0.75,
  },
  {
    n: "04",
    label: "Affective state",
    unit: "φ",
    desc: "Composite drift across calm, engaged, and stress bands.",
    waves: [[0.18, 0.7, 0], [0.45, 0.2, 2.4]],
    alpha: 0.95,
  },
];

const STATES = ["Calm", "Engaged", "Stress"] as const;

function sampleAt(ch: Channel, x: number, t: number) {
  let y = 0;
  for (const [f, a, p] of ch.waves) y += Math.sin(x * f + t * f * 0.9 + p) * a;
  return y;
}

export function SignalScope() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const hoveredRef = useRef<number | null>(null);
  const [readouts, setReadouts] = useState<string[]>(["0.0024", "41", "112", "0.71"]);
  const [stateIdx, setStateIdx] = useState(1);

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
      if (!reduce) t += dt * 0.6;

      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const rows = CHANNELS.length;
      const rowH = h / rows;
      const samples = 140;

      for (let i = 0; i < rows; i++) {
        const ch = CHANNELS[i];
        const cy = rowH * (i + 0.5);
        const amp = rowH * 0.32;
        const hov = hoveredRef.current;
        const alpha = hov === null ? ch.alpha : hov === i ? 1 : 0.18;

        // baseline
        ctx.strokeStyle = `color-mix(in oklch, ${dim} ${hov === i ? 35 : 18}%, transparent)`;
        ctx.lineWidth = dpr;
        ctx.beginPath();
        ctx.moveTo(0, cy);
        ctx.lineTo(w, cy);
        ctx.stroke();

        // ticks
        for (let k = 1; k < 8; k++) {
          const x = (w / 8) * k;
          ctx.beginPath();
          ctx.moveTo(x, cy - 3 * dpr);
          ctx.lineTo(x, cy + 3 * dpr);
          ctx.stroke();
        }

        // wave
        ctx.strokeStyle = `color-mix(in oklch, ${signalColor} ${Math.round(alpha * 100)}%, transparent)`;
        ctx.lineWidth = 1.1 * dpr;
        ctx.beginPath();
        for (let s = 0; s <= samples; s++) {
          const x = (s / samples) * w;
          const u = (s / samples) * 6;
          const y = cy + sampleAt(ch, u, t) * amp;
          if (s === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // leading dot
        const lx = w - 2 * dpr;
        const ly = cy + sampleAt(ch, 6, t) * amp;
        ctx.fillStyle = `color-mix(in oklch, ${signalColor} ${Math.round(alpha * 100)}%, transparent)`;
        ctx.beginPath();
        ctx.arc(lx, ly, 2.2 * dpr, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    raf = requestAnimationFrame(draw);

    // readouts + state tick
    const tick = setInterval(() => {
      setReadouts(CHANNELS.map((ch, i) => {
        const v = Math.abs(sampleAt(ch, 6, t));
        if (i === 0) return v.toFixed(4);
        if (i === 1) return Math.round(30 + v * 30).toString();
        if (i === 2) return Math.round(95 + v * 40).toString();
        return (0.5 + v * 0.3).toFixed(2);
      }));
        const composite = CHANNELS.reduce((acc, ch) => acc + Math.abs(sampleAt(ch, 6, t)), 0) / 4;
        setStateIdx(composite < 0.35 ? 0 : composite < 0.6 ? 1 : 2);
    }, 600);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      clearInterval(tick);
    };
  }, []);

  const hov = hovered;

  return (
    <div className="relative w-full max-w-[520px] border border-[var(--hairline)] bg-[oklch(0.12_0.02_252_/_0.4)] p-5 backdrop-blur-sm">
      {/* frame header removed */}


      <div className="relative">
        {/* labels + readouts column overlay */}
        <div className="absolute inset-0 z-10 grid grid-rows-4">
          {CHANNELS.map((ch, i) => (
            <button
              key={ch.n}
              type="button"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
              className="group flex items-center justify-between px-1 text-left outline-none transition-opacity"
              style={{ opacity: hov === null || hov === i ? 1 : 0.35 }}
            >
              <span className="font-mono text-[10px] tracking-[0.18em] text-dim group-hover:text-ivory group-focus-visible:text-ivory">
                {ch.n} · {ch.label.toUpperCase()}
              </span>
              <span className="font-mono text-[10px] tracking-[0.14em] text-signal">
                {ch.unit} {readouts[i]}
              </span>
            </button>
          ))}
        </div>
        <canvas ref={canvasRef} className="block h-[300px] w-full" aria-hidden />
      </div>

      {/* state band */}
      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-dim">Composite state</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-signal">{STATES[stateIdx]}</span>
        </div>
        <div className="relative h-[3px] w-full overflow-hidden bg-[var(--hairline)]">
          <div
            className="absolute top-0 h-full w-1/3 bg-[var(--signal)] transition-all duration-[1800ms] ease-in-out"
            style={{ left: `${stateIdx * 33.333}%`, opacity: 0.7 }}
          />
        </div>
        <div className="mt-2 flex justify-between font-mono text-[9px] uppercase tracking-[0.22em] text-dim">
          {STATES.map((s) => <span key={s}>{s}</span>)}
        </div>
      </div>

      {/* hover caption */}
      <div className="mt-5 min-h-[2.5em] border-t border-[var(--hairline)] pt-3">
        <p className="text-[12px] leading-relaxed text-dim transition-opacity duration-300">
          {hov === null
            ? "Hover a channel to inspect the signal."
            : CHANNELS[hov].desc}
        </p>
      </div>
    </div>
  );
}
