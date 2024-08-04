// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWPkaIYq2h1gjI5EsxeRvVOParaWVdyQ4",
  authDomain: "pantry-tracker-27153.firebaseapp.com",
  projectId: "pantry-tracker-27153",
  storageBucket: "pantry-tracker-27153.appspot.com",
  messagingSenderId: "389633117085",
  appId: "1:389633117085:web:e0d9a5d95be830251c7d74",
  measurementId: "G-TDT80CTNX8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const firestore = getFirestore(app)
export const storage = getStorage(app)