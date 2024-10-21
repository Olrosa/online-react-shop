// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArwuRdfriLEpV4Vk4XzvVsPTjd7sIeiPg",
  authDomain: "olrosa-react-shop.firebaseapp.com",
  databaseURL: "https://olrosa-react-shop-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "olrosa-react-shop",
  storageBucket: "olrosa-react-shop.appspot.com",
  messagingSenderId: "700525088128",
  appId: "1:700525088128:web:2aae2b1f376e801344c565"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);