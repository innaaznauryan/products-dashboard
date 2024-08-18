import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "./themes/theme.ts";
import { store } from './redux/store.ts';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <StrictMode>
          <App />
        </StrictMode>
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
)
