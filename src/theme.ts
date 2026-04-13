// src/theme.ts

export const theme = {
  colors: {
    // Globální pozadí aplikace a mřížky
    appBg: '#faf8ef',
    boardBg: '#bbada0',
    emptyCellBg: '#cdc1b4',
    
    // Barvy textů
    textDark: '#776e65',  // Pro menší čísla a nadpisy
    textLight: '#f9f6f2', // Pro větší čísla a tlačítka
    
    // UI prvky
    buttonBg: '#8f7a66',
    buttonHover: '#9f8b77',

    // Overlay modální okna pro různé stavy (idle, playing, won, lost)
    overlay: {
      default: 'rgba(238, 228, 218, 0.73)', // lost / idle
      won: 'rgba(237, 194, 46, 0.5)',        // won (lehce do žluta)
    },

    // Jednotlivé dlaždice (2 až 2048)
    tiles: {
      2: { bg: '#eee4da', color: '#776e65' },
      4: { bg: '#ede0c8', color: '#776e65' },
      8: { bg: '#f2b179', color: '#f9f6f2' },
      16: { bg: '#f59563', color: '#f9f6f2' },
      32: { bg: '#f67c5f', color: '#f9f6f2' },
      64: { bg: '#f65e3b', color: '#f9f6f2' },
      128: { bg: '#edcf72', color: '#f9f6f2' },
      256: { bg: '#edcc61', color: '#f9f6f2' },
      512: { bg: '#edc850', color: '#f9f6f2' },
      1024: { bg: '#edc53f', color: '#f9f6f2' },
      2048: { bg: '#edc22e', color: '#f9f6f2' },
      super: { bg: '#3c3a32', color: '#f9f6f2' } // Fallback pro hru nad 2048
    }
  },
  
  layout: {
    boardMaxWidthDesktop: '500px',
    boardWidthMobile: '90vw',
    borderRadius: '6px'
  }
};