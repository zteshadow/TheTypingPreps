// Hand-drawn SVG grassland hill
// Replaces the CSS border-radius ground div in both StartScreen and GameScreen
// Props: children (flowers placed on top), heightPct (% of parent), id (for unique gradient)

// Deterministic crest y at a given x (0-1440 range)
function crestY(x) {
  const t = x / 1440
  return (
    62
    - Math.sin(t * Math.PI * 1.7)        * 22
    - Math.sin(t * Math.PI * 3.8 + 0.8)  * 12
    - Math.sin(t * Math.PI * 6.2 + 1.4)  *  5
  )
}

// Single curved grass blade (stroke-based, organic look)
function GrassBlade({ x, lean, h }) {
  const base = crestY(x)
  const cx   = x + lean * 0.5
  const cy   = base - h * 0.55
  const tip  = { x: x + lean, y: base - h }
  return (
    <path
      d={`M ${x},${base} C ${cx},${cy} ${tip.x},${tip.y + 4} ${tip.x},${tip.y}`}
      fill="none"
      stroke="#A8D020"
      strokeWidth="2.2"
      strokeLinecap="round"
      opacity="0.85"
    />
  )
}

// Generate blade data deterministically (no Math.random)
function buildBlades() {
  const blades = []
  for (let i = 0; i < 80; i++) {
    const x    = i * 18 + ((i * 137) % 17)       // spread unevenly
    const lean = ((i * 73) % 14) - 7              // -7..+7
    const h    = 12 + ((i * 53) % 10)             // 12..22
    blades.push({ x, lean, h })
  }
  return blades
}

const BLADES = buildBlades()

// Sunshine shimmer strip just inside the crest
function CrestGlow() {
  // Build a path that runs ~20px below the crest across the full width
  const pts = []
  for (let x = 0; x <= 1440; x += 60) {
    pts.push(`${x},${crestY(x) + 18}`)
  }
  const topPath = Array.from({ length: Math.ceil(1440 / 60) + 1 }, (_, i) => {
    const x = i * 60
    return `${x},${crestY(x)}`
  })

  const dTop    = `M ${topPath[0]} ` + topPath.slice(1).map(p => `L ${p}`).join(' ')
  const dBottom = `L ${pts[pts.length - 1]} ` + [...pts].reverse().map(p => `L ${p}`).join(' ')

  return (
    <path
      d={`${dTop} ${dBottom} Z`}
      fill="rgba(218,255,80,0.22)"
    />
  )
}

export default function GrassHill({ children, heightPct = 40, gradId = 'hillGrad' }) {
  // Build crest path string for the hill outline
  const samples = Array.from({ length: 25 }, (_, i) => {
    const x = Math.round(i * 60)
    return `${x},${crestY(x).toFixed(1)}`
  })
  samples.push('1440,50') // end point

  const crestD =
    `M 0,${crestY(0).toFixed(1)} ` +
    samples.slice(1).map(p => `L ${p}`).join(' ') +
    ' L 1440,300 L 0,300 Z'

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: `${heightPct}%`,
        pointerEvents: 'none',
      }}
    >
      {/* SVG ground layer */}
      <svg
        viewBox="0 0 1440 300"
        preserveAspectRatio="none"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#B4E038" />
            <stop offset="10%"  stopColor="#98CC24" />
            <stop offset="38%"  stopColor="#6CAE1A" />
            <stop offset="100%" stopColor="#4C7A10" />
          </linearGradient>
        </defs>

        {/* Hill body */}
        <path d={crestD} fill={`url(#${gradId})`} />

        {/* Sunshine shimmer */}
        <CrestGlow />

        {/* Grass blades along crest */}
        {BLADES.map((b, i) => <GrassBlade key={i} {...b} />)}

        {/* Second row of shorter blades (offset) for density */}
        {BLADES.map((b, i) => (
          <GrassBlade
            key={`b2-${i}`}
            x={b.x + 9}
            lean={-b.lean * 0.6}
            h={b.h * 0.65}
          />
        ))}
      </svg>

      {/* Flowers rendered above SVG */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {children}
      </div>
    </div>
  )
}
