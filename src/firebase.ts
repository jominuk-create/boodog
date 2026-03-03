import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbPf5ROFB_kwEvZjfQLppXD3w7TkCBPcI",
  authDomain: "bbodog-49902.firebaseapp.com",
  projectId: "bbodog-49902",
  storageBucket: "bbodog-49902.firebasestorage.app",
  messagingSenderId: "214109669663",
  appId: "1:214109669663:web:949a5bae2ebf2caa1c482a",
  measurementId: "G-LLL5EXKR6S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const db = getFirestore(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
