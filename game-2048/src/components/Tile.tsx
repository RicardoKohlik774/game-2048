
import type { Tile } from "../types";

interface TileProps {
  tile: Tile;
}

export default function TileComponent({ tile }: TileProps) {
  return <div className={`tile tile-${tile.value}`}>{/* TODO */}</div>;
}
