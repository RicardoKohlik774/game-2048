
import type { Tile } from "../types";

interface GameBoardProps {
  tiles: Tile[];
}

export default function GameBoard({ tiles }: GameBoardProps) {
  return <div className="game-board">{/* TODO */}</div>;
}
