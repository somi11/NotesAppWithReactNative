// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD-N3aXG4RhqvA7J5ECC0Eab8m92fmRAhg',
  authDomain: 'notes-app-b34c5.firebaseapp.com',
  projectId: 'notes-app-b34c5',
  storageBucket: 'notes-app-b34c5.appspot.com',
  messagingSenderId: '666538566935',
  appId: '1:666538566935:web:3c832cc1c1ccfa32cd0352',
  measurementId: 'G-VCC27D3NS4',
}

// Initialize Firebase
export const App = initializeApp(firebaseConfig)
export const auth = getAuth()
export const db = getFirestore(App)
//user Signup
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return
  return await createUserWithEmailAndPassword(auth, email, password)
}
//user Login
export const loginUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return
  return await signInWithEmailAndPassword(auth, email, password)
}
//forgot password
export const userPasswordReset = async (email) => {
  if (!email) return
  return await sendPasswordResetEmail(auth, email)
}

export default App
