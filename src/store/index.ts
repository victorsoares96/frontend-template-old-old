import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';

import { mainApi } from '@/api/main/main.api';
import hotkeysSlice from '@/store/hotkeys/hotkeys.slice';
import sessionSlice from '@/store/session/session.slice';
import sidebarSlice from '@/store/sidebar/sidebar.slice';
import themeSlice from '@/store/theme/theme.slice';

export const store = configureStore({
  reducer: {
    session: sessionSlice,
    hotkeys: hotkeysSlice,
    theme: themeSlice,
    sidebar: sidebarSlice,
    [mainApi.reducerPath]: mainApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(mainApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
