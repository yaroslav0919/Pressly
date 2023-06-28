import { PayloadAction } from '@reduxjs/toolkit';

import { combinedReducer, createGlobalStore } from './store';

export type TPayloadAction = PayloadAction<Record<string, any>>;
export type AppStore = ReturnType<typeof createGlobalStore>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<typeof combinedReducer>;
