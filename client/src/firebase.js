import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBsUJk6CYcWJR1jD9cjeM8xSFb2mtRW8Lc',
  authDomain: 'inthere-84584.firebaseapp.com',
  databaseURL: 'https://inthere-84584-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'inthere-84584',
  storageBucket: 'inthere-84584.appspot.com',
  messagingSenderId: '802775690883',
  appId: '1:802775690883:web:a727d30ae85470969ff5b6',
  measurementId: 'G-YEQZKMK6L0',
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const firestore = firebase.firestore();

export { auth, firebase, firestore };

