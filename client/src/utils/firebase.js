
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  apiKey: "AIzaSyCVpYqcNUUUvFeS2kXXjW42HfsDoyieTeQ",
  authDomain: "ai-interview-agent-336e3.firebaseapp.com",
  projectId: "ai-interview-agent-336e3",
  storageBucket: "ai-interview-agent-336e3.firebasestorage.app",
  messagingSenderId: "860090589757",
  appId: "1:860090589757:web:32bb6b8d2027f8e9c90054"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export { auth, provider }