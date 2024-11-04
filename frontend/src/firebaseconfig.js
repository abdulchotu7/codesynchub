// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth , GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaQ0rKW44UwZnSQswcPlLjIPI6KbjER3Y",
  authDomain: "react-practice-8622f.firebaseapp.com",
  projectId: "react-practice-8622f",
  storageBucket: "react-practice-8622f.appspot.com",
  messagingSenderId: "710535449339",
  appId: "1:710535449339:web:f01d76e967578d9941be5e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();