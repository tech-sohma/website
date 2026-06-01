import { useEffect, useRef } from "react";

export function AtmosphereLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);

    type P = { x: number; y: number; vx: number; vy: number; r: number; a: number };
    let particles: P[] = [];

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(48, Math.floor((w * h) / 36000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.08,
        vy: -0.05 - Math.random() * 0.12,
        r: 0.6 + Math.random() * 1.1,
        a: 0.10 + Math.random() * 0.22,
      }));
    };
    resize();
    window.addEventListener("resize", resize);

    // cursor lerp
    const cursor = cursorRef.current;
    let cx = w / 2, cy = h / 2, tx = cx, ty = cy;
    const onMove = (e: PointerEvent) => { tx = e.clientX; ty = e.clientY; };
    if (cursor && !reduced) window.addEventListener("pointermove", onMove);

    let visible = true;
    const onVis = () => { visible = !document.hidden; };
    document.addEventListener("visibilitychange", onVis);

    const tick = () => {
      if (visible) {
        ctx.clearRect(0, 0, w, h);
        for (const p of particles) {
          p.x += p.vx; p.y += p.vy;
          if (p.y < -4) { p.y = h + 4; p.x = Math.random() * w; }
          if (p.x < -4) p.x = w + 4;
          if (p.x > w + 4) p.x = -4;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(236, 228, 208, ${p.a})`;
          ctx.fill();
        }
        if (cursor && !reduced) {
          cx += (tx - cx) * 0.04;
          cy += (ty - cy) * 0.04;
          cursor.style.transform = `translate3d(${cx - 240}px, ${cy - 240}px, 0)`;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    if (!reduced) raf = requestAnimationFrame(tick);
    else {
      // single static frame
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(236, 228, 208, ${p.a})`;
        ctx.fill();
      }
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* base vignette */}
      <div className="absolute inset-0" style={{
        background:
          "radial-gradient(ellipse 90% 60% at 50% 0%, oklch(0.18 0.02 250) 0%, transparent 60%), radial-gradient(ellipse 70% 40% at 50% 100%, oklch(0.16 0.025 60 / 0.35) 0%, transparent 65%)",
      }} />
      {/* breathing horizon */}
      <div className="absolute inset-x-0 bottom-[-20%] h-[70vh] breathe"
        style={{ background: "radial-gradient(ellipse 60% 80% at 50% 100%, var(--signal-glow), transparent 70%)" }} />
      {/* canvas particles */}
      <canvas ref={canvasRef} className="absolute inset-0" />
      {/* cursor signal */}
      <div ref={cursorRef} className="absolute h-[480px] w-[480px] rounded-full opacity-[0.18] mix-blend-screen"
        style={{ background: "radial-gradient(circle, var(--signal-soft), transparent 60%)", willChange: "transform" }} />
      {/* grain */}
      <div className="absolute inset-0 opacity-[0.035]" style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      }} />
    </div>
  );
}
