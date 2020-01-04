import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {c_log} from '../logger'

const config = {
  apiKey: "AIzaSyBGfiG8HE_NAwKuZ36GdpeVFzYvCqMZU-Q",
  authDomain: "react-demo-2e9b7.firebaseapp.com",
  databaseURL: "https://react-demo-2e9b7.firebaseio.com",
  projectId: "react-demo-2e9b7",
  storageBucket: "react-demo-2e9b7.appspot.com",
  messagingSenderId: "437294181207",
  appId: "1:437294181207:web:d465505982f27723d02c12",
  measurementId: "G-M26TD2F6ZT"
};


c_log("1 Firebase initializeApp");
const firebase = app.initializeApp(config);
c_log("2 Firebase auth");
const auth = app.auth();
c_log("3 Firebase firestore");
const db = app.firestore();

export default firebase;
export {auth,db}



