export function SignalRings() {
  return (
    <svg viewBox="0 0 400 400" className="w-full h-auto" aria-hidden>
      <defs>
        <radialGradient id="core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--signal)" stopOpacity="0.55" />
          <stop offset="60%" stopColor="var(--signal)" stopOpacity="0.05" />
          <stop offset="100%" stopColor="var(--signal)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="58" fill="url(#core)" className="breathe" style={{ transformOrigin: "200px 200px" }} />
      <g className="spin-1" style={{ transformOrigin: "200px 200px" }}>
        <circle cx="200" cy="200" r="90" fill="none" stroke="var(--signal)" strokeOpacity="0.35" strokeWidth="0.6" strokeDasharray="2 6" />
      </g>
      <g className="spin-2" style={{ transformOrigin: "200px 200px" }}>
        <circle cx="200" cy="200" r="130" fill="none" stroke="var(--signal)" strokeOpacity="0.22" strokeWidth="0.6" strokeDasharray="1 10" />
      </g>
      <g className="spin-3" style={{ transformOrigin: "200px 200px" }}>
        <circle cx="200" cy="200" r="180" fill="none" stroke="var(--foreground)" strokeOpacity="0.12" strokeWidth="0.5" strokeDasharray="1 14" />
        <circle cx="380" cy="200" r="2" fill="var(--signal)" />
      </g>
      <circle cx="200" cy="200" r="2" fill="var(--signal)" />
    </svg>
  );
}
