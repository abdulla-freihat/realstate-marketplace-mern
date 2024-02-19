// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "mern-estate-6b0f8.firebaseapp.com",
  projectId: "mern-estate-6b0f8",
  storageBucket: "mern-estate-6b0f8.appspot.com",
  messagingSenderId: "515675594521",
  appId: "1:515675594521:web:3b3eec33f2ccd4b93eef88"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);