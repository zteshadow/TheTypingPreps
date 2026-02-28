import Rabbit from './Rabbit'
import GrassHill from './GrassHill'

// ── Flower data matching the reference: white daisies + yellow wildflowers ──
const FLOWERS = [
  { x:  2, y: -28, type: 'daisy', size: 1.1,  delay: '0s'   },
  { x:  5, y: -14, type: 'yellow',size: 0.75, delay: '0.6s'  },
  { x:  9, y: -32, type: 'daisy', size: 0.85, delay: '1.1s'  },
  { x: 13, y: -16, type: 'yellow',size: 0.9,  delay: '0.3s'  },
  { x: 17, y: -26, type: 'daisy', size: 1.0,  delay: '0.8s'  },
  { x: 21, y: -12, type: 'yellow',size: 0.7,  delay: '0.2s'  },
  { x: 25, y: -30, type: 'daisy', size: 0.95, delay: '1.4s'  },
  { x: 29, y: -18, type: 'yellow',size: 0.85, delay: '0.5s'  },
  { x: 33, y: -24, type: 'daisy', size: 1.05, delay: '0.9s'  },
  { x: 37, y: -14, type: 'yellow',size: 0.8,  delay: '0.1s'  },
  { x: 41, y: -30, type: 'daisy', size: 0.9,  delay: '0.7s'  },
  { x: 45, y: -16, type: 'yellow',size: 1.0,  delay: '1.2s'  },
  { x: 49, y: -26, type: 'daisy', size: 0.8,  delay: '0.4s'  },
  { x: 53, y: -12, type: 'yellow',size: 0.75, delay: '0.0s'  },
  { x: 57, y: -28, type: 'daisy', size: 1.0,  delay: '1.0s'  },
  { x: 61, y: -20, type: 'yellow',size: 0.85, delay: '0.6s'  },
  { x: 65, y: -32, type: 'daisy', size: 0.9,  delay: '0.3s'  },
  { x: 69, y: -14, type: 'yellow',size: 0.7,  delay: '1.3s'  },
  { x: 73, y: -24, type: 'daisy', size: 1.1,  delay: '0.8s'  },
  { x: 77, y: -18, type: 'yellow',size: 0.9,  delay: '0.2s'  },
  { x: 81, y: -30, type: 'daisy', size: 0.85, delay: '0.5s'  },
  { x: 85, y: -12, type: 'yellow',size: 0.8,  delay: '1.1s'  },
  { x: 89, y: -26, type: 'daisy', size: 1.0,  delay: '0.7s'  },
  { x: 93, y: -20, type: 'yellow',size: 0.75, delay: '0.4s'  },
  { x: 97, y: -16, type: 'daisy', size: 0.9,  delay: '0.9s'  },
]

// White daisy — 8 elongated petals, golden centre
function DaisySvg({ size }) {
  const s = size
  return (
    <svg viewBox="0 0 32 42" width={32 * s} height={42 * s} style={{ display: 'block' }}>
      <line x1="16" y1="42" x2="16" y2="18" stroke="#5a9020" strokeWidth="2" strokeLinecap="round" />
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i * 45 * Math.PI) / 180
        const cx = 16 + 8 * Math.cos(a)
        const cy = 13 + 8 * Math.sin(a)
        return (
          <ellipse
            key={i}
            cx={cx} cy={cy}
            rx="4" ry="2.2"
            fill="white"
            opacity="0.95"
            transform={`rotate(${i * 45} ${cx} ${cy})`}
          />
        )
      })}
      <circle cx="16" cy="13" r="4.8" fill="#F8D020" />
      <circle cx="16" cy="13" r="3"   fill="#E0A010" />
    </svg>
  )
}

// Yellow wildflower — 6 rounded petals, orange centre
function YellowFlowerSvg({ size }) {
  const s = size
  return (
    <svg viewBox="0 0 28 38" width={28 * s} height={38 * s} style={{ display: 'block' }}>
      <line x1="14" y1="38" x2="14" y2="16" stroke="#5a9020" strokeWidth="2" strokeLinecap="round" />
      {Array.from({ length: 6 }, (_, i) => {
        const a = (i * 60 * Math.PI) / 180
        const cx = 14 + 7 * Math.cos(a)
        const cy = 12 + 7 * Math.sin(a)
        return (
          <ellipse
            key={i}
            cx={cx} cy={cy}
            rx="5" ry="3"
            fill="#F5E030"
            opacity="0.9"
            transform={`rotate(${i * 60} ${cx} ${cy})`}
          />
        )
      })}
      <circle cx="14" cy="12" r="4" fill="#F08010" />
      <circle cx="14" cy="12" r="2.5" fill="#D06008" />
    </svg>
  )
}

