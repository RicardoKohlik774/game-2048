// src/utils/boardUtils.ts
// Pure funkce – žádný stav, snadno testovatelné
import type { Board, Tile, Direction } from "../types";

/** Přidá náhodnou dlaždici (2 nebo 4) na prázdné místo */
export function addRandomTile(tiles: Tile[]): Tile[] {
  // TODO
  return tiles;
}

/** Zkontroluje zda existuje platný tah */
export function isGameOver(tiles: Tile[]): boolean {
  // TODO
  return false;
}

/** Provede pohyb v daném směru, vrátí nové dlaždice + získané body */
export function moveTiles(tiles: Tile[], direction: Direction): { tiles: Tile[]; gained: number } {
  // TODO
  return { tiles, gained: 0 };
}
