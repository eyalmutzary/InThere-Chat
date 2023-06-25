import {createSlice} from '@reduxjs/toolkit';
import {firestore} from '../../../firebase';

const initialState = {
  user: {},
  loading: false,
};

const updateUserDocument = (user) => {
  const userRef = firestore.collection('users').doc(user.uid);
  return userRef.get()
    .then((doc) => {
      if (doc.exists) {
        // Update the existing document
        return userRef.update(user)
          .then(() => {
            console.log('User document updated successfully');
          })
          .catch((error) => {
            console.error('Error updating user document:', error);
          });
      } else {
        // Create a new document
        return userRef.set(user)
          .then(() => {
            console.log('User document created successfully');
          })
          .catch((error) => {
            console.error('Error creating user document:', error);
          });
      }
    })
    .catch((error) => {
      console.error('Error checking user document:', error);
    });
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, {payload}) => {
      state.user = payload;
      localStorage.setItem('user', JSON.stringify(payload)); // Store user in localStorage
      updateUserDocument(payload);
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