function Flower({ x, y, type, size, delay }) {
  return (
    <div
      className="absolute animate-sway"
      style={{ left: `${x}%`, top: `${y}px`, animationDelay: delay }}
    >
      {type === 'daisy'
        ? <DaisySvg size={size} />
        : <YellowFlowerSvg size={size} />
      }
    </div>
  )
}

// ── Large billowing Ghibli cloud ──
function GhibliCloud({ style }) {
  return (
    <div className="absolute pointer-events-none" style={style}>
      <svg viewBox="0 0 420 200" width="420" height="200" style={{ overflow: 'visible' }}>
        {/* shadow base */}
        <ellipse cx="210" cy="168" rx="195" ry="42" fill="#C0DCF0" opacity="0.45" />
        {/* main body */}
        <ellipse cx="210" cy="155" rx="190" ry="55"  fill="#D8EEF8" />
        {/* left bump */}
        <ellipse cx="105" cy="112" rx="90"  ry="76"  fill="#E4F2FA" />
        {/* center main bump */}
        <ellipse cx="210" cy="82"  rx="115" ry="96"  fill="#EEF7FF" />
        {/* right bump */}
        <ellipse cx="318" cy="118" rx="85"  ry="68"  fill="#E4F2FA" />
        {/* top highlights */}
        <ellipse cx="175" cy="50"  rx="78"  ry="62"  fill="#F6FBFF" />
        <ellipse cx="248" cy="40"  rx="68"  ry="56"  fill="#FFFFFF"  />
        <ellipse cx="128" cy="76"  rx="55"  ry="44"  fill="#F2F9FF"  />
        <ellipse cx="305" cy="82"  rx="52"  ry="42"  fill="#F2F9FF"  />
        {/* brightest peak */}
        <ellipse cx="218" cy="26"  rx="48"  ry="36"  fill="#FFFFFF"  />
      </svg>
    </div>
  )
}

// ── Small puff cloud ──
function SmallCloud({ style }) {
  return (
    <div className="absolute pointer-events-none" style={style}>
      <svg viewBox="0 0 200 100" width="200" height="100" style={{ overflow: 'visible' }}>
        <ellipse cx="100" cy="82" rx="90"  ry="28"  fill="#CCE8F4" opacity="0.5" />
        <ellipse cx="100" cy="72" rx="86"  ry="34"  fill="#DFF0F8" />
        <ellipse cx="58"  cy="52" rx="50"  ry="42"  fill="#EBF6FC" />
        <ellipse cx="118" cy="44" rx="60"  ry="50"  fill="#F2F9FF" />
        <ellipse cx="162" cy="58" rx="44"  ry="36"  fill="#EBF6FC" />
        <ellipse cx="96"  cy="24" rx="44"  ry="34"  fill="#FAFEFF" />
        <ellipse cx="136" cy="20" rx="36"  ry="28"  fill="#FFFFFF"  />
      </svg>
    </div>
  )
}

