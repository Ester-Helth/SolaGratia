// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore"; // <- needed for DB

import { getAuth } from "firebase/auth"; // <- needed for auth (later)

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbOo75JN-HR0mTbkV_LyN8NK1VPq9Dp3k",
  authDomain: "solagratia-e08d2-efd7e.firebaseapp.com",
  projectId: "solagratia-e08d2",
  storageBucket: "solagratia-e08d2.appspot.com",
  messagingSenderId: "342227860391",
  appId: "1:342227860391:web:f54caf18908a92000f1482",
  measurementId: "G-2JJ24YEMBT"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app); // <- needed for auth (later)
export { auth }

export const db = getFirestore(app); // <- needed for DB so we can use it in our application components