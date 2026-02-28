import { useState, useEffect } from 'react'
import StartScreen from './components/StartScreen'
import GameScreen from './components/GameScreen'
import EndScreen from './components/EndScreen'

// ── iOS Visual Viewport fix ──
// On iOS Safari, window.innerHeight does NOT shrink when the keyboard opens.
// Only window.visualViewport.height reflects the true visible area.
// We write it to --app-height so the root container tracks it exactly.
function useAppHeight() {
  useEffect(() => {
    function update() {
      const h = window.visualViewport ? window.visualViewport.height : window.innerHeight
      document.documentElement.style.setProperty('--app-height', `${h}px`)
    }
    update()
    window.visualViewport?.addEventListener('resize', update)
    window.visualViewport?.addEventListener('scroll', update)
    return () => {
      window.visualViewport?.removeEventListener('resize', update)
      window.visualViewport?.removeEventListener('scroll', update)
    }
  }, [])
}

// Game states: 'start' | 'playing' | 'over' | 'victory'
export default function App() {
  useAppHeight()

  const [gameState, setGameState] = useState('start')
  const [finalScore, setFinalScore] = useState(0)
  const [finalWpm, setFinalWpm] = useState(0)

  function handleStart() { setGameState('playing') }

  function handleGameOver(score, wpm) {
    setFinalScore(score); setFinalWpm(wpm); setGameState('over')
  }

  function handleVictory(score, wpm) {
    setFinalScore(score); setFinalWpm(wpm); setGameState('victory')
  }

  return (
    <div
      className="overflow-hidden font-nunito"
      // Use --app-height (updated by visualViewport) so the container
      // always matches the visible area above the iOS keyboard.
      style={{ width: '100vw', height: 'var(--app-height, 100svh)' }}
    >
      {gameState === 'start' && <StartScreen onStart={handleStart} />}
      {gameState === 'playing' && (
        <GameScreen onGameOver={handleGameOver} onVictory={handleVictory} />
      )}
      {(gameState === 'over' || gameState === 'victory') && (
        <EndScreen
          isVictory={gameState === 'victory'}
          score={finalScore}
          wpm={finalWpm}
          onRestart={() => setGameState('playing')}
          onMenu={() => setGameState('start')}
        />
      )}
    </div>
  )
}
