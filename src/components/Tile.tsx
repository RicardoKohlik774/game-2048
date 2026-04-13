import type { Tile } from '../types'

interface TileProps { tile: Tile }

const GAP = 8
const PADDING = 8

export default function TileComponent({ tile }: TileProps) {
  const tileClass = tile.value > 2048 ? 'tile tile-super' : `tile tile-${tile.value}`
  const animClass = tile.isNew ? 'tile-new' : tile.isMerged ? 'tile-merged' : ''

  const style = {
    top: `calc(${PADDING}px + ${tile.row} * (25% - ${GAP * 3 / 4}px + ${GAP}px))`,
    left: `calc(${PADDING}px + ${tile.col} * (25% - ${GAP * 3 / 4}px + ${GAP}px))`,
    width: `calc(25% - ${GAP * 3 / 4}px)`,
    height: `calc(25% - ${GAP * 3 / 4}px)`,
  }

  return (
    <div className={`${tileClass} ${animClass}`} style={style}>
      {tile.value}
    </div>
  )
}