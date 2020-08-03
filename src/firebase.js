import firebase from "firebase/app";
import "firebase/firestore"; // for the db
import "firebase/auth"; // for the auth

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

export const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);
export const auth = firebase.auth();

export const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" }); //enable pop up for sign in to google
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();

export default firebase;
