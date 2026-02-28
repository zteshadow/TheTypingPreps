import { useEffect, useRef, useState, useCallback } from 'react'
import Rabbit from './Rabbit'
import Wolf from './Wolf'
import GrassHill from './GrassHill'
import { getWord } from '../data/words'

// ── Game constants ──
const INITIAL_DISTANCE = 240
const DISTANCE_DECAY = 20      // px/s wolf gains when not typing
const WORD_BONUS = 70          // px added per correct word
const MAX_DISTANCE = 340
const BASE_SPEED = 3
const SPEED_BOOST = 5
const SPEED_DECAY = 2.5
const VICTORY_SCORE = 30

// Flowers for the scrolling background — white daisies + yellow wildflowers
const GROUND_FLOWERS = [
  { xPct:  2, yOffset: -26, type: 'daisy',  size: 0.9,  delay: '0s'   },
  { xPct:  6, yOffset: -14, type: 'yellow', size: 0.7,  delay: '0.5s' },
  { xPct: 10, yOffset: -28, type: 'daisy',  size: 0.8,  delay: '1.0s' },
  { xPct: 14, yOffset: -16, type: 'yellow', size: 0.85, delay: '0.3s' },
  { xPct: 18, yOffset: -24, type: 'daisy',  size: 1.0,  delay: '0.8s' },
  { xPct: 22, yOffset: -12, type: 'yellow', size: 0.75, delay: '0.2s' },
  { xPct: 26, yOffset: -30, type: 'daisy',  size: 0.85, delay: '1.2s' },
  { xPct: 30, yOffset: -18, type: 'yellow', size: 0.8,  delay: '0.6s' },
  { xPct: 34, yOffset: -22, type: 'daisy',  size: 0.95, delay: '0.4s' },
  { xPct: 38, yOffset: -14, type: 'yellow', size: 0.7,  delay: '0.9s' },
  { xPct: 42, yOffset: -28, type: 'daisy',  size: 0.8,  delay: '0.1s' },
  { xPct: 46, yOffset: -16, type: 'yellow', size: 0.9,  delay: '0.7s' },
  { xPct: 50, yOffset: -24, type: 'daisy',  size: 0.85, delay: '1.3s' },
  { xPct: 54, yOffset: -12, type: 'yellow', size: 0.75, delay: '0.0s' },
  { xPct: 58, yOffset: -26, type: 'daisy',  size: 1.0,  delay: '0.5s' },
  { xPct: 62, yOffset: -18, type: 'yellow', size: 0.8,  delay: '1.1s' },
  { xPct: 66, yOffset: -30, type: 'daisy',  size: 0.9,  delay: '0.3s' },
  { xPct: 70, yOffset: -14, type: 'yellow', size: 0.7,  delay: '0.8s' },
  { xPct: 74, yOffset: -22, type: 'daisy',  size: 0.95, delay: '0.6s' },
  { xPct: 78, yOffset: -16, type: 'yellow', size: 0.85, delay: '0.2s' },
  { xPct: 82, yOffset: -28, type: 'daisy',  size: 0.8,  delay: '1.0s' },
  { xPct: 86, yOffset: -12, type: 'yellow', size: 0.75, delay: '0.4s' },
  { xPct: 90, yOffset: -24, type: 'daisy',  size: 0.9,  delay: '0.9s' },
  { xPct: 94, yOffset: -18, type: 'yellow', size: 0.8,  delay: '0.7s' },
  { xPct: 97, yOffset: -20, type: 'daisy',  size: 0.85, delay: '1.4s' },
]

function DaisySvg({ size }) {
  return (
    <svg viewBox="0 0 32 42" width={32 * size} height={42 * size} style={{ display: 'block' }}>
      <line x1="16" y1="42" x2="16" y2="18" stroke="#5a9020" strokeWidth="2" strokeLinecap="round" />
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i * 45 * Math.PI) / 180
        const cx = 16 + 8 * Math.cos(a)
        const cy = 13 + 8 * Math.sin(a)
        return (
          <ellipse key={i} cx={cx} cy={cy} rx="4" ry="2.2"
            fill="white" opacity="0.95"
            transform={`rotate(${i * 45} ${cx} ${cy})`} />
        )
      })}
      <circle cx="16" cy="13" r="4.8" fill="#F8D020" />
      <circle cx="16" cy="13" r="3"   fill="#E0A010" />
    </svg>
  )
}

