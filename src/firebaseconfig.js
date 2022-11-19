// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALpHwTPao8kw9FZWvp_YsTtbLqDHwEXI8",
  authDomain: "houseproject-b191f.firebaseapp.com",
  projectId: "houseproject-b191f",
  storageBucket: "houseproject-b191f.appspot.com",
  messagingSenderId: "145494037296",
  appId: "1:145494037296:web:dddb226f9d14d1a6e7eef5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();