import firebase from 'firebase';

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: 'AIzaSyBD2pY2UnDhJTAGVDcZwbLABMW14EmCw00',
    authDomain: 'react-todo-62c1f.firebaseapp.com',
    projectId: 'react-todo-62c1f',
    storageBucket: 'react-todo-62c1f.appspot.com',
    messagingSenderId: '594474449651',
    appId: '1:594474449651:web:27275f91efa9786c421586'
});

const db = firebase.firestore();

export {db}