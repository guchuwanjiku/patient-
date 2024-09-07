// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Example color
    },
    secondary: {
      main: '#dc004e', // Example color
    },
  },
  typography: {
    h1: {
      fontSize: '2rem',
    },
  },
});

export default theme;
