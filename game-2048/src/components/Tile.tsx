// src/components/Tile.tsx
// Jedna dlaždice – hodnota, barva dle hodnoty, animace spawn/merge
import type { Tile } from "../types";

interface TileProps {
  tile: Tile;
}

export default function TileComponent({ tile }: TileProps) {
  return <div className={`tile tile-${tile.value}`}>{/* TODO */}</div>;
}
