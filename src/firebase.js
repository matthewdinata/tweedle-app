import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBXQyFxKnXN2mDuMT03x3iYgOk7XHUc_zM',
  authDomain: 'tweedle-app.firebaseapp.com',
  projectId: 'tweedle-app',
  storageBucket: 'tweedle-app.appspot.com',
  messagingSenderId: '856024108951',
  appId: '1:856024108951:web:71118cff85c805052c3ed2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();

// Google Auth Provider
export const GoogleProvider = new GoogleAuthProvider();
