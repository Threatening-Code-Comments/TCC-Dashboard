import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC4Qhu9o8UWhS1xwxOhjQJEnmt_UvyzK1A",
  authDomain: "routine-tracker-4db49.firebaseapp.com",
  databaseURL: "https://routine-tracker-4db49.firebaseio.com",
  projectId: "routine-tracker-4db49",
  storageBucket: "routine-tracker-4db49.appspot.com",
  messagingSenderId: "462881992703",
  appId: "1:462881992703:web:afd3733b3de13fe65741ca",
  measurementId: "G-YLX8EQPKTY"
};
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = firebase.storage();
export const database = firebase.database();

let user = null;
export const setFirebaseUser = (firebaseUser) => user = firebaseUser;

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export const dataWrite = (path, data) => {
  database
    .ref(`users/${user.uid}/${path}`)
    .set(data);
};

export const dataRead = async (path, callback) => {
  return database
    .ref(`users/${user.uid}/${path}`)
    .once("value")
    .then(function (snapshot) {
      if (callback) callback(snapshot.val());
    });
};