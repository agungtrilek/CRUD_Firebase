// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCU00ax0MCDxe-CvFH2_oiC2d31gSCE8VA",
  authDomain: "auth-project-ce098.firebaseapp.com",
  databaseURL: "https://auth-project-ce098-default-rtdb.firebaseio.com",
  projectId: "auth-project-ce098",
  storageBucket: "auth-project-ce098.firebasestorage.app",
  messagingSenderId: "1054323605076",
  appId: "1:1054323605076:web:f85c127261e00e418077c1",
  measurementId: "G-0RV2LKLZGZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const database = getDatabase(app);

console.log("firebase", app);
