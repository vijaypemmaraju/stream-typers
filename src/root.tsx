import React, { FC } from 'react';
import { render } from 'react-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import App from './App';

const darkTheme = createTheme({
  palette: {},
  typography: {
    fontFamily: 'monospace',
  },
});

const Root: FC = () => (
  <ThemeProvider theme={darkTheme}>
    <App />
  </ThemeProvider>
);

render(<Root />, document.getElementById('ui'));
