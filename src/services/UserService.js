
import { auth, db } from '../util/Firebase';

import { c_log } from '../util/logger';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject' 



//TODO this exposes firebase, wrap it:
//const onAuthStateChanged = (cb) => auth.onAuthStateChanged(cb);

const userSubject = new BehaviorSubject();


const subscribeUserChange = (cb) => 
  userSubject.asObservable().subscribe( cb );    


//Promise<uid>
const registerWithEmailAndPassword = (email, password) => {
  return new Promise((resolve, reject) => {
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => { c_log("created user "+userCredential.uid);
      c_log(userCredential);
        return resolve(userCredential.user.uid);
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
        const user = { email, displayName, type, emailVerified };
        userSubject.next(user); 
        return resolve(user);
      })
      .catch(error => {
        return reject(error);
      });
  });

}




//Promise<void>
const logout = () => {
  auth.signOut()
  .then(() => userSubject.next()
  )
}


//Promise<void>
const createAuthProfile = (uid, email, displayName, type) => {
  const user = auth.currentUser;

  return user.updateProfile({
    displayName: deriveValueFromDisplayNameAndType(displayName, type)
    // photoURL
  })
    //save in an application table as well (separate to the firebase authentication service) 
    .then(() => {
      c_log("then createAuthProfile "+uid);
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

const deriveDisplayNameAndTypeFromValue = (value)=> {
  let displayName = value;
  let type="A";
  let i = value.indexOf("_|_");
      if (i>-1){
        displayName = value.substring(0,i);
        type = value.substring(value.length-1,value.length);
      }
      return {displayName,type};
}

const deriveValueFromDisplayNameAndType = (displayName, type="A") => {
  return displayName+"_|_"+type;
}


const userService = {
  subscribeUserChange,
  registerWithEmailAndPassword,
  sendEmailVerification,
  loginWithEmailAndPassword,
  logout,
  createAuthProfile,
  findUser,
  findUsers,
  doPasswordReset,
  // createAuthProfile
}

export default userService

export {deriveDisplayNameAndTypeFromValue,deriveValueFromDisplayNameAndType}