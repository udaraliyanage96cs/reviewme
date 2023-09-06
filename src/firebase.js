import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCN35N9bPtbYYKX55_JpI4QC22_TXPMoOo",
  authDomain: "review-me-22245.firebaseapp.com",
  projectId: "review-me-22245",
  storageBucket: "review-me-22245.appspot.com",
  messagingSenderId: "686375738067",
  appId: "1:686375738067:web:f6aaa4712e4f369f615226",
  measurementId: "G-9DJH8CQ6WM"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;