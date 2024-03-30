import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuziA1q-XdyD1L_-4TJ4fRE-VLZRjj8oA",
  authDomain: "animal-app-97a91.firebaseapp.com",
  projectId: "animal-app-97a91",
  storageBucket: "animal-app-97a91.appspot.com",
  messagingSenderId: "1098721643044",
  appId: "1:1098721643044:web:66c70a8004c497789926b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export default app