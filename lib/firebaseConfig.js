import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBbyHFc9z6718MPh7zk_WQwgiLUu0l_EkI",
  authDomain: "assemblies-of-god-1011a.firebaseapp.com",
  projectId: "assemblies-of-god-1011a",
  storageBucket: "assemblies-of-god-1011a.firebasestorage.app",
  messagingSenderId: "229943291915",
  appId: "1:229943291915:web:9c3042540a98280903970e"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };