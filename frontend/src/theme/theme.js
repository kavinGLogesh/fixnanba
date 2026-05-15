import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#82b8d6', light: '#b7dbf4', dark: '#074c71' },
    error: { main: '#FF4D4D' },
    success: { main: '#22C55E' },
    warning: { main: '#FACC15' },
    background: { default: '#F0F4FF', paper: '#FFFFFF' },
    text: { primary: '#0F172A', secondary: '#475569' },
  },
  typography: {
    fontFamily: '"Poppins", "Inter", "Noto Sans Tamil", sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.02em' },
    h2: { fontWeight: 700, letterSpacing: '-0.01em' },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { fontWeight: 600, textTransform: 'none' },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '12px 24px',
          fontSize: '1rem',
          boxShadow: 'none',
          '&:hover': { boxShadow: '0 8px 24px rgba(30,58,138,0.2)' },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #1E3A8A 0%, #3B5FD4 100%)',
        },
        containedError: {
          background: 'linear-gradient(135deg, #FF4D4D 0%, #FF7070 100%)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
          border: '1px solid rgba(255,255,255,0.8)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600, borderRadius: 8 },
      },
    },
  },
});

export default theme;
