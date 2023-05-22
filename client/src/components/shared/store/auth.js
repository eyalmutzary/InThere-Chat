import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '1',
  name: 'Eyal',
  phoneNumber: '0544511115',
  country: '',
  currentLocation: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.user = payload.name;
      state.phoneNumber = payload.phoneNumber;
      state.currentLocation = payload.currentLocation;
    },
    logout: (state) => {
      state = initialState;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
