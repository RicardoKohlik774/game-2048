// ============================================================
// src/types.ts  –  sdílené TypeScript typy pro hru 2048
// ============================================================

/** Jedna dlaždice na herním poli */
export interface Tile {
  id: number;       // unikátní ID pro React key + animace
  value: number;    // 2, 4, 8, 16 … 2048
  row: number;      // 0–3
  col: number;      // 0–3
  isNew?: boolean;      // právě přidaná dlaždice (spawn animace)
  isMerged?: boolean;   // právě sloučená dlaždice (pop animace)
}

/** 4×4 herní pole – null = prázdná buňka */
export type Board = (Tile | null)[][];

/** Směr pohybu hráče */
export type Direction = "up" | "down" | "left" | "right";

/** Celkový stav hry */
export interface GameState {
  board: Board;
  tiles: Tile[];        // flat list pro rendering
  score: number;
  bestScore: number;
  status: GameStatus;
}

/** Fáze hry */
export type GameStatus = "idle" | "playing" | "won" | "lost";

/** Data uložená v localStorage */
export interface SavedData {
  bestScore: number;
}
