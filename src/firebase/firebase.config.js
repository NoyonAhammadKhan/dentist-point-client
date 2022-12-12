// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey :"AIzaSyAO8QVb6nbXIxQxPj13ZW1uL0SOM0oYDwE",
  authDomain :"doctors-portal-73085.firebaseapp.com",
  projectId :"doctors-portal-73085",
  storageBucket:"doctors-portal-73085.appspot.com", 
  messagingSenderId:"542061934299",
  appId:"1:542061934299:web:6a0062dee4011407ab7efe"

  // apiKey: process.env.REACT_APP_apikey,
  // authDomain: process.env.REACT_APP_authDomain,
  // projectId: process.env.REACT_APP_projectId,
  // storageBucket: process.env.REACT_APP_storageBucket,
  // messagingSenderId: process.env.REACT_APP_messagingId,
  // appId: process.env.REACT_APP_appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;

