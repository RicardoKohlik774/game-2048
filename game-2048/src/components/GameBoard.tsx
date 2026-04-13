import type { Tile } from "../types";
import TileComponent from "./Tile";
import { theme } from "../theme";

interface GameBoardProps {
  tiles: Tile[];
}

const EMPTY_CELLS = Array.from({ length: 16 }, (_, i) => i);

export default function GameBoard({ tiles }: GameBoardProps) {
  return (
      <div
          className="game-board"
          style={{ backgroundColor: theme.colors.boardBg, borderRadius: theme.layout.borderRadius }}
      >
        {EMPTY_CELLS.map((i) => (
            <div
                key={i}
                className="cell-empty"
                style={{ backgroundColor: theme.colors.emptyCellBg, borderRadius: theme.layout.borderRadius }}
            />
        ))}
        {tiles.map((tile) => (
            <TileComponent key={tile.id} tile={tile} />
        ))}
      </div>
  );
}