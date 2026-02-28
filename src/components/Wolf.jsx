// Hand-drawn SVG wolf — inspired by the reference photo
// Grey saddle, cream belly, amber eyes, long snout, bushy tail
// 4 animated galloping legs + tail stream + jaw snap on danger
// ViewBox: 200 × 120, facing RIGHT

export default function Wolf({ running = false, danger = false, size = 1 }) {
  const la = running ? 'wolf-gallop-a' : ''  // leg phase A  (front-R + back-L)
  const lb = running ? 'wolf-gallop-b' : ''  // leg phase B  (front-L + back-R)
  const tw = running ? 'wolf-tail-run' : ''  // tail stream

  return (
    <div
      className={running ? 'wolf-bounce-run' : ''}
      style={{ display: 'inline-block', lineHeight: 0 }}
    >
      <svg
        viewBox="0 0 200 120"
        width={200 * size}
        height={120 * size}
        style={{ overflow: 'visible' }}
        className={danger ? 'animate-wolf-danger' : ''}
      >

        {/* ══════════════════════════════════
            BACK LEGS  (drawn first, behind body)
            ══════════════════════════════════ */}

        {/* Back-far leg — slightly desaturated (depth) */}
        <g className={lb} style={{ transformBox: 'fill-box', transformOrigin: 'top center' }}>
          <path
            d="M 58,71 C 55,80 53,94 55,109
               C 58,110 63,110 65,109
               C 65,95 66,82 68,71 Z"
            fill="#A8A090"
          />
          {/* knee bump */}
          <ellipse cx="60" cy="91" rx="5" ry="4.5" fill="#B8B0A0" />
          {/* paw */}
          <path d="M 52,109 C 52,113 68,113 68,109 Z" fill="#D0C8B4" />
        </g>

        {/* Back-near leg */}
        <g className={la} style={{ transformBox: 'fill-box', transformOrigin: 'top center' }}>
          <path
            d="M 68,71 C 66,82 65,95 67,110
               C 70,111 75,111 77,110
               C 77,95 77,82 78,71 Z"
            fill="#989890"
          />
          <ellipse cx="70" cy="92" rx="5" ry="4.5" fill="#A8A098" />
          <path d="M 64,110 C 64,114 80,114 80,110 Z" fill="#C0B8A4" />
        </g>

        {/* ══════════════════════════════════
            TAIL
            ══════════════════════════════════ */}
        <g className={tw} style={{ transformBox: 'fill-box', transformOrigin: 'bottom center' }}>
          {/* Main shaft — curves up and leftward from rump */}
          <path
            d="M 56,60
               C 48,52 36,40 24,26
               C 19,20 14,15 17,12
               C 20,9  24,13 27,18
               C 38,32 50,46 57,62 Z"
            fill="#787070"
          />
          {/* Lighter top-side of tail */}
          <path
            d="M 57,62
               C 50,48 39,34 28,20
               C 24,15 20,11 22,10
               C 26,20 38,36 55,58 Z"
            fill="#9A9290"
            opacity="0.7"
          />
          {/* Bushy tip */}
          <path
            d="M 17,12
               C 11,7  6,10  8,17
               C 10,22 16,26 22,24
               C 17,20 12,14 17,12 Z"
            fill="#A09898"
          />
          {/* Tip highlight */}
          <ellipse cx="13" cy="17" rx="5" ry="4" fill="#C0B8B0" opacity="0.6" />
        </g>

        {/* ══════════════════════════════════
            MAIN BODY
            ══════════════════════════════════ */}

        {/* Body outline */}
        <path
          d="M 57,68
             C 56,80  78,87 108,83
             C 130,81 147,73 149,60
             C 151,48 143,37 127,35
             C 107,31  84,34  68,42
             C 57,47  56,58  57,68 Z"
          fill="#969690"
        />

        {/* Saddle marking — dark charcoal along the spine */}
        <path
          d="M 68,42
             C 86,31 112,31 130,37
             C 141,41 148,50 141,57
             C 120,46  92,44  70,51
             C 60,48  60,42  68,42 Z"
          fill="#484440"
        />

        {/* Flank highlight — subtle mid-grey between saddle & belly */}
        <path
          d="M 70,51
             C 90,45 116,45 135,53
             C 141,57 139,64 129,68
             C 108,65  82,65  64,61
             C 58,59  60,53  70,51 Z"
          fill="#B0AEA8"
          opacity="0.45"
        />

        {/* Underbelly — warm cream */}
        <ellipse cx="103" cy="79" rx="40" ry="11" fill="#EDE0C6" opacity="0.92" />

        {/* ══════════════════════════════════
            FRONT LEGS  (in front of body)
            ══════════════════════════════════ */}

        {/* Front-far leg */}
        <g className={la} style={{ transformBox: 'fill-box', transformOrigin: 'top center' }}>
          <path
            d="M 124,71
               C 120,82 119,96 121,110
               C 124,111 129,111 131,110
               C 131,96 132,83 134,71 Z"
            fill="#A8A090"
          />
          <ellipse cx="125" cy="92" rx="5" ry="4.5" fill="#B8B0A0" />
          <path d="M 118,110 C 118,114 134,114 134,110 Z" fill="#D0C8B4" />
        </g>

        {/* Front-near leg */}
        <g className={lb} style={{ transformBox: 'fill-box', transformOrigin: 'top center' }}>
          <path
            d="M 135,71
               C 132,83 131,96 133,110
               C 136,111 141,111 143,110
               C 144,96 145,84 146,71 Z"
            fill="#989890"
          />
          <ellipse cx="137" cy="92" rx="5" ry="4.5" fill="#A8A098" />
          <path d="M 130,110 C 130,114 146,114 146,110 Z" fill="#C0B8A4" />
        </g>

        {/* ══════════════════════════════════
            CHEST / NECK
            ══════════════════════════════════ */}

        {/* Chest ruff — lighter creamy patch */}
        <path
          d="M 140,58
             C 144,50 150,46 150,58
             C 150,68 144,74 140,72
             C 137,67 137,62 140,58 Z"
          fill="#C8BEA8"
          opacity="0.9"
        />

        {/* Neck outer */}
        <path
          d="M 138,63
             C 143,52 154,41 162,36
             C 166,34 168,37 164,43
             C 157,52 147,59 141,65 Z"
          fill="#8E8E88"
        />

        {/* Neck underside — lighter */}
        <path
          d="M 141,65
             C 150,59 158,52 164,44
             C 161,48 156,56 148,64 Z"
          fill="#C4BAA6"
          opacity="0.75"
        />

        {/* ══════════════════════════════════
            HEAD
            ══════════════════════════════════ */}

        {/* Skull */}
        <ellipse cx="168" cy="40" rx="21" ry="18" fill="#969690" />

        {/* Dark top-of-skull patch (matches saddle colour) */}
        <path
          d="M 152,36
             C 156,26 170,22 180,28
             C 184,31 183,36 178,37
             C 170,34 158,34 152,36 Z"
          fill="#565450"
        />

        {/* ── Ears ── */}

        {/* Far ear (slightly behind) */}
        <path
          d="M 160,26 C 162,14 169,9 173,17 C 168,20 164,23 160,26 Z"
          fill="#706860"
        />
        <path
          d="M 161,25 C 163,16 168,13 171,18 C 167,20 164,23 161,25 Z"
          fill="#B88070"
        />

        {/* Near ear */}
        <path
          d="M 170,24 C 173,12 181,8 183,17 C 178,20 174,22 170,24 Z"
          fill="#807870"
        />
        <path
          d="M 171,23 C 174,14 180,11 181,18 C 177,20 174,22 171,23 Z"
          fill="#C89080"
        />

        {/* ── Muzzle ── */}

        {/* Upper muzzle / cheek */}
        <path
          d="M 157,44
             C 162,39 175,38 186,42
             C 192,46 192,52 186,55
             C 176,57 162,55 157,51
             C 153,48 153,46 157,44 Z"
          fill="#A09080"
        />

        {/* Lower jaw — animates open on danger */}
        <g
          style={{
            transformBox: 'fill-box',
            transformOrigin: 'left center',
            animation: danger ? 'wolfJawSnap 0.28s ease-in-out infinite' : 'none',
          }}
        >
          <path
            d="M 157,51
               C 163,55 177,57 186,55
               C 188,58 186,63 179,63
               C 169,65 158,61 155,57 Z"
            fill="#907870"
          />
          {/* Three teeth */}
          <path d="M 161,57 L 164,64 L 168,57 Z" fill="#F0EDE6" />
          <path d="M 168,57 L 172,65 L 176,57 Z" fill="#F0EDE6" />
          <path d="M 176,57 L 179,63 L 182,57 Z" fill="#F0EDE6" />
        </g>

        {/* ── Nose ── */}
        <ellipse cx="187" cy="44" rx="4.5" ry="3.5" fill="#181818" />
        {/* wet shine */}
        <ellipse cx="186" cy="42.5" rx="2" ry="1.3" fill="#383838" opacity="0.55" />

        {/* ── Eye ── */}
        {/* Amber iris */}
        <ellipse cx="174" cy="36" rx="5.5" ry="5" fill="#C88010" />
        {/* Dark pupil (vertical slit) */}
        <ellipse cx="174" cy="36" rx="2.5" ry="4" fill="#181818" />
        {/* Shine */}
        <circle cx="176.5" cy="34" r="1.4" fill="white" opacity="0.9" />

        {/* ── Whisker dots ── */}
        <circle cx="174" cy="47" r="1.1" fill="#4A4440" />
        <circle cx="179" cy="46" r="0.9" fill="#4A4440" />
        <circle cx="174" cy="50" r="0.9" fill="#4A4440" />

      </svg>
    </div>
  )
}
