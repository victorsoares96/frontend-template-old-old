import { ThemeOptions } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';

import { Themes } from './types';

const sharedTheme: ThemeOptions = {
  typography: {
    fontFamily: 'Montserrat, Work Sans, sans-serif',
  },
  palette: {
    background: {
      default: '#ffffff',
      paper: '#fafafa',
    },
    primary: {
      main: '#7109B4',
      light: '#7B2CBF',
      dark: '#560BAD',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#D2F77A',
      light: '#dcf5a2',
      dark: '#658025',
      contrastText: 'rgba(0,0,0,0.87)',
    },
    error: {
      main: '#f44336',
      light: '#f6685e',
      dark: '#aa2e25',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#ff9800',
      light: '#ffac33',
      dark: '#b26a00',
      contrastText: 'rgba(0,0,0,0.87)',
    },
    info: {
      main: '#585ce5',
      light: '#777af3',
      dark: '#6B5EFF',
      contrastText: '#ffffff',
    },
    success: {
      main: '#4caf50',
      light: '#6fbf73',
      dark: '#357a38',
      contrastText: 'rgba(0,0,0,0.87)',
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '50px',
        },
        contained: {
          background: 'linear-gradient(60deg, #6B5EFF 0%, #7109B4 82%)',
          transition: 'background 1s ease-out',
          backgroundSize: '1px 200px',
          ':hover': {
            backgroundPosition: '100px',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: '50px',
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          fontSize: '14px',
          padding: '6px 0',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        vertical: {
          marginRight: 10,
          marginLeft: 10,
        },
        // TODO: open issue for missing "horizontal" CSS rule
        // in Divider API - https://mui.com/material-ui/api/divider/#css
        middle: {
          marginTop: 10,
          marginBottom: 10,
          width: '80%',
        },
      },
    },
  },
} as ThemeOptions; // the reason for this casting is deepmerge return type
// TODO (Suren): replace mui-utils-deepmerge with lodash or ramda deepmerge

const themes: Record<Themes, ThemeOptions> = {
  light: deepmerge(sharedTheme, {
    palette: {
      mode: 'light',
      background: {
        default: '#efefef',
        paper: '#fafafa',
      },
      secondary: {
        main: '#aacc00',
        light: '#dcf5a2',
        dark: '#658025',
        contrastText: 'rgba(0,0,0,0.87)',
      },
      text: {
        primary: 'rgba(0,0,0,0.87)',
        secondary: 'rgba(0,0,0,0.54)',
        disabled: 'rgba(0,0,0,0.38)',
        hint: 'rgba(0,0,0,0.38)',
      },
      divider: 'rgba(0,0,0,0.12)',
    },
  } as ThemeOptions),

  dark: deepmerge(sharedTheme, {
    palette: {
      mode: 'dark',
      background: {
        default: '#151518',
        paper: '#1C1B1B',
      },
      text: {
        primary: '#fff',
        secondary: 'rgba(255,255,255,0.7)',
        disabled: 'rgba(255,255,255,0.5)',
        hint: 'rgba(255,255,255,0.5)',
      },
      divider: 'rgba(255,255,255,0.12)',
    },
  } as ThemeOptions),
};

export default themes;
