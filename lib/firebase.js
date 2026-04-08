import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAglk6lBiNj9qw3OA49CMZseSY4OBZr0JM",
  authDomain: "hisu-store.firebaseapp.com",
  projectId: "hisu-store",
  storageBucket: "hisu-store.firebasestorage.app",
  messagingSenderId: "1037498142380",
  appId: "1:1037498142380:web:e4581f1ed3a8379564d909"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };