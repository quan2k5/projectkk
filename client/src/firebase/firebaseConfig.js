// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBn-Dtv9Hw5pzElDI8ON0BrtxUijhteG2E",
  authDomain: "vue1project-1cfa3.firebaseapp.com",
  projectId: "vue1project-1cfa3",
  storageBucket: "vue1project-1cfa3.appspot.com",
  messagingSenderId: "761640942365",
  appId: "1:761640942365:web:32765a50054dd9697e3ff4",
  measurementId: "G-G30WYYHZ0B"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);
// const analytics = getAnalytics(app);;