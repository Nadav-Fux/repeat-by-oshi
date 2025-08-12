import { createTheme, Theme } from '@mui/material/styles';

export const createAppTheme = (direction: 'ltr' | 'rtl'): Theme => {
  return createTheme({
    direction,
    palette: {
      primary: {
        main: '#D4AF37', // Gold
        light: '#E6C866',
        dark: '#B8941F',
        contrastText: '#FFFFFF'
      },
      secondary: {
        main: '#2C2C2C', // Near black
        light: '#4A4A4A',
        dark: '#1A1A1A',
        contrastText: '#FFFFFF'
      },
      background: {
        default: '#FAFAFA',
        paper: '#FFFFFF'
      },
      text: {
        primary: '#2C2C2C',
        secondary: '#666666'
      }
    },
    typography: {
      fontFamily: direction === 'rtl' 
        ? '"Heebo", "Rubik", "Arial", sans-serif'
        : '"Playfair Display", "Georgia", serif',
      h1: {
        fontSize: '3.5rem',
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: '-0.02em'
      },
      h2: {
        fontSize: '2.5rem',
        fontWeight: 600,
        lineHeight: 1.3,
        letterSpacing: '-0.01em'
      },
      h3: {
        fontSize: '2rem',
        fontWeight: 600,
        lineHeight: 1.4
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.4
      },
      h5: {
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.5
      },
      h6: {
        fontSize: '1.125rem',
        fontWeight: 600,
        lineHeight: 1.5
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.6
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.6
      }
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 600,
            padding: '12px 24px'
          },
          contained: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 4px 12px rgba(212, 175, 55, 0.3)'
            }
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
            '&:hover': {
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)'
            }
          }
        }
      }
    }
  });
};