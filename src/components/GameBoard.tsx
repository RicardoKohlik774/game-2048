import type { Tile } from '../types'
import TileComponent from './Tile'

interface GameBoardProps { tiles: Tile[] }

export default function GameBoard({ tiles }: GameBoardProps) {
  return (
    <div className="game-board">
      {Array.from({ length: 16 }).map((_, i) => (
        <div key={i} className="empty-cell" />
      ))}
      {tiles.map(tile => (
        <TileComponent key={tile.id} tile={tile} />
      ))}
    </div>
  )
} 