import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "watch-store-d107a.firebaseapp.com",
  projectId: "watch-store-d107a",
  storageBucket: "watch-store-d107a.appspot.com",
  messagingSenderId: "503529909551",
  appId: "1:503529909551:web:4d2b19ca0d96b82d7b45da",
  measurementId: "G-0V2C8PN0XL",
  databaseURL:"https://watch-store-d107a-default-rtdb.firebaseio.com"
};

 const app = initializeApp(firebaseConfig);

export {
  app
}

