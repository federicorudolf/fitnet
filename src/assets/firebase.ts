import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCHc1_yggQ9q_Wb20ixNqKASkw6ndQIYPA",
  authDomain: "fitnet-d2f3a.firebaseapp.com",
  projectId: "fitnet-d2f3a",
  storageBucket: "fitnet-d2f3a.appspot.com",
  messagingSenderId: "933868625464",
  appId: "1:933868625464:web:d4160556aab0c7653bd0cd",
  measurementId: "G-9SJNEV7B4L"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default {
  auth: {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup
  }
}

