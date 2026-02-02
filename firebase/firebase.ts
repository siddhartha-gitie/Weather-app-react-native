// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjCn3QXcvYbWPvZJuMe_Zt8u00J5ayNCo",
  authDomain: "weatherapp-a629c.firebaseapp.com",
  projectId: "weatherapp-a629c",
  storageBucket: "weatherapp-a629c.firebasestorage.app",
  messagingSenderId: "925845829448",
  appId: "1:925845829448:web:01d36f1ca0d8c51d4b257d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);