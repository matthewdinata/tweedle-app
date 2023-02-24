import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";


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
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

const googleProvider = new GoogleAuthProvider();

// Google Auth sign in function
export const signInWithGoogle = () => {
   signInWithPopup(auth, googleProvider)
      .then((res) => {
         console.log(res);
      })
      . catch((err) => {
         console.log(err);
      });
};