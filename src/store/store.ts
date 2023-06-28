import { TypedUseSelectorHook, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { baseAPI } from '@services/api/baseAPI';

import * as globalReducers from './slices';
import { AppDispatch, RootState } from './types';

export const combinedReducer = combineReducers({
  ...globalReducers,
  [baseAPI.reducerPath]: baseAPI.reducer,
});

const rootReducer: typeof combinedReducer = (state, action) => {
  return combinedReducer(state, action);
};

export const createGlobalStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(baseAPI.middleware),
  });
};

export default createGlobalStore();

// Define redux hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
