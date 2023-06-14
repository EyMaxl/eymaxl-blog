// Import the functions you need from the SDKs you need
//import * as firebase from 'firebase/app';
//import 'firebase/storage';
//import 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore"
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDSjdT9LwsAwC1bs6fylO-bc1yGyX4Uv4",
  authDomain: "firegram-3e707.firebaseapp.com",
  projectId: "firegram-3e707",
  storageBucket: "firegram-3e707.appspot.com",
  messagingSenderId: "396241473356",
  appId: "1:396241473356:web:82c0952097ca2f9fe689e9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const projectStorage = getStorage(app);
const projectFirestore = getFirestore(app);
const timestamp = serverTimestamp();


export { projectStorage, projectFirestore, timestamp }; 