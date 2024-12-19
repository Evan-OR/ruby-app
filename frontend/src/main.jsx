import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
import App from './App.jsx';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

dayjs.locale('en-gb');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme={false}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
          <App />
        </LocalizationProvider>
      </CssBaseline>
    </ThemeProvider>
  </StrictMode>
);
