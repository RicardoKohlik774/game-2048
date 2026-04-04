
interface ScoreBoardProps {
  score: number;
  bestScore: number;
}

export default function ScoreBoard({ score, bestScore }: ScoreBoardProps) {
  return (
    <div className="score-board">
      <div className="score">SKÓRE<span>{score}</span></div>
      <div className="best-score">REKORD<span>{bestScore}</span></div>
    </div>
  );
}
