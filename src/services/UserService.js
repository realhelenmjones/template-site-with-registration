
import { auth, db } from '../util/Firebase';

import { c_log } from '../util/logger';
import AppError from '../util/AppError';



import { deriveDisplayNameAndTypeFromValue, deriveValueFromDisplayNameAndType } from '../domain/User';



//TODO this exposes firebase, wrap it:
const onAuthStateChanged = (cb) => auth.onAuthStateChanged(cb);


const registerWithEmailAndPassword = (email, password) => {
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      return Promise.resolve(userCredential.uid);
    })
    .catch(error => {
      return Promise.reject(error);
    });
}

//Promise<void>
const sendEmailVerification = (confirmedEmailSuccessUrl) => {
  auth.currentUser.sendEmailVerification({
    url: confirmedEmailSuccessUrl,
  })
    .then(() => Promise.resolve())
    .catch(error => {
      return Promise.reject(error);
    });
}

//Promise<user>
const loginWithEmailAndPassword = (email, password) => {
  return new Promise((resolve,reject)=>{
    auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const fbUser = userCredential.user;
      const email = fbUser.email;
      const emailVerified = fbUser.emailVerified; 
      const { displayName, type } = deriveDisplayNameAndTypeFromValue(fbUser.displayName);
      return resolve({email, displayName, type, emailVerified});
    })
    .catch(error => {
      return reject(error);
    });
  });
  
}

// const loginWithEmailAndPassword = (email, password) => {
//   auth.signInWithEmailAndPassword(email, password)
//     .then((userCredential) => {
//       const fbUser = userCredential.user;
//       const email = fbUser.email;
//       const emailVerfied = fbUser.emailVerified; 
//       const { displayName, type } = deriveDisplayNameAndTypeFromValue(fbUser.displayName);
//       return new User(email, displayName, type, emailVerfied);
//     })
//     .catch(error => {
//       return error;
//     });
// }



//Promise<void>
const logout = () => {
  auth.signOut()
    .then(() => { return Promise.resolve() })
    .catch(error => {
      return Promise.reject(error);
    });
}

//Promise<void>
const createAuthProfile = (uid, email, displayName, type) => {
  const user = auth.currentUser;

  user.updateProfile({
    displayName: deriveValueFromDisplayNameAndType(displayName, type)
    // photoURL
  })
    //save in an application table as well (separate to the firebase authentication service) 
    .then(() => {
      return db.collection("users").doc(uid).set(
        {
          email,
          displayName,
          type
        }
      );

    })
    .then(() => { return Promise.resolve() })
    .catch(error => {
      return Promise.reject(error);
    });
}

//Promise<void>
const doPasswordReset = email => {
  auth.sendPasswordResetEmail(email)
    .then(() => { return Promise.resolve() })
    .catch(error => {
      return Promise.reject(error);
    });
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