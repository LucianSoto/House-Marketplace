// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpbHwfKG5mIvrd0oa5KD5fF_3bOshfHyo",
  authDomain: "house-marketplace-4bf72.firebaseapp.com",
  projectId: "house-marketplace-4bf72",
  storageBucket: "house-marketplace-4bf72.appspot.com",
  messagingSenderId: "139388968546",
  appId: "1:139388968546:web:17526da10cd975a922bb3b",
  measurementId: "G-78M782WH9K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore()