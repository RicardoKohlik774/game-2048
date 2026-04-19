// ============================================================
// src/data/sampleBoards.ts  –  vzorová data pro testování
// ============================================================

import type { Tile } from "../types";

let nextId = 1;
const t = (value: number, row: number, col: number): Tile => ({
  id: nextId++,
  value,
  row,
  col,
});

// ── 1. Prázdné pole (výchozí stav) ────────────────────────────
export const emptyBoard: Tile[] = [];

// ── 2. Začátek hry – dvě dlaždice ─────────────────────────────
export const startingBoard: Tile[] = [
  t(2, 0, 1),
  t(4, 2, 3),
];

// ── 3. Středně rozehraná hra ───────────────────────────────────
export const midGameBoard: Tile[] = [
  t(2,   0, 0), t(4,   0, 2), t(8,   0, 3),
  t(16,  1, 0), t(32,  1, 1),
  t(64,  2, 2), t(128, 2, 3),
  t(256, 3, 0), t(512, 3, 1), t(4,   3, 3),
];

// ── 4. Téměř výhra – dlaždice 1024 na poli ────────────────────
export const nearWinBoard: Tile[] = [
  t(1024, 0, 0), t(512, 0, 1), t(256, 0, 2), t(128, 0, 3),
  t(64,   1, 0), t(32,  1, 1), t(16,  1, 2), t(8,   1, 3),
  t(4,    2, 0), t(2,   2, 1), t(4,   2, 2), t(2,   2, 3),
  t(2,    3, 0), t(4,   3, 1), t(2,   3, 2),
];

// ── 5. Game Over situace – žádný tah možný ────────────────────
export const gameOverBoard: Tile[] = [
  t(2,   0, 0), t(4,   0, 1), t(2,   0, 2), t(4,   0, 3),
  t(4,   1, 0), t(2,   1, 1), t(4,   1, 2), t(2,   1, 3),
  t(2,   2, 0), t(4,   2, 1), t(2,   2, 2), t(4,   2, 3),
  t(4,   3, 0), t(2,   3, 1), t(4,   3, 2), t(2,   3, 3),
];

// ── Skóre odpovídající vzorům ──────────────────────────────────
export const sampleScores = {
  empty:    { score: 0,    bestScore: 0 },
  start:    { score: 0,    bestScore: 0 },
  midGame:  { score: 1340, bestScore: 2048 },
  nearWin:  { score: 9800, bestScore: 9800 },
  gameOver: { score: 256,  bestScore: 512 },
};