function YellowFlowerSvg({ size }) {
  return (
    <svg viewBox="0 0 28 38" width={28 * size} height={38 * size} style={{ display: 'block' }}>
      <line x1="14" y1="38" x2="14" y2="16" stroke="#5a9020" strokeWidth="2" strokeLinecap="round" />
      {Array.from({ length: 6 }, (_, i) => {
        const a = (i * 60 * Math.PI) / 180
        const cx = 14 + 7 * Math.cos(a)
        const cy = 12 + 7 * Math.sin(a)
        return (
          <ellipse key={i} cx={cx} cy={cy} rx="5" ry="3"
            fill="#F5E030" opacity="0.9"
            transform={`rotate(${i * 60} ${cx} ${cy})`} />
        )
      })}
      <circle cx="14" cy="12" r="4"   fill="#F08010" />
      <circle cx="14" cy="12" r="2.5" fill="#D06008" />
    </svg>
  )
}

function FlowerSprite({ xPct, yOffset, type, size, delay }) {
  return (
    <div
      className="absolute animate-sway-slow"
      style={{ left: `${xPct}%`, top: `${yOffset}px`, animationDelay: delay }}
    >
      {type === 'daisy' ? <DaisySvg size={size} /> : <YellowFlowerSvg size={size} />}
    </div>
  )
}

