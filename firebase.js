// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLSLLCM9I8JT5UkFUl9myTRLlRgioUmw8",
  authDomain: "upload-img-c9460.firebaseapp.com",
  projectId: "upload-img-c9460",
  storageBucket: "upload-img-c9460.appspot.com",
  messagingSenderId: "1088085776899",
  appId: "1:1088085776899:web:19bb2e098de3b97005cc36",
  measurementId: "G-V5N709BDST"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage = getStorage(app);