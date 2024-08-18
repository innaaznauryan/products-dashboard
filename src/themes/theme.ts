import { createTheme } from '@mui/material/styles';

const commonStyles = {
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& fieldset': {
            borderColor: 'gray !important',
            color: 'gray !important',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'gray !important',
            color: 'gray !important',
          },
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          '& .MuiPaginationItem-root': {
            color: '#808080',
          },
          '& .Mui-selected': {
            backgroundColor: '#1976d2',
            color: '#fff',
          },
          '& .MuiPaginationItem-root:hover': {
            backgroundColor: 'rgba(25, 118, 210, 0.08)',
          },
        },
      },
    },
  },
};

export const theme = createTheme({
  ...commonStyles,
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#808080',
    },
    mode: 'light',
  },
});