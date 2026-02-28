import { useState } from 'react'
import StartScreen from './components/StartScreen'
import GameScreen from './components/GameScreen'
import EndScreen from './components/EndScreen'

// Game states: 'start' | 'playing' | 'over' | 'victory'
export default function App() {
  const [gameState, setGameState] = useState('start')
  const [finalScore, setFinalScore] = useState(0)
  const [finalWpm, setFinalWpm] = useState(0)

  function handleStart() {
    setGameState('playing')
  }

  function handleGameOver(score, wpm) {
    setFinalScore(score)
    setFinalWpm(wpm)
    setGameState('over')
  }

  function handleVictory(score, wpm) {
    setFinalScore(score)
    setFinalWpm(wpm)
    setGameState('victory')
  }

  function handleRestart() {
    setGameState('playing')
  }

  return (
    <div className="w-screen h-screen overflow-hidden font-nunito">
      {gameState === 'start' && <StartScreen onStart={handleStart} />}
      {gameState === 'playing' && (
        <GameScreen onGameOver={handleGameOver} onVictory={handleVictory} />
      )}
      {(gameState === 'over' || gameState === 'victory') && (
        <EndScreen
          isVictory={gameState === 'victory'}
          score={finalScore}
          wpm={finalWpm}
          onRestart={handleRestart}
          onMenu={() => setGameState('start')}
        />
      )}
    </div>
  )
}
