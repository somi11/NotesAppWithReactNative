// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import {signInWithEmailAndPassword, } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-N3aXG4RhqvA7J5ECC0Eab8m92fmRAhg",
  authDomain: "notes-app-b34c5.firebaseapp.com",
  projectId: "notes-app-b34c5",
  storageBucket: "notes-app-b34c5.appspot.com",
  messagingSenderId: "666538566935",
  appId: "1:666538566935:web:3c832cc1c1ccfa32cd0352",
  measurementId: "G-VCC27D3NS4"
};

// Initialize Firebase
const App = initializeApp(firebaseConfig);
 export const auth = getAuth()

 //user Login
const loginWithEmailAndPassword = async (auth, email, password) => {
     
    if (email && password) {
      try {
      
        await signInWithEmailAndPassword(auth, email, password)
        alert('Sign in successful')
        props.navigation.replace('Main')
     
      } catch (e) {
        alert(e.message)
      }
    } else {
      alert('Please enter email and password')
    }
  }


export default App;