import { ThemeProvider, createTheme } from '@mui/material/styles';

import { useAppSelector } from '@/hooks/useAppSelector';

import themes from './themes';
import type { CustomThemeProviderProps } from './types';

function CustomThemeProvider({ children }: CustomThemeProviderProps) {
  const theme = useAppSelector((state) => state.theme.themeMode);

  return <ThemeProvider theme={createTheme(themes[theme])}>{children}</ThemeProvider>;
}

export default CustomThemeProvider;
