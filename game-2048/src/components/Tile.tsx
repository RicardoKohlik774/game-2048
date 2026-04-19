import type { Tile } from '../types'

interface TileProps { tile: Tile }

const PADDING = 8
const GAP = 8

export default function TileComponent({ tile }: TileProps) {
  const tileClass = tile.value > 2048 ? 'tile tile-super' : `tile tile-${tile.value}`
  const animClass = tile.isNew ? 'tile-new' : tile.isMerged ? 'tile-merged' : ''

  const cellSize  = `calc(25% - ${(3 * GAP + 2 * PADDING) / 4}px)`
  const cellStep  = `calc(25% - ${(3 * GAP + 2 * PADDING) / 4 - GAP}px)`

  const style = {
    top:    `calc(${PADDING}px + ${tile.row} * ${cellStep})`,
    left:   `calc(${PADDING}px + ${tile.col} * ${cellStep})`,
    width:  cellSize,
    height: cellSize,
  }

  return (
    <div className={`${tileClass} ${animClass}`} style={style}>
      {tile.value}
    </div>
  )
}