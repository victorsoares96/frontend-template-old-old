import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Themes } from '@/theme/types';

import type { InitialState } from './types';

function getStoredTheme(): Themes {
  const theme = localStorage.getItem('theme-mode');
  return theme === 'dark' ? Themes.DARK : Themes.LIGHT;
}

const initialState: InitialState = {
  themeMode: getStoredTheme(),
};

const slice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    reset: () => initialState,
    toggle: (state) => {
      const nextTheme = state.themeMode === Themes.DARK ? Themes.LIGHT : Themes.DARK;
      state.themeMode = nextTheme;
      localStorage.setItem('theme-mode', nextTheme);
    },
    changeTheme: (state, action: PayloadAction<Themes>) => {
      const { payload } = action;
      state.themeMode = payload;
      localStorage.setItem('theme-mode', payload);
    },
  },
});

export const { toggle, changeTheme } = slice.actions;

export default slice.reducer;
