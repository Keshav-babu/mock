// Import the functions you need from the SDKs you need
import { initializeApp,getApp,getApps } from "firebase/app";


import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAchVdDjHfOrs8E2Ktoktqh4lQnWvWnmkE",
  authDomain: "mock-9fc68.firebaseapp.com",
  projectId: "mock-9fc68",
  storageBucket: "mock-9fc68.firebasestorage.app",
  messagingSenderId: "438742734346",
  appId: "1:438742734346:web:350df0c7e10ed912b071f3",
  measurementId: "G-E672J9G6GS"
};

// Initialize Firebase
const app =!getApps.length? initializeApp(firebaseConfig):getApp();


export const auth = getAuth(app);
export const db = getFirestore(app);