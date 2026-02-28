// Hand-drawn SVG rabbit — inspired by lop-eared white rabbit reference
// Warm white body, pink inner ears, sky-blue eyes, fluffy tail
// 4-leg gallop + standing-ear flutter + body bounce
// ViewBox: 100 × 140, facing RIGHT

export default function Rabbit({ running = false, size = 1 }) {
  const la = running ? 'rabbit-gallop-a' : ''  // front-R + back-L
  const lb = running ? 'rabbit-gallop-b' : ''  // front-L + back-R
  const ef = running ? 'rabbit-ear-flutter' : ''

  return (
    <div
      className={running ? 'rabbit-bounce-run' : ''}
      style={{ display: 'inline-block', lineHeight: 0 }}
    >
      <svg
        viewBox="0 0 100 140"
        width={100 * size}
        height={140 * size}
        style={{ overflow: 'visible' }}
      >

        {/* ══════════════════════════════════
            BACK LEGS  (behind body)
            ══════════════════════════════════ */}

        {/* Back-far leg (slightly muted) */}
        <g className={lb} style={{ transformBox: 'fill-box', transformOrigin: 'top center' }}>
          <path
            d="M 29,105 C 26,113 24,122 25,132
               C 28,133 33,133 35,132
               C 36,122 37,113 38,105 Z"
            fill="#DEDAD4"
          />
          {/* chunky hind-paw */}
          <path d="M 22,132 C 22,136 38,136 38,132 Z" fill="#E8E4DC" />
        </g>

        {/* Back-near leg */}
        <g className={la} style={{ transformBox: 'fill-box', transformOrigin: 'top center' }}>
          <path
            d="M 37,105 C 35,114 34,124 35,134
               C 38,135 44,135 46,134
               C 47,123 47,113 48,105 Z"
            fill="#ECEAE4"
          />
          <path d="M 32,134 C 32,138 48,138 48,134 Z" fill="#E0DDD6" />
        </g>

        {/* ══════════════════════════════════
            LOP EAR  (droops beside/behind head)
            ══════════════════════════════════ */}
        <path
          d="M 50,34
             C 42,30 34,28 30,36
             C 26,44 28,58 34,66
             C 38,72 44,72 46,66
             C 42,58 40,48 44,38
             C 46,34 48,32 50,34 Z"
          fill="#F0EDEA"
        />
        {/* inner pink */}
        <path
          d="M 48,35
             C 42,32 36,31 32,38
             C 28,46 30,58 36,64
             C 39,68 43,68 44,63
             C 41,56 39,48 43,38
             C 45,34 47,33 48,35 Z"
          fill="#FFC5CE"
          opacity="0.85"
        />
        {/* lop ear tip highlight */}
        <ellipse cx="38" cy="62" rx="4" ry="3" fill="#FFB3C0" opacity="0.4" />

        {/* ══════════════════════════════════
            BODY
            ══════════════════════════════════ */}
        <path
          d="M 24,90
             C 22,106 28,118 40,120
             C 52,122 66,118 70,108
             C 74,98  70,84  62,78
             C 54,72  40,72  32,78
             C 26,82  24,86  24,90 Z"
          fill="#F8F6F2"
        />
        {/* Belly — slightly warmer */}
        <ellipse cx="48" cy="100" rx="16" ry="14" fill="#FEFEFE" opacity="0.75" />
        {/* Body shading on far side */}
        <path
          d="M 24,90 C 22,100 26,112 34,118 C 28,112 26,102 28,90 Z"
          fill="#E8E4DE"
          opacity="0.5"
        />

        {/* ══════════════════════════════════
            FLUFFY TAIL  (left side)
            ══════════════════════════════════ */}
        <circle cx="22" cy="90" r="11"  fill="#FFFFFF" />
        <circle cx="19" cy="86" r="7"   fill="#F8F8F6" />
        <circle cx="24" cy="93" r="6"   fill="#F0EEEC" />
        {/* subtle shadow behind tail */}
        <circle cx="22" cy="90" r="11"  fill="none" stroke="#E4E0DA" strokeWidth="1" />

        {/* ══════════════════════════════════
            FRONT LEGS  (in front of body)
            ══════════════════════════════════ */}

        {/* Front-far leg */}
        <g className={la} style={{ transformBox: 'fill-box', transformOrigin: 'top center' }}>
          <path
            d="M 57,108 C 54,116 53,124 54,132
               C 57,133 62,133 64,132
               C 65,124 65,116 66,108 Z"
            fill="#DEDAD4"
          />
          <path d="M 51,132 C 51,136 66,136 66,132 Z" fill="#E8E4DC" />
        </g>

        {/* Front-near leg */}
        <g className={lb} style={{ transformBox: 'fill-box', transformOrigin: 'top center' }}>
          <path
            d="M 65,108 C 63,116 62,125 63,133
               C 66,134 71,134 73,133
               C 74,125 75,116 76,108 Z"
            fill="#ECEAE4"
          />
          <path d="M 61,133 C 61,137 75,137 75,133 Z" fill="#E0DDD6" />
        </g>

        {/* ══════════════════════════════════
            HEAD
            ══════════════════════════════════ */}
        <path
          d="M 40,44
             C 40,28 52,22 64,26
             C 76,30 82,42 78,54
             C 74,66 62,68 52,64
             C 42,60 38,56 40,44 Z"
          fill="#FFFFFF"
        />
        {/* Cheek puff (right side, nearest camera) */}
        <ellipse cx="72" cy="56" rx="10" ry="8" fill="#F8F6F2" opacity="0.6" />
        {/* Head shading — top */}
        <path
          d="M 42,40 C 46,28 60,24 70,28 C 62,26 50,28 42,40 Z"
          fill="#E8E8E4"
          opacity="0.45"
        />

        {/* ══════════════════════════════════
            STANDING EAR  (tall, right side)
            ══════════════════════════════════ */}
        <g className={ef} style={{ transformBox: 'fill-box', transformOrigin: 'bottom center' }}>
          <path
            d="M 64,28
               C 62,18 64,6 68,3
               C 72,0  76,6  74,18
               C 72,28 68,30 64,28 Z"
            fill="#F0EDEA"
          />
          {/* inner pink */}
          <path
            d="M 65,27
               C 63,19 65,8  68,5
               C 71,3  74,8  72,18
               C 70,27 67,29 65,27 Z"
            fill="#FFB3BA"
            opacity="0.9"
          />
          {/* ear tip highlight */}
          <ellipse cx="68" cy="6" rx="3" ry="2.5" fill="#FFD0D8" opacity="0.5" />
        </g>

        {/* ══════════════════════════════════
            FACE DETAILS
            ══════════════════════════════════ */}

        {/* Eye — sky blue */}
        <ellipse cx="70" cy="42" rx="5.5" ry="5.5" fill="#64B5F6" />
        <ellipse cx="70" cy="42" rx="3.5" ry="4"   fill="#1A3878" />
        {/* Shine */}
        <circle  cx="72" cy="40" r="1.6"            fill="white"   opacity="0.95" />
        {/* Eyelid curve */}
        <path d="M 65,40 C 67,37 72,37 75,40"
          fill="none" stroke="#5A5050" strokeWidth="0.7" strokeLinecap="round" />

        {/* Nose */}
        <ellipse cx="78" cy="52" rx="3.5" ry="2.5" fill="#F06090" />
        {/* Nose shine */}
        <ellipse cx="77" cy="51" rx="1.5" ry="1"   fill="#FF8AAC" opacity="0.6" />

        {/* Mouth */}
        <path d="M 76,54 Q 78,57 80,54"
          fill="none" stroke="#D04868" strokeWidth="1" strokeLinecap="round" />

        {/* Whiskers */}
        <line x1="78" y1="51" x2="94" y2="48" stroke="#C8C0B6" strokeWidth="0.9" />
        <line x1="78" y1="53" x2="94" y2="53" stroke="#C8C0B6" strokeWidth="0.9" />
        <line x1="78" y1="55" x2="94" y2="58" stroke="#C8C0B6" strokeWidth="0.9" />

      </svg>
    </div>
  )
}
