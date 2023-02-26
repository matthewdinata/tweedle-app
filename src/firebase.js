import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXQyFxKnXN2mDuMT03x3iYgOk7XHUc_zM",
  authDomain: "tweedle-app.firebaseapp.com",
  projectId: "tweedle-app",
  storageBucket: "tweedle-app.appspot.com",
  messagingSenderId: "856024108951",
  appId: "1:856024108951:web:71118cff85c805052c3ed2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Google Auth Provider
export const GoogleProvider = new GoogleAuthProvider()
// Google Sign In Function
export const googleSignIn = () => {
   signInWithPopup(auth, GoogleProvider)
   .then((res) => {
      const name = res.user.displayName;
      const email = res.user.email;
      const profilePic = res.user.photoURL;
   })
   .catch((err) => {
      console.log(err);
   })
};