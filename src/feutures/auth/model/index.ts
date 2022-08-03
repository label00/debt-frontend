import { initializeApp } from "firebase/app";
import {
  NextOrObserver,
  onAuthStateChanged as onAuthStateChangedFirebase,
  signOut as signOutFirebase,
  User
} from "@firebase/auth";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from "../../../shared/api";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const signIn = (email: string, pass: string) => signInWithEmailAndPassword(auth, email, pass)
export const signOut = () => signOutFirebase(auth);
export const onAuthStateChanged = (cb: NextOrObserver<User>) => onAuthStateChangedFirebase(auth, cb);