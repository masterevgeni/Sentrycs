import {createTheme } from '@mui/material';
export const theme = createTheme({
  palette: {
    primary: {
      main: '#2196F3',
      dark: '#1976D2',
    },
    secondary: {
      main: '#FF4081',
    },
    success: {
      main: '#4CAF50',
    },
    error: {
      main: '#F44336',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 700,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});