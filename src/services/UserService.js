
import { auth, db } from '../util/Firebase';
import { CONFIRMATION_EMAIL_REDIRECT } from '../constants'

import { c_log } from '../util/logger'



//TODO this exposes firebase, wrap it:
const onAuthStateChanged = (cb) => auth.onAuthStateChanged(cb);

const registerWithEmailAndPassword = (email, password) => 
  auth.createUserWithEmailAndPassword(email, password)
   




const sendEmailVerification = (successRedirect = CONFIRMATION_EMAIL_REDIRECT) => 
auth.currentUser.sendEmailVerification({
    url: successRedirect,
  });


const loginWithEmailAndPassword = (email, password) => 
  auth.signInWithEmailAndPassword(email, password)
    


const logout = () => auth.signOut();


const createAuthProfile = (uid, email, displayName, type) => {
  //save the user details that are typically displayed when logged on
  const user = auth.currentUser;
  let displayNameWithType = displayName;
  if (type)
    displayNameWithType = displayNameWithType + "_QZ_" + type;

//'user' is basically what firebase returns when logged on. The following adds displayName (and photo) to that user object
//Also want to be able to get type from that object so append it to display name
  user.updateProfile({
    displayName: displayNameWithType
    // photoURL
  })
  //save in an application table as well (separate to the firebase authentication service) 
  .then(() => {
      if (type) {
        return db.collection("users").doc(uid).set(
          {
            email,
            displayName,
            type
          }
        );
      }
      else {
        return db.collection("users").doc(uid).set(
          {
            email,
            displayName
          }
        );
      }

      //return Promise.resolve();
    })
    .catch(error => {
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


//just messing:
const findUser = uid => db.collection("users").doc(uid);

//just messing:
const findUsers = () => {
  db.collection("users").get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      c_log(doc.id + " => " + JSON.stringify(doc.data()));
      //TktNBfZUzaWwv8htMeGHl9wufh13 => {"displayName":"helen jones","email":"thehelenjones@yahoo.com"}
    });
    return Promise.resolve();
  })
    .catch(error => {
      return Promise.reject(error);

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