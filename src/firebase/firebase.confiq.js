// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjsKp4crVKuS9YgRUFsxFtTBT_7bMrlpA",
  authDomain: "ema-john-firebase-auth-eb386.firebaseapp.com",
  projectId: "ema-john-firebase-auth-eb386",
  storageBucket: "ema-john-firebase-auth-eb386.appspot.com",
  messagingSenderId: "1095442449568",
  appId: "1:1095442449568:web:e8524090610ed63545f5c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app