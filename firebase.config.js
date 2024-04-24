import { initializeApp } from '@firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBp6UqWNI_0W1vdcOaYhO7SQciIZ52LKsU',
  authDomain: 'third-crossing-415107.firebaseapp.com',
  databaseURL:
    'https://third-crossing-415107-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'third-crossing-415107',
  storageBucket: 'third-crossing-415107.appspot.com',
  messagingSenderId: '409078045219',
  appId: '1:409078045219:web:cf59c12aa870c4fef56f96',
  measurementId: 'G-9LBXY864LG',
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
