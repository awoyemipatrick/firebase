// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAi8B8XYkyNMWNJLdg-FGTyWBYz9bUSDFE",
  authDomain: "fir-tutorial-59c56.firebaseapp.com",
  projectId: "fir-tutorial-59c56",
  storageBucket: "fir-tutorial-59c56.appspot.com",
  messagingSenderId: "396574115610",
  appId: "1:396574115610:web:cdd8524d3faba6502a4ea3",
  measurementId: "G-9VYD02CC69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()
const db = getFirestore(app)
const storage = getStorage(app)
export { app, auth, googleProvider, db, storage }
