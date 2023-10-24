import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authStart: (state) => {
      state.loading = true;
    },
    authSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    authFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    restartStateSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { authStart, authSuccess, authFailure, restartStateSuccess } =
  userSlice.actions;
export default userSlice.reducer;
