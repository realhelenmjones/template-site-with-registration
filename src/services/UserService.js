
import { auth, db } from '../util/Firebase';
import {CONFIRMATION_EMAIL_REDIRECT} from '../constants'




const onAuthStateChanged = () => auth.onAuthStateChanged;

const registerWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

const doSendEmailVerification = () =>
  auth.currentUser.sendEmailVerification({
    url: CONFIRMATION_EMAIL_REDIRECT,
  });


const loginWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

const logout = () => auth.signOut();

const createUser = (uid, email, username) => {
  return db.collection("users").doc(uid).set(
    {
      email,
      username
    },
    { merge: true }
  );
}

// this would generate a key: 
//return db.collection("users").add(
//   {
//     email,
//     name,
//     about,
//   }
// so too would
// return db.collection("users").doc().set(
//   {
//     email,
//     name,
//     about,
//   }



const findUser = uid => db.collection("users").doc(uid);

const findUsers = () => {
  db.collection("users").get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      console.log(doc.id, " => ", doc.data());
    });
  });

}


const userService = {
  onAuthStateChanged,
  registerWithEmailAndPassword,
  doSendEmailVerification,
  loginWithEmailAndPassword,
  logout,
  createUser,
  findUser,
  findUsers
}

export default userService