import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var config = {
  apiKey: "AIzaSyAUdyQb3rqPK4Ce8OhMnSfAM91zJszfN_8",
  authDomain: "mydo-237b9.firebaseapp.com",
  databaseURL: "https://mydo-237b9.firebaseio.com",
  projectId: "mydo-237b9",
  storageBucket: "mydo-237b9.appspot.com",
  messagingSenderId: "771737587555",
  appId: "1:771737587555:web:d50edfa85f570418"
};

firebase.initializeApp(config);
firebase.firestore();

export default firebase;
