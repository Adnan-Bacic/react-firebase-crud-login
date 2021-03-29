import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCum9Hc6tIJxLVhaKVwHgr8j6qStiY_xMo',
  authDomain: 'react-firebase-crud-login.firebaseapp.com',
  databaseURL: 'https://react-firebase-crud-login.firebaseio.com',
  projectId: 'react-firebase-crud-login',
  storageBucket: 'react-firebase-crud-login.appspot.com',
  messagingSenderId: '888882216147',
  appId: '1:888882216147:web:a92f554cf1624cce616826',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const { firestore } = firebase;
export const { auth } = firebase;
