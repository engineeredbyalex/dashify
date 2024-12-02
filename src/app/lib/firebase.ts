import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: .env.GOOGLE.API,
  authDomain: "maybee-store.firebaseapp.com",
  projectId: "maybee-store",
  storageBucket: "maybee-store.appspot.com",
  messagingSenderId: "731733521119",
  appId: "1:731733521119:web:3bd88f89764f25518fef6a",
  measurementId: "G-Y99VZY6CGH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
