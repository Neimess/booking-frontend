import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ru } from 'date-fns/locale';

import { AuthProvider } from './hooks/useAuth'; // Импортируем AuthProvider

import theme from './theme';
import AppRoutes from './routes';
import Header from './components/common/Header';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
        <CssBaseline />
        <BrowserRouter>
          <AuthProvider>
            <Header />
            <main>
              <AppRoutes />
            </main>
          </AuthProvider>
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
