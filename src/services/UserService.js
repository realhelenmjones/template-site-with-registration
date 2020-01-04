
import { auth, db } from '../util/Firebase';
import { CONFIRMATION_EMAIL_REDIRECT } from '../constants'

import { c_log } from '../util/logger'



//TODO this exposes firebase, wrap it:
const onAuthStateChanged = (cb) => auth.onAuthStateChanged(cb);

const registerWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);



const sendEmailVerification = () =>
  auth.currentUser.sendEmailVerification({
    url: CONFIRMATION_EMAIL_REDIRECT,
  });


const loginWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

const logout = () => auth.signOut();

const createAuthUser = (uid, email, displayName) => {
  const user = auth.currentUser;
  user.updateProfile({
    displayName
    // photoURL
  })
    .then(() => {

      return db.collection("users").doc(uid).set(
        {
          email,
          displayName
        }
      );

      //return Promise.resolve();
    })
    .then(() => {
      return findUsers();

    })
    .catch(error => {
      c_log("createUser Error"); c_log(error);
      return Promise.reject(error);

    });
}

const doPasswordReset = email => auth.sendPasswordResetEmail(email);

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
      c_log(doc.id, " => ", doc.data());
    });
    return Promise.resolve();
  })
  .catch(error => {
    c_log("findUsers Error"); c_log(error);
    return Promise.reject(error);

  });

}


const userService = {
  onAuthStateChanged,
  registerWithEmailAndPassword,
  sendEmailVerification,
  loginWithEmailAndPassword,
  logout,
  createAuthUser,
  findUser,
  findUsers,
  doPasswordReset
  // createAuthProfile
}

export default userService