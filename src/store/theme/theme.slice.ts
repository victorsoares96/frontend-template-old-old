import { createSlice } from '@reduxjs/toolkit';

import { Themes } from '@/theme/types';

import type { InitialState } from './types';

const initialState: InitialState = {
  themeMode: Themes.DARK,
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
  },
});

export const { toggle } = slice.actions;

export default slice.reducer;
