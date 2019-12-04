import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD8CAxL_6rud1Rx6WTfEW6F_cYL2LxzmM8",
  authDomain: "forms-fd65f.firebaseapp.com",
  databaseURL: "https://forms-fd65f.firebaseio.com",
  projectId: "forms-fd65f",
  storageBucket: "forms-fd65f.appspot.com",
  messagingSenderId: "879774874053",
  appId: "1:879774874053:web:f148c876560d9115adf3ac"
};

firebase.initializeApp(firebaseConfig);

firebase
  .auth()
  .signInAnonymously()
  .catch(function(error) {
    console.log("Auth error:", error);
  });

const databaseRef = firebase.database().ref();
export const todosRef = databaseRef.child("todos");
export default firebase;
