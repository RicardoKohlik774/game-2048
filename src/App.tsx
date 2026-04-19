import './App.css'
import ScoreBoard from './components/ScoreBoard'
import GameControls from './components/GameControls'
import GameBoard from './components/GameBoard'
import GameOverModal from './components/GameOverModal'
import { useGameLogic } from './hooks/useGameLogic'
import { useInput } from './hooks/useInput'

function App() {
  const { gameState, newGame, move } = useGameLogic()
  useInput(move)

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">2048</h1>
        <div className="header-right">
          <ScoreBoard score={gameState.score} bestScore={gameState.bestScore} />
          <GameControls onNewGame={newGame} />
        </div>
      </header>

      <main>
        <div className="game-board-wrapper">
          <GameBoard tiles={gameState.tiles} />
          {(gameState.status === 'won' || gameState.status === 'lost') && (
            <GameOverModal
              status={gameState.status}
              score={gameState.score}
              onRestart={newGame}
            />
          )}
        </div>
      </main>

      <footer className="app-footer">
        <p>Spoj dlaždice a dosáhni hodnoty <strong>2048</strong>!</p>
        <p>Ovládání: šipky nebo WASD na klávesnici, swipe na mobilu.</p>
      </footer>
    </div>
  )
}

export default App