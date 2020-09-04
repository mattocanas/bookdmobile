import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyDqnzgwRFwrDuuIuMqOJd1Ev2K9oKDe77s',
  authDomain: 'bookd-d16b3.firebaseapp.com',
  databaseURL: 'https://bookd-d16b3.firebaseio.com',
  projectId: 'bookd-d16b3',
  storageBucket: 'bookd-d16b3.appspot.com',
  messagingSenderId: '206655202451',
  appId: '1:206655202451:web:10cc082b9be1e9754b1966',
  measurementId: 'G-BXD0P3MM1C',
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};
