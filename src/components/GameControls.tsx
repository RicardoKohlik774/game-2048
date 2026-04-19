// src/components/GameControls.tsx
// Tlačítko "Nová hra"
interface GameControlsProps {
  onNewGame: () => void;
}

export default function GameControls({ onNewGame }: GameControlsProps) {
  return (
    <div className="game-controls">
      <button onClick={onNewGame}>Nová hra</button>
    </div>
  );
}
