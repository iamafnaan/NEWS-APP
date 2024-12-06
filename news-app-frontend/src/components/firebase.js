
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyD7kbuvAaCoWibHEztYMtmKAjXJbXuCDbU",
    authDomain: "news-app-7e4cc.firebaseapp.com",
    projectId: "news-app-7e4cc",
    storageBucket: "news-app-7e4cc.firebasestorage.app",
    messagingSenderId: "371022501481",
    appId: "1:371022501481:web:cf6b5e10f70050e96e34f8",
    measurementId: "G-ETDBMR28QE"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();


export { 
  auth, 
  googleProvider, 
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
};