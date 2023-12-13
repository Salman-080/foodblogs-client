// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDc5IAb0-qMPsTx2zv3Xe1BMjxyly2MHx8",
  authDomain: "food-blogs-auth.firebaseapp.com",
  projectId: "food-blogs-auth",
  storageBucket: "food-blogs-auth.appspot.com",
  messagingSenderId: "863331982468",
  appId: "1:863331982468:web:3fe63a3b2b6d952dc5f6d1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;