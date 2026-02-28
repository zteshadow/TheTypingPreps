import Rabbit from './Rabbit'
import Wolf from './Wolf'

export default function EndScreen({ isVictory, score, wpm, onRestart, onMenu }) {
  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: isVictory
          ? 'linear-gradient(180deg, #1A8FBF 0%, #2BAED8 20%, #5CC8E8 45%, #90DCF0 68%, #C4F0FF 85%, #D8F8FF 100%)'
          : 'linear-gradient(135deg, #1a1a2e 0%, #2d0a0a 55%, #0a0a18 100%)',
      }}
    >
      {/* ── Background decoration ── */}
      {isVictory && (
        <>
          {/* Scattered flowers */}
          {[
            { x: '5%', y: '60%', color: '#ff6b9d' },
            { x: '15%', y: '70%', color: '#ffd700' },
            { x: '80%', y: '65%', color: '#c084fc' },
            { x: '90%', y: '72%', color: '#60a5fa' },
            { x: '50%', y: '80%', color: '#ff8c42' },
          ].map((f, i) => (
            <div
              key={i}
              className="absolute animate-sway"
              style={{ left: f.x, top: f.y }}
            >
              <svg viewBox="0 0 24 32" width="28" height="36">
                <line x1="12" y1="32" x2="12" y2="14" stroke="#5d9e44" strokeWidth="2" strokeLinecap="round" />
                {[0, 60, 120, 180, 240, 300].map((angle, j) => (
                  <ellipse
                    key={j}
                    cx={12 + 5 * Math.cos((angle * Math.PI) / 180)}
                    cy={9 + 5 * Math.sin((angle * Math.PI) / 180)}
                    rx="4" ry="3" fill={f.color} opacity="0.85"
                  />
                ))}
                <circle cx="12" cy="9" r="4" fill="#ffd700" />
              </svg>
            </div>
          ))}
        </>
      )}

      {/* ── Character display ── */}
      <div className={`mb-6 ${isVictory ? 'animate-bob' : ''}`}>
        {isVictory ? (
          <Rabbit running={false} size={1.5} />
        ) : (
          <Wolf running={false} danger={false} size={1.3} />
        )}
      </div>

      {/* ── Title ── */}
      <h1
        className="text-6xl font-black mb-3"
        style={{
          color: isVictory ? '#2d6a2d' : '#f44336',
          textShadow: isVictory
            ? '2px 2px 0 white, 4px 4px 0 rgba(0,0,0,0.1)'
            : '2px 2px 0 #1a1a1a, 0 0 30px rgba(244,67,54,0.5)',
        }}
      >
        {isVictory ? '🐰 ESCAPED!' : '🐺 CAUGHT!'}
      </h1>

      <p
        className="text-xl font-bold mb-8"
        style={{ color: isVictory ? '#4a8232' : '#9e9e9e' }}
      >
        {isVictory
          ? 'The rabbit outwitted the wolf!'
          : 'The wolf was too fast this time...'}
      </p>

      {/* ── Stats ── */}
      <div
        className="flex gap-8 mb-10 px-10 py-5 rounded-2xl"
        style={{
          background: isVictory
            ? 'rgba(255,255,255,0.6)'
            : 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(8px)',
          border: `2px solid ${isVictory ? 'rgba(74,130,50,0.3)' : 'rgba(244,67,54,0.3)'}`,
        }}
      >
        <div className="text-center">
          <div
            className="text-4xl font-black"
            style={{ color: isVictory ? '#2d6a2d' : '#f44336' }}
          >
            {score}
          </div>
          <div
            className="text-sm font-bold mt-1"
            style={{ color: isVictory ? '#5d9e44' : '#757575' }}
          >
            WORDS TYPED
          </div>
        </div>
        <div
          className="w-px self-stretch"
          style={{ background: isVictory ? 'rgba(74,130,50,0.3)' : 'rgba(255,255,255,0.15)' }}
        />
        <div className="text-center">
          <div
            className="text-4xl font-black"
            style={{ color: isVictory ? '#2d6a2d' : '#f44336' }}
          >
            {wpm}
          </div>
          <div
            className="text-sm font-bold mt-1"
            style={{ color: isVictory ? '#5d9e44' : '#757575' }}
          >
            WPM
          </div>
        </div>
      </div>

      {/* ── Buttons ── */}
      <div className="flex gap-4">
        <button
          onClick={onRestart}
          className="
            px-8 py-3.5 rounded-full text-lg font-black text-white
            transition-all duration-200 hover:scale-105 active:scale-95
          "
          style={{
            background: isVictory ? '#4CAF50' : '#f44336',
            boxShadow: isVictory
              ? '0 5px 0 #2d7d32, 0 7px 20px rgba(76,175,80,0.4)'
              : '0 5px 0 #b71c1c, 0 7px 20px rgba(244,67,54,0.4)',
            textShadow: '0 1px 2px rgba(0,0,0,0.3)',
          }}
        >
          {isVictory ? '▶ PLAY AGAIN' : '▶ TRY AGAIN'}
        </button>

        <button
          onClick={onMenu}
          className="
            px-8 py-3.5 rounded-full text-lg font-black
            transition-all duration-200 hover:scale-105 active:scale-95
          "
          style={{
            background: 'rgba(255,255,255,0.15)',
            color: isVictory ? '#2d6a2d' : '#9e9e9e',
            border: `2px solid ${isVictory ? 'rgba(74,130,50,0.4)' : 'rgba(255,255,255,0.2)'}`,
          }}
        >
          ⬅ MAIN MENU
        </button>
      </div>
    </div>
  )
}
