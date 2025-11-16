import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "electivexchange.firebaseapp.com",
  projectId: "electivexchange",
  storageBucket: "electivexchange.firebasestorage.app",
  messagingSenderId: "441131795443",
  appId: "1:441131795443:web:81f6cf2262c001c0a64886",
  measurementId: "G-MLFT520G3B"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const auth = getAuth(app);
const analytics = getAnalytics(app);