// White rabbit SVG — one lop ear, one standing ear, blue eyes, facing right
// Props: running (bool), size (number, default 1)
export default function Rabbit({ running = false, size = 1 }) {
  const legClass = running ? 'animate-leg-a' : ''
  const legAltClass = running ? 'animate-leg-b' : ''

  return (
    <svg
      viewBox="0 0 100 140"
      width={100 * size}
      height={140 * size}
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'visible' }}
    >
      {/* ── Lop ear (left, droops down) ── */}
      <path
        d="M 38 42 C 30 38 20 30 18 18 C 16 8 22 2 28 6 C 34 10 38 22 38 42 Z"
        fill="#ffffff"
        stroke="#e0e0e0"
        strokeWidth="1"
      />
      {/* lop ear inner pink */}
      <path
        d="M 35 40 C 29 36 22 28 20 18 C 18 11 23 7 27 10 C 32 14 35 26 35 40 Z"
        fill="#ffcdd2"
      />

      {/* ── Standing ear (right, tall) ── */}
      <ellipse cx="58" cy="16" rx="8" ry="22" fill="#ffffff" stroke="#e0e0e0" strokeWidth="1" transform="rotate(8 58 16)" />
      {/* standing ear inner pink */}
      <ellipse cx="58" cy="17" rx="5" ry="17" fill="#ffcdd2" transform="rotate(8 58 17)" />

      {/* ── Head ── */}
      <ellipse cx="50" cy="48" rx="22" ry="20" fill="#ffffff" stroke="#e0e0e0" strokeWidth="1" />

      {/* ── Body ── */}
      <ellipse cx="50" cy="90" rx="26" ry="32" fill="#ffffff" stroke="#e0e0e0" strokeWidth="1" />

      {/* ── Eye (blue) ── */}
      <ellipse cx="60" cy="45" rx="5" ry="5.5" fill="#64b5f6" />
      <ellipse cx="60" cy="45" rx="3" ry="3.5" fill="#1565c0" />
      {/* shine dot */}
      <circle cx="62" cy="43" r="1.2" fill="white" />

      {/* ── Nose (pink) ── */}
      <ellipse cx="66" cy="53" rx="3" ry="2" fill="#f48fb1" />

      {/* ── Mouth ── */}
      <path d="M 64 55 Q 66 58 68 55" fill="none" stroke="#e0a0a0" strokeWidth="1.2" strokeLinecap="round" />

      {/* ── Whiskers ── */}
      <line x1="68" y1="53" x2="80" y2="51" stroke="#bdbdbd" strokeWidth="0.8" />
      <line x1="68" y1="54" x2="80" y2="55" stroke="#bdbdbd" strokeWidth="0.8" />
      <line x1="68" y1="55" x2="80" y2="58" stroke="#bdbdbd" strokeWidth="0.8" />

      {/* ── Front right leg ── */}
      <g className={legClass} style={{ transformOrigin: '58px 105px' }}>
        <rect x="53" y="105" width="10" height="28" rx="5" fill="#ffffff" stroke="#e0e0e0" strokeWidth="1" />
        <ellipse cx="58" cy="133" rx="8" ry="5" fill="#f5f5f5" stroke="#e0e0e0" strokeWidth="1" />
      </g>

      {/* ── Front left leg ── */}
      <g className={legAltClass} style={{ transformOrigin: '42px 105px' }}>
        <rect x="37" y="105" width="10" height="28" rx="5" fill="#ffffff" stroke="#e0e0e0" strokeWidth="1" />
        <ellipse cx="42" cy="133" rx="8" ry="5" fill="#f5f5f5" stroke="#e0e0e0" strokeWidth="1" />
      </g>

      {/* ── Back right leg ── */}
      <g className={legAltClass} style={{ transformOrigin: '64px 100px' }}>
        <rect x="59" y="100" width="12" height="30" rx="6" fill="#f0f0f0" stroke="#e0e0e0" strokeWidth="1" />
        <ellipse cx="65" cy="130" rx="10" ry="6" fill="#eeeeee" stroke="#e0e0e0" strokeWidth="1" />
      </g>

      {/* ── Back left leg ── */}
      <g className={legClass} style={{ transformOrigin: '36px 100px' }}>
        <rect x="31" y="100" width="12" height="30" rx="6" fill="#f0f0f0" stroke="#e0e0e0" strokeWidth="1" />
        <ellipse cx="37" cy="130" rx="10" ry="6" fill="#eeeeee" stroke="#e0e0e0" strokeWidth="1" />
      </g>

      {/* ── Fluffy tail (left side) ── */}
      <circle cx="26" cy="88" r="10" fill="#ffffff" stroke="#e8e8e8" strokeWidth="1" />
      <circle cx="23" cy="84" r="6" fill="#f5f5f5" />
    </svg>
  )
}
