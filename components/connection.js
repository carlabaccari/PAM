// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZ9gswbD3FLSwhwglbb4s9X4Q9ci2J6QY",
  authDomain: "pam-final-a3aa8.firebaseapp.com",
  databaseURL: "https://pam-final-a3aa8-default-rtdb.firebaseio.com",
  projectId: "pam-final-a3aa8",
  storageBucket: "pam-final-a3aa8.appspot.com",
  messagingSenderId: "845015105577",
  appId: "1:845015105577:web:886799acf245a8e401dc38",
  measurementId: "G-FVSZVMKQHK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
