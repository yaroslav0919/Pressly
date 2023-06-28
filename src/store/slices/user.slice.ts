import { createSlice } from '@reduxjs/toolkit';

import { TPayloadAction } from '@store/types';

// ================ Initial states ================ //
type TUserState = {
  authInfoLoaded: boolean;
  isAuthenticated: boolean;
};
const initialState: TUserState = {
  authInfoLoaded: false,
  isAuthenticated: false,
};

// ================ Slice ================ //
const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    fetchCurrentUserSuccess: (state, payload: TPayloadAction) => {
      // TODO: Perform logic to update state here
    },
  },
});

// ================ Actions ================ //
export const { fetchCurrentUserSuccess } = userSlice.actions;

export default userSlice.reducer;
