import firebase from "firebase/app";
import "firebase/firestore"; // for the db
import "firebase/auth"; // for the auth
import "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5viLD_rFG6cBFzq_lZtUkpJkhu7sIltY",
  authDomain: "think-piece-3e1e5.firebaseapp.com",
  databaseURL: "https://think-piece-3e1e5.firebaseio.com",
  projectId: "think-piece-3e1e5",
  storageBucket: "think-piece-3e1e5.appspot.com",
  messagingSenderId: "727453000271",
  appId: "1:727453000271:web:5622873602ffb246c1c03a",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

window.firebase = firebase;

export const createUserProfileDocument = async (user, additionaldata) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email, photoURL } = user;
    const createdAt = new Date();
    try {
      userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionaldata,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return getUserDocument(user.uid);
};

export const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    return firestore.collection("users").doc(uid);
  } catch (error) {
    console.error("Error fetching user", error.message);
  }
};

export const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);
export const auth = firebase.auth();
export const storage = firebase.storage();

export const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" }); //enable pop up for sign in to google
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();

export default firebase;
