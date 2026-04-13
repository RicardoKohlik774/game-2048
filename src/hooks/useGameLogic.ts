import { useState, useCallback, useEffect } from 'react'
import type { GameState, Direction, Tile } from '../types'

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
      let row = direction === 'left' ? grid[r] : [...grid[r]].reverse()
      const { row: slid, score } = slideRow(row)
      totalScore += score
      if (direction === 'right') slid.reverse()
      slid.forEach((t, c) => {
        newTiles.push({ ...t, row: r, col: direction === 'left' ? c : 3 - c })
      })
    }
  } else {
    for (let c = 0; c < 4; c++) {
      let col = grid.map(r => r[c])
      if (direction === 'down') col = [...col].reverse()
      const { row: slid, score } = slideRow(col)
      totalScore += score
      if (direction === 'down') slid.reverse()
      slid.forEach((t, r) => {
        newTiles.push({ ...t, row: direction === 'up' ? r : 3 - r, col: c })
      })
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

const INITIAL_STATE: GameState = {
  board: [],
  tiles: [],
  score: 0,
  bestScore: 0,
  status: 'idle'
}

export function useGameLogic() {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem('2048-best')
    const bestScore = saved ? parseInt(saved) : 0
    return { ...INITIAL_STATE, bestScore }
  })

  const newGame = useCallback(() => {
    setGameState(prev => {
      let tiles: Tile[] = []
      tiles = addRandomTile(tiles)
      tiles = addRandomTile(tiles)
      return { ...INITIAL_STATE, tiles, bestScore: prev.bestScore, status: 'playing' }
    })
  }, [])

  useEffect(() => { newGame() }, [])

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
      localStorage.setItem('2048-best', String(bestScore))

      const hasWon = withNew.some(t => t.value >= 2048)
      const status = hasWon ? 'won' : !hasMoves(withNew) ? 'lost' : 'playing'

      return { ...prev, tiles: withNew, score: newScore, bestScore, status }
    })
  }, [])

  return { gameState, newGame, move }
}