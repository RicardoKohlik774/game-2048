import type { Tile } from "../types";
import { theme } from "../theme";

interface TileProps {
  tile: Tile;
}

export default function TileComponent({ tile }: TileProps) {
  const tileColors =
      theme.colors.tiles[tile.value as keyof typeof theme.colors.tiles] ??
      theme.colors.tiles.super;

  return (
      <div
          className={`tile ${tile.isNew ? "tile-new" : ""} ${tile.isMerged ? "tile-merged" : ""}`}
          style={{
            backgroundColor: tileColors.bg,
            color: tileColors.color,
            borderRadius: theme.layout.borderRadius,
            gridRow: tile.row + 1,
            gridColumn: tile.col + 1,
            fontSize: tile.value >= 1024 ? "1.4rem" : tile.value >= 128 ? "1.8rem" : "2.2rem",
          }}
      >
        {tile.value}
      </div>
  );
}