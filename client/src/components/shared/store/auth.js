import { createSlice } from '@reduxjs/toolkit';

const storedUser = localStorage.getItem('user');
const initialUser = storedUser ? JSON.parse(storedUser) : null;

const initialState = {
  user: initialUser,
  loading: false,
};
// const initialState = {
//   id: '1',
//   name: 'Eyal',
//   phoneNumber: '0544511115',
//   country: '',
//   currentLocation: '',
// };

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
