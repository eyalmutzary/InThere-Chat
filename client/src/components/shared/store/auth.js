import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  loading: false,
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
      localStorage.setItem('user', JSON.stringify(payload)); // Store user in localStorage
    },
    clearUser: (state) => {
      state.user = null;
      localStorage.removeItem('user'); // Remove user from localStorage
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
