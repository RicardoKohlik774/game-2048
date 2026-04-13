# Strom komponent – 2048

## Struktura

```
App
├── ScoreBoard          (score, bestScore)
├── GameControls        (onNewGame)
├── GameBoard           (tiles[])
│   └── Tile × N        (tile: Tile)
└── GameOverModal?      (status, score, onRestart)  ← zobrazí se podmíněně
```

## Zodpovědnosti

| Komponenta      | Co dělá                                              | Stav / Props                          |
|-----------------|------------------------------------------------------|---------------------------------------|
| `App`           | Drží celý GameState, zpracovává input (klávesy/swipe)| `useState<GameState>`                 |
| `ScoreBoard`    | Zobrazuje score + bestScore                          | props: score, bestScore               |
| `GameControls`  | Tlačítko Nová hra                                    | props: onNewGame()                    |
| `GameBoard`     | Renderuje 4×4 mřížku + dlaždice                     | props: tiles[]                        |
| `Tile`          | Jedna dlaždice, barva dle hodnoty, animace           | props: tile (Tile)                    |
| `GameOverModal` | Overlay při výhře/prohře                             | props: status, score, onRestart()     |

## Logika (hooks / utils – mimo komponenty)

```
src/
  hooks/
    useGameLogic.ts    ← pohyb, merge, spawn nové dlaždice, detekce konce
    useInput.ts        ← keyboard listener + touch/swipe
  utils/
    boardUtils.ts      ← pure funkce: slide, merge, isGameOver, addRandomTile
  data/
    sampleBoards.ts    ← vzorová data pro vývoj
  types.ts
  theme.ts             ← (Role A)
```

## Tok dat

```
useInput → direction → useGameLogic → GameState → App → props dolů do komponent
                                                ↓
                                         localStorage (bestScore)
```