export default function StartScreen({ onStart }) {
  return (
    <div className="relative w-full h-full overflow-hidden select-none">

      {/* ── Vivid cyan-blue sky ── */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #1A8FBF 0%, #2BAED8 18%, #5CC8E8 42%, #90DCF0 65%, #C4F0FF 85%, #D8F8FF 100%)',
        }}
      />

      {/* ── Wispy cirrus lines ── */}
      <div className="absolute inset-0 pointer-events-none" style={{ top: '5%' }}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ width: '100%', height: '80px' }}>
          {[
            { d: 'M 80 20 Q 240 10 400 22 Q 520 30 640 18', w: 1.5 },
            { d: 'M 500 40 Q 680 28 840 38 Q 960 46 1080 34', w: 1.2 },
            { d: 'M 900 15 Q 1060 8  1220 18 Q 1340 26 1440 14', w: 1.0 },
            { d: 'M 200 55 Q 380 48  560 56 Q 680 62  780 50', w: 0.8 },
          ].map((l, i) => (
            <path key={i} d={l.d} fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth={l.w} strokeLinecap="round" />
          ))}
        </svg>
      </div>

      {/* ── Large billowing clouds (two drift layers) ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary layer — large clouds */}
        <div className="animate-cloud-drift" style={{ width: '200%', height: '100%', position: 'absolute' }}>
          <GhibliCloud style={{ top: '2%',  left: '-2%'  }} />
          <GhibliCloud style={{ top: '4%',  left: '28%', transform: 'scaleX(0.85)' }} />
          <GhibliCloud style={{ top: '1%',  left: '54%'  }} />
          <GhibliCloud style={{ top: '5%',  left: '78%', transform: 'scaleX(0.9)' }} />
          {/* seamless duplicates */}
          <GhibliCloud style={{ top: '2%',  left: '48%'  }} />
          <GhibliCloud style={{ top: '4%',  left: '72%', transform: 'scaleX(0.85)' }} />
        </div>
        {/* Secondary layer — smaller/slower */}
        <div className="animate-cloud-drift-slow" style={{ width: '200%', height: '100%', position: 'absolute' }}>
          <SmallCloud style={{ top: '28%', left: '8%',  opacity: 0.7 }} />
          <SmallCloud style={{ top: '22%', left: '36%', opacity: 0.65 }} />
          <SmallCloud style={{ top: '30%', left: '62%', opacity: 0.7 }} />
          <SmallCloud style={{ top: '24%', left: '88%', opacity: 0.6 }} />
          {/* seamless */}
          <SmallCloud style={{ top: '28%', left: '58%', opacity: 0.7 }} />
          <SmallCloud style={{ top: '22%', left: '86%', opacity: 0.65 }} />
        </div>
      </div>

      {/* ── Distant back hills ── */}
      <div className="absolute left-0 right-0 pointer-events-none" style={{ bottom: '36%' }}>
        <svg viewBox="0 0 1440 140" preserveAspectRatio="none" style={{ width: '100%', height: '140px' }}>
          {/* far hills — muted blue-green */}
          <ellipse cx="240"  cy="140" rx="380" ry="110" fill="#5AAE30" opacity="0.35" />
          <ellipse cx="760"  cy="140" rx="460" ry="120" fill="#4E9E28" opacity="0.30" />
          <ellipse cx="1260" cy="140" rx="400" ry="105" fill="#5AAE30" opacity="0.35" />
          {/* mid hills — slightly brighter */}
          <ellipse cx="120"  cy="140" rx="260" ry="80"  fill="#70C038" opacity="0.45" />
          <ellipse cx="600"  cy="140" rx="340" ry="90"  fill="#68B830" opacity="0.40" />
          <ellipse cx="1100" cy="140" rx="310" ry="82"  fill="#70C038" opacity="0.45" />
          <ellipse cx="1440" cy="140" rx="240" ry="75"  fill="#68B830" opacity="0.38" />
        </svg>
      </div>

      {/* ── Rolling foreground hill (hand-drawn SVG) ── */}
      <GrassHill heightPct={42} gradId="startHillGrad">
        {FLOWERS.map((f, i) => <Flower key={i} {...f} />)}
      </GrassHill>

      {/* ── Title ── */}
      <div className="absolute top-8 left-0 right-0 flex flex-col items-center pointer-events-none">
        <h1
          className="text-5xl font-black tracking-widest"
          style={{
            color: '#1a3a0a',
            textShadow: '2px 2px 0 rgba(255,255,255,0.8), 0 4px 12px rgba(0,0,0,0.15)',
          }}
        >
          THE TYPING PREPS
        </h1>
        <p
          className="text-lg font-bold tracking-[0.4em] mt-1"
          style={{ color: '#2a5a10', textShadow: '1px 1px 0 rgba(255,255,255,0.7)' }}
        >
          — TTP —
        </p>
        <p className="text-sm font-semibold mt-2" style={{ color: '#1a5080' }}>
          Type fast. Outrun the wolf!
        </p>
      </div>

      {/* ── Rabbit idle bobbing on hill ── */}
      <div
        className="absolute animate-bob"
        style={{ bottom: '42%', left: '50%', transform: 'translateX(-50%)', marginBottom: '-10px' }}
      >
        <Rabbit running={false} size={1.2} />
      </div>

      {/* ── START GAME button ── */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <button
          onClick={onStart}
          className="px-10 py-4 rounded-full text-xl font-black text-white transition-all duration-200 hover:scale-105 active:scale-95"
          style={{
            background: 'linear-gradient(180deg, #5DD050 0%, #3DB830 100%)',
            boxShadow: '0 6px 0 #256E18, 0 8px 24px rgba(60,180,40,0.45)',
            textShadow: '0 1px 3px rgba(0,0,0,0.35)',
          }}
        >
          ▶ START GAME
        </button>
      </div>
    </div>
  )
}
