// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCksfrt_apwH4NK1KsZ_CuQX6wm1sE-_Oo',
  authDomain: 'social-ec23f.firebaseapp.com',
  projectId: 'social-ec23f',
  storageBucket: 'social-ec23f.appspot.com',
  messagingSenderId: '147144369588',
  appId: '1:147144369588:web:3fd33bc7ff3e4d4e57fee1',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const provider = new GoogleAuthProvider(app);

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const name = result.user.displayName;
      const email = result.user.email;

      localStorage.setItem('name', name);
      localStorage.setItem('email', email);
    })
    .catch((error) => {
      console.log(error);
    });
};