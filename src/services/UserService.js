
import { auth, db } from '../util/Firebase';

import { c_log } from '../util/logger';
import AppError from '../util/AppError';



import { deriveDisplayNameAndTypeFromValue, deriveValueFromDisplayNameAndType } from '../domain/User';



//TODO this exposes firebase, wrap it:
const onAuthStateChanged = (cb) => auth.onAuthStateChanged(cb);

//Promise<uid>
const registerWithEmailAndPassword = (email, password) => {
  return new Promise((resolve, reject) => {
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        return resolve(userCredential.uid);
      })
      .catch(error => {
        return reject(error);
      });
  })
}

//Promise<void>
const sendEmailVerification = (confirmedEmailSuccessUrl) =>
  auth.currentUser.sendEmailVerification({
    url: confirmedEmailSuccessUrl,
  });


//Promise<user>
const loginWithEmailAndPassword = (email, password) => {
  return new Promise((resolve, reject) => {
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const fbUser = userCredential.user;
        const email = fbUser.email;
        const emailVerified = fbUser.emailVerified;
        const { displayName, type } = deriveDisplayNameAndTypeFromValue(fbUser.displayName);
        return resolve({ email, displayName, type, emailVerified });
      })
      .catch(error => {
        return reject(error);
      });
  });

}




//Promise<void>
const logout = () => auth.signOut();


//Promise<void>
const createAuthProfile = (uid, email, displayName, type) => {
  const user = auth.currentUser;

  return user.updateProfile({
    displayName: deriveValueFromDisplayNameAndType(displayName, type)
    // photoURL
  })
    //save in an application table as well (separate to the firebase authentication service) 
    .then(() => {
      c_log("then createAuthProfile");
      return db.collection("users").doc(uid).set(
        {
          email,
          displayName,
          type
        }
      );
    })

}

//Promise<void>
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


//just messing:
const findUser = uid => db.collection("users").doc(uid);

//just messing:
const findUsers = () => {
  
  db.collection("users").get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      c_log(doc.id + " => " + JSON.stringify(doc.data()));
      //TktNBfZUzaWwv8htMeGHl9wufh13 => {"displayName":"helen jones","email":"thehelenjones@yahoo.com"}
    });
  });

}


const userService = {
  onAuthStateChanged,
  registerWithEmailAndPassword,
  sendEmailVerification,
  loginWithEmailAndPassword,
  logout,
  createAuthProfile,
  findUser,
  findUsers,
  doPasswordReset
  // createAuthProfile
}

export default userService