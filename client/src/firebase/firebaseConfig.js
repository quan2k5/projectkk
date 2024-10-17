// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkUHklXSukHVRgwqeiVKweflB_DRigsW8",
  authDomain: "vueproject-48480.firebaseapp.com",
  projectId: "vueproject-48480",
  storageBucket: "vueproject-48480.appspot.com",
  messagingSenderId: "357351221446",
  appId: "1:357351221446:web:72ed6b5264317ed88b0fc7",
  measurementId: "G-DT8SK3DET8"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage=getStorage(app);