import { createSlice } from '@reduxjs/toolkit';

// ================ Initial states ================ //
type TAuthState = {
  authInfoLoaded: boolean;
  isAuthenticated: boolean;
};
const initialState: TAuthState = {
  authInfoLoaded: false,
  isAuthenticated: false,
};

// ================ Slice ================ //
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state) => {
      state.isAuthenticated = true;
    },
  },
});

// ================ Actions ================ //
export const { loginSuccess } = authSlice.actions;

export default authSlice.reducer;
