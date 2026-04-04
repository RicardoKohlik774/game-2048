// src/components/GameBoard.tsx
// Herní pole 4×4 – renderuje všechny dlaždice
import type { Tile } from "../types";

interface GameBoardProps {
  tiles: Tile[];
}

export default function GameBoard({ tiles }: GameBoardProps) {
  return <div className="game-board">{/* TODO */}</div>;
}