export default function GameScreen({ onGameOver, onVictory }) {
  // ── Refs for RAF loop (avoid re-renders in hot path) ──
  const scrollRef = useRef(0)
  const distanceRef = useRef(INITIAL_DISTANCE)
  const rabbitSpeedRef = useRef(BASE_SPEED)
  const lastTimeRef = useRef(null)
  const rafRef = useRef(null)
  const bgRef = useRef(null)
  const wolfRef = useRef(null)
  const rabbitScreenXRef = useRef(0)
  const bgWidthRef = useRef(0)
  const gameOverRef = useRef(false)

  // ── React state (UI updates OK at lower freq) ──
  const [score, setScore] = useState(0)
  const [currentWord, setCurrentWord] = useState(() => getWord(0, ''))
  const [inputVal, setInputVal] = useState('')
  const [charStates, setCharStates] = useState([]) // 'correct'|'wrong'|'untyped'
  const [distance, setDistance] = useState(INITIAL_DISTANCE)
  const [rabbitRunning, setRabbitRunning] = useState(true)
  const [wpm, setWpm] = useState(0)
  const [wordFlash, setWordFlash] = useState(false)
  const [startTime] = useState(Date.now())

  const scoreRef = useRef(0)
  const currentWordRef = useRef(currentWord)
  const inputRef = useRef(null)

  // Keep currentWordRef in sync
  useEffect(() => {
    currentWordRef.current = currentWord
  }, [currentWord])

  // ── Measure rabbit screen position after mount ──
  const rabbitContainerRef = useRef(null)
  useEffect(() => {
    if (rabbitContainerRef.current) {
      const rect = rabbitContainerRef.current.getBoundingClientRect()
      rabbitScreenXRef.current = rect.left + rect.width / 2
    }
  }, [])

  // ── Main RAF loop ──
  const gameLoop = useCallback((timestamp) => {
    if (gameOverRef.current) return

    if (lastTimeRef.current === null) {
      lastTimeRef.current = timestamp
    }
    const delta = Math.min((timestamp - lastTimeRef.current) / 1000, 0.1) // seconds, capped
    lastTimeRef.current = timestamp

    // 1. Decay rabbit speed toward BASE_SPEED
    const speed = rabbitSpeedRef.current
    if (speed > BASE_SPEED) {
      rabbitSpeedRef.current = Math.max(BASE_SPEED, speed - SPEED_DECAY * delta)
    }

    // 2. Wolf always approaches at DISTANCE_DECAY px/s
    //    Net: rabbit gains (rabbitSpeed - BASE_SPEED) * delta * 50 effectively
    //    Wolf closes: DISTANCE_DECAY * delta always
    //    Rabbit pushes: extra speed bonus applied per word (instant)
    distanceRef.current -= DISTANCE_DECAY * delta
    // Rabbit's extra speed creates proportional separation
    const extraSpeed = rabbitSpeedRef.current - BASE_SPEED
    distanceRef.current += extraSpeed * delta * 15

    // 3. Clamp distance
    distanceRef.current = Math.max(0, Math.min(MAX_DISTANCE, distanceRef.current))

    // 4. Check game over
    if (distanceRef.current <= 0) {
      gameOverRef.current = true
      cancelAnimationFrame(rafRef.current)
      const elapsed = (Date.now() - startTime) / 60000
      const finalWpm = elapsed > 0 ? Math.round(scoreRef.current / elapsed) : 0
      onGameOver(scoreRef.current, finalWpm)
      return
    }

    // 5. Scroll background
    const containerWidth = bgWidthRef.current || window.innerWidth * 2
    scrollRef.current += rabbitSpeedRef.current * delta * 50
    // Seamless loop at 50% of container
    if (scrollRef.current >= containerWidth / 2) {
      scrollRef.current -= containerWidth / 2
    }

    // 6. Update DOM directly (performance)
    if (bgRef.current) {
      bgRef.current.style.transform = `translateX(-${scrollRef.current}px)`
    }

    // Wolf position: rabbitScreenX - distance, but clamp to left edge
    if (wolfRef.current) {
      const wolfX = rabbitScreenXRef.current - distanceRef.current - 60 // 60 = wolf half-width offset
      wolfRef.current.style.left = `${Math.max(-120, wolfX)}px`

      // Scale wolf based on distance (closer = bigger)
      const proximity = 1 - distanceRef.current / MAX_DISTANCE
      const scale = 0.85 + proximity * 0.35
      wolfRef.current.style.transform = `scale(${scale})`
    }

    // Update distance state (throttled — only every ~100ms to avoid too many renders)
    setDistance(Math.round(distanceRef.current))

    rafRef.current = requestAnimationFrame(gameLoop)
  }, [onGameOver, startTime])

  // ── Start RAF on mount ──
  useEffect(() => {
    rafRef.current = requestAnimationFrame(gameLoop)
    inputRef.current?.focus()

    // Measure bg container
    if (bgRef.current) {
      bgWidthRef.current = bgRef.current.scrollWidth
    }

    return () => {
      cancelAnimationFrame(rafRef.current)
    }
  }, [gameLoop])

  // ── Typing handler ──
  function handleInput(e) {
    const val = e.target.value
    setInputVal(val)

    const word = currentWordRef.current

    // Per-character coloring
    const states = word.split('').map((ch, i) => {
      if (i >= val.length) return 'untyped'
      return val[i] === ch ? 'correct' : 'wrong'
    })
    setCharStates(states)

    // Check if word is complete
    if (val === word) {
      // Word correct!
      const newScore = scoreRef.current + 1
      scoreRef.current = newScore
      setScore(newScore)

      // Update WPM
      const elapsed = (Date.now() - startTime) / 60000
      setWpm(elapsed > 0 ? Math.round(newScore / elapsed) : 0)

      // Push rabbit: add distance + speed boost
      distanceRef.current = Math.min(MAX_DISTANCE, distanceRef.current + WORD_BONUS)
      rabbitSpeedRef.current = BASE_SPEED + SPEED_BOOST

      // Flash + clear
      setWordFlash(true)
      setTimeout(() => setWordFlash(false), 300)
      setInputVal('')
      setCharStates([])

      // Next word
      const next = getWord(newScore, word)
      setCurrentWord(next)
      currentWordRef.current = next

      // Check victory
      if (newScore >= VICTORY_SCORE) {
        gameOverRef.current = true
        cancelAnimationFrame(rafRef.current)
        const elapsed2 = (Date.now() - startTime) / 60000
        const finalWpm = elapsed2 > 0 ? Math.round(newScore / elapsed2) : 0
        onVictory(newScore, finalWpm)
      }
    }
  }

  const danger = distance < 80
  const distancePct = Math.round((distance / MAX_DISTANCE) * 100)

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden select-none">

      {/* ── HUD bar ── */}
      <div className="flex-shrink-0 h-14 flex items-center justify-between px-6 bg-green-800 bg-opacity-90 z-20">
        <span className="text-white font-black text-xl tracking-widest">TTP</span>

        {/* Current word display (large, per-char colored) */}
        <div className={`text-3xl font-black tracking-widest ${wordFlash ? 'animate-word-flash' : ''}`}>
          {currentWord.split('').map((ch, i) => {
            const state = charStates[i] || 'untyped'
            const color =
              state === 'correct' ? '#4ade80' :
              state === 'wrong'   ? '#f87171' :
                                    '#ffffff'
            return (
              <span key={i} style={{ color, transition: 'color 0.05s' }}>
                {ch}
              </span>
            )
          })}
        </div>

        <div className="flex flex-col items-end text-white font-bold text-sm">
          <span>{score}/{VICTORY_SCORE}</span>
          <span className="text-green-300">{wpm} WPM</span>
        </div>
      </div>

      {/* ── Scene ── */}
      <div className="flex-1 relative overflow-hidden">

        {/* Red danger overlay */}
        {danger && (
          <div className="absolute inset-0 bg-red-600 z-10 pointer-events-none animate-pulse-red" />
        )}

        {/* ── Vivid cyan-blue sky (fixed, non-scrolling) ── */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #1A8FBF 0%, #2BAED8 18%, #5CC8E8 42%, #90DCF0 65%, #C4F0FF 85%, #D8F8FF 100%)',
          }}
        />

        {/* ── Fixed clouds in sky ── */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="animate-cloud-drift" style={{ width: '200%', height: '100%', position: 'absolute' }}>
            {/* Large clouds */}
            {[
              { top: '2%',  left: '-2%'  },
              { top: '3%',  left: '30%', transform: 'scaleX(0.85)' },
              { top: '1%',  left: '56%'  },
              { top: '4%',  left: '80%', transform: 'scaleX(0.9)'  },
              { top: '2%',  left: '50%'  },
              { top: '3%',  left: '76%', transform: 'scaleX(0.85)' },
            ].map((s, i) => (
              <div key={i} className="absolute pointer-events-none" style={s}>
                <svg viewBox="0 0 420 200" width="380" height="180" style={{ overflow: 'visible' }}>
                  <ellipse cx="210" cy="168" rx="195" ry="42" fill="#C0DCF0" opacity="0.4" />
                  <ellipse cx="210" cy="155" rx="190" ry="55"  fill="#D8EEF8" />
                  <ellipse cx="105" cy="112" rx="90"  ry="76"  fill="#E4F2FA" />
                  <ellipse cx="210" cy="82"  rx="115" ry="96"  fill="#EEF7FF" />
                  <ellipse cx="318" cy="118" rx="85"  ry="68"  fill="#E4F2FA" />
                  <ellipse cx="175" cy="50"  rx="78"  ry="62"  fill="#F6FBFF" />
                  <ellipse cx="248" cy="40"  rx="68"  ry="56"  fill="#FFFFFF"  />
                  <ellipse cx="128" cy="76"  rx="55"  ry="44"  fill="#F2F9FF"  />
                  <ellipse cx="305" cy="82"  rx="52"  ry="42"  fill="#F2F9FF"  />
                  <ellipse cx="218" cy="26"  rx="48"  ry="36"  fill="#FFFFFF"  />
                </svg>
              </div>
            ))}
          </div>
          <div className="animate-cloud-drift-slow" style={{ width: '200%', height: '100%', position: 'absolute' }}>
            {[
              { top: '26%', left: '10%',  opacity: 0.65 },
              { top: '20%', left: '38%',  opacity: 0.6  },
              { top: '28%', left: '64%',  opacity: 0.65 },
              { top: '22%', left: '88%',  opacity: 0.55 },
              { top: '26%', left: '60%',  opacity: 0.65 },
              { top: '20%', left: '88%',  opacity: 0.6  },
            ].map((s, i) => (
              <div key={i} className="absolute pointer-events-none" style={s}>
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
            ))}
          </div>
        </div>

        {/* Scrolling background container */}
        <div
          ref={bgRef}
          className="absolute top-0 left-0 h-full"
          style={{ width: '200%', willChange: 'transform' }}
        >
          {/* ── Distant back hills (both halves) ── */}
          {[0, 1].map(half => (
            <div
              key={`hills-${half}`}
              className="absolute pointer-events-none"
              style={{ left: `${half * 50}%`, bottom: '40%', width: '50%', height: '130px' }}
            >
              <svg viewBox="0 0 1000 130" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
                <ellipse cx="180"  cy="130" rx="300" ry="100" fill="#5AAE30" opacity="0.35" />
                <ellipse cx="600"  cy="130" rx="380" ry="110" fill="#4E9E28" opacity="0.30" />
                <ellipse cx="950"  cy="130" rx="280" ry="90"  fill="#5AAE30" opacity="0.35" />
                <ellipse cx="100"  cy="130" rx="220" ry="72"  fill="#70C038" opacity="0.42" />
                <ellipse cx="500"  cy="130" rx="310" ry="82"  fill="#68B830" opacity="0.38" />
                <ellipse cx="870"  cy="130" rx="260" ry="70"  fill="#70C038" opacity="0.42" />
              </svg>
            </div>
          ))}

          {/* ── Hand-drawn SVG grass hill (both halves) ── */}
          {[0, 1].map(half => (
            <div
              key={`ground-${half}`}
              className="absolute bottom-0"
              style={{ left: `${half * 50}%`, width: '50%', height: '40%' }}
            >
              <GrassHill heightPct={100} gradId={`gameHillGrad${half}`}>
                {GROUND_FLOWERS.map((f, i) => <FlowerSprite key={i} {...f} />)}
              </GrassHill>
            </div>
          ))}
        </div>

        {/* ── Wolf (absolutely positioned in scene) ── */}
        <div
          ref={wolfRef}
          className="absolute z-10"
          style={{
            bottom: '40%',
            left: `${rabbitScreenXRef.current - INITIAL_DISTANCE - 60}px`,
            transformOrigin: 'center bottom',
          }}
        >
          <Wolf running={true} danger={danger} size={0.9} />
        </div>

        {/* ── Rabbit (fixed at 38% from left) ── */}
        <div
          ref={rabbitContainerRef}
          className="absolute z-10"
          style={{ left: '38%', bottom: '40%', transform: 'translateX(-50%)' }}
        >
          <Rabbit running={true} size={1} />
        </div>
      </div>

      {/* ── Typing section ── */}
      {/* min-height/max-height so it compresses on small viewports (iOS keyboard open) */}
      <div
        className="flex-shrink-0 z-20 flex flex-col items-center justify-center gap-2 px-6"
        style={{
          minHeight: '130px',
          maxHeight: '180px',
          height: '180px',
          background: 'linear-gradient(180deg, rgba(74,130,50,0.95) 0%, rgba(45,80,30,0.98) 100%)',
          borderTop: '3px solid rgba(255,255,255,0.15)',
        }}
      >
        {/* Word prompt */}
        <div className="text-2xl font-black tracking-widest text-white opacity-40 pointer-events-none">
          {currentWord}
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          inputMode="text"
          enterKeyHint="go"
          value={inputVal}
          onChange={handleInput}
          onKeyDown={e => {
            // Prevent space from submitting (anti-cheat)
            if (e.key === ' ') e.preventDefault()
          }}
          className="
            w-full max-w-md px-5 py-3 rounded-2xl
            text-xl font-bold text-gray-800
            bg-white bg-opacity-95
            input-glow
            border-2 border-green-300
          "
          placeholder="Type here..."
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />

        {/* Distance + speed meters */}
        <div className="flex gap-6 items-center w-full max-w-md">
          <div className="flex-1">
            <div className="flex justify-between text-xs text-green-200 mb-1 font-semibold">
              <span>DISTANCE</span>
              <span>{distancePct}%</span>
            </div>
            <div className="w-full h-2.5 bg-black bg-opacity-30 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full speed-bar"
                style={{
                  width: `${distancePct}%`,
                  background: distance < 80
                    ? '#f44336'
                    : distance < 150
                    ? '#ff9800'
                    : '#4ade80',
                }}
              />
            </div>
          </div>
          <div className="text-green-200 text-xs font-bold text-right">
            <div>{score}/{VICTORY_SCORE} words</div>
            <div className="text-green-300">{wpm} WPM</div>
          </div>
        </div>
      </div>
    </div>
  )
}
