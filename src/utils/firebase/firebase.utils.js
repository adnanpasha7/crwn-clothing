import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {getFirestore, doc, getDoc, setDoc} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCHxGx1VUoWW-El1AdQZzcOBB0_sys6eA8",
  authDomain: "crwn-clothing-db-ab76d.firebaseapp.com",
  projectId: "crwn-clothing-db-ab76d",
  storageBucket: "crwn-clothing-db-ab76d.appspot.com",
  messagingSenderId: "63575815534",
  appId: "1:63575815534:web:49f03e7e88bd5acb72fd7f"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt : "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log(userDocRef);

  const userSnapShot = await getDoc(userDocRef);
  console.log(userSnapShot);

  console.log(userSnapShot.exists());
  if(!userSnapShot.exists()){
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try{
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      })
    }catch(error){
      console.log("error creating the user", error.message);
    }
  }
  return userDocRef;
}