import { createSlice } from '@reduxjs/toolkit';

import { TPayloadAction } from '@store/types';

// ================ Initial states ================ //
type TCreateVinylState = {
  // TODO: Define type for create vinyl state
};
const initialState: TCreateVinylState = {
  // TODO: Define initialState for create vinyl state
};

// ================ Slice ================ //
const CreateVinylSlice = createSlice({
  name: 'CreateVinylSlice',
  initialState,
  reducers: {
    saveStep: (state, payload: TPayloadAction) => {
      // TODO: Perform logic to update step here
    },
  },
});

// ================ Actions ================ //
export const { saveStep } = CreateVinylSlice.actions;

export default CreateVinylSlice.reducer;
