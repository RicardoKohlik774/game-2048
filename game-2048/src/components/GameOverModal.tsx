
import type { GameStatus } from "../types";

interface GameOverModalProps {
  status: Extract<GameStatus, "won" | "lost">;
  score: number;
  onRestart: () => void;
}

export default function GameOverModal({ status, score, onRestart }: GameOverModalProps) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{status === "won" ? "🎉 Vyhrál jsi!" : "💀 Konec hry"}</h2>
        <p>Skóre: {score}</p>
        <button onClick={onRestart}>Hrát znovu</button>
      </div>
    </div>
  );
}
