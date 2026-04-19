import { useState, useCallback, useEffect } from 'react'
import type { GameState, Direction, Tile } from '../types'

const SAVE_KEY = '2048-state'
const BEST_KEY = '2048-best'

let nextId = 1

function createTile(row: number, col: number, value: number): Tile {
  return { id: nextId++, value, row, col, isNew: true, isMerged: false }
}

function addRandomTile(tiles: Tile[]): Tile[] {
  const occupied = new Set(tiles.map(t => `${t.row},${t.col}`))
  const empty: [number, number][] = []
  for (let r = 0; r < 4; r++)
    for (let c = 0; c < 4; c++)
      if (!occupied.has(`${r},${c}`)) empty.push([r, c])
  if (empty.length === 0) return tiles
  const [row, col] = empty[Math.floor(Math.random() * empty.length)]
  return [...tiles, createTile(row, col, Math.random() < 0.9 ? 2 : 4)]
}

function slideRow(row: (Tile | null)[]): { row: Tile[], score: number } {
  const filtered = row.filter(Boolean) as Tile[]
  let score = 0
  const merged: Tile[] = []
  let i = 0
  while (i < filtered.length) {
    if (i + 1 < filtered.length && filtered[i].value === filtered[i + 1].value) {
      const val = filtered[i].value * 2
      score += val
      merged.push({ ...filtered[i], value: val, isMerged: true, isNew: false })
      i += 2
    } else {
      merged.push({ ...filtered[i], isNew: false, isMerged: false })
      i++
    }
  }
  return { row: merged, score }
}

function moveTiles(tiles: Tile[], direction: Direction): { tiles: Tile[], score: number } {
  const grid: (Tile | null)[][] = Array.from({ length: 4 }, () => Array(4).fill(null))
  tiles.forEach(t => { grid[t.row][t.col] = t })

  let totalScore = 0
  const newTiles: Tile[] = []

  if (direction === 'left' || direction === 'right') {
    for (let r = 0; r < 4; r++) {
      const row = grid[r]
      const filtered = (direction === 'left' ? row : [...row].reverse()).filter(Boolean) as Tile[]
      const { row: slid, score } = slideRow(filtered)
      totalScore += score
      while (slid.length < 4) slid.push(null as any)
      const final = direction === 'left' ? slid : [...slid].reverse()
      final.forEach((t, c) => { if (t) newTiles.push({ ...t, row: r, col: c }) })
    }
  } else {
    for (let c = 0; c < 4; c++) {
      const col = grid.map(r => r[c])
      const filtered = (direction === 'up' ? col : [...col].reverse()).filter(Boolean) as Tile[]
      const { row: slid, score } = slideRow(filtered)
      totalScore += score
      while (slid.length < 4) slid.push(null as any)
      const final = direction === 'up' ? slid : [...slid].reverse()
      final.forEach((t, r) => { if (t) newTiles.push({ ...t, row: r, col: c }) })
    }
  }

  return { tiles: newTiles, score: totalScore }
}

function hasMoves(tiles: Tile[]): boolean {
  if (tiles.length < 16) return true
  const grid: number[][] = Array.from({ length: 4 }, () => Array(4).fill(0))
  tiles.forEach(t => { grid[t.row][t.col] = t.value })
  for (let r = 0; r < 4; r++)
    for (let c = 0; c < 4; c++) {
      if (c < 3 && grid[r][c] === grid[r][c + 1]) return true
      if (r < 3 && grid[r][c] === grid[r + 1][c]) return true
    }
  return false
}

function saveState(state: GameState) {
  try {
    // Ulož jen pokud hra probíhá — nemá smysl ukládat won/lost
    if (state.status === 'playing') {
      localStorage.setItem(SAVE_KEY, JSON.stringify({
        tiles: state.tiles,
        score: state.score,
        status: state.status,
      }))
    } else {
      localStorage.removeItem(SAVE_KEY)
    }
    localStorage.setItem(BEST_KEY, String(state.bestScore))
  } catch { /* noop */ }
}

function loadState(): GameState {
  const bestScore = parseInt(localStorage.getItem(BEST_KEY) ?? '0') || 0
  try {
    const raw = localStorage.getItem(SAVE_KEY)
    if (raw) {
      const saved = JSON.parse(raw)
      if (saved.tiles?.length && saved.status === 'playing') {
        return { board: [], tiles: saved.tiles, score: saved.score, bestScore, status: 'playing' }
      }
    }
  } catch { /* noop */ }
  // Žádná uložená hra — začni novou
  let tiles: Tile[] = []
  tiles = addRandomTile(tiles)
  tiles = addRandomTile(tiles)
  return { board: [], tiles, score: 0, bestScore, status: 'playing' }
}

export function useGameLogic() {
  const [gameState, setGameState] = useState<GameState>(loadState)

  // Ulož stav při každé změně
  useEffect(() => { saveState(gameState) }, [gameState])

  const newGame = useCallback(() => {
    setGameState(prev => {
      let tiles: Tile[] = []
      tiles = addRandomTile(tiles)
      tiles = addRandomTile(tiles)
      return { board: [], tiles, score: 0, bestScore: prev.bestScore, status: 'playing' }
    })
  }, [])

  const move = useCallback((direction: Direction) => {
    setGameState(prev => {
      if (prev.status !== 'playing') return prev
      const { tiles: moved, score: gained } = moveTiles(prev.tiles, direction)

      const changed = moved.some(t => {
        const orig = prev.tiles.find(o => o.id === t.id)
        return !orig || orig.row !== t.row || orig.col !== t.col
      }) || moved.length !== prev.tiles.length

      if (!changed) return prev

      const withNew = addRandomTile(moved)
      const newScore = prev.score + gained
      const bestScore = Math.max(prev.bestScore, newScore)

      const hasWon = withNew.some(t => t.value >= 2048)
      const status = hasWon ? 'won' : !hasMoves(withNew) ? 'lost' : 'playing'

      return { ...prev, tiles: withNew, score: newScore, bestScore, status }
    })
  }, [])

  return { gameState, newGame, move }
}