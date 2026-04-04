


export interface Tile {
  id: number;
  value: number;
  row: number;
  col: number;
  isNew?: boolean;
  isMerged?: boolean;
}


export type Board = (Tile | null)[][];


export type Direction = "up" | "down" | "left" | "right";


export interface GameState {
  board: Board;
  tiles: Tile[];
  score: number;
  bestScore: number;
  status: GameStatus;
}


export type GameStatus = "idle" | "playing" | "won" | "lost";


export interface SavedData {
  bestScore: number;
}
