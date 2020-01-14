
import { auth, db } from '../../util/Firebase';

import { c_log } from '_common/util/logger';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject'




const userSubject = new BehaviorSubject();


const subscribeUserChange = (cb) =>
  userSubject.asObservable().subscribe(cb);


//Promise<uid>
const registerWithEmailAndPassword = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {      
      return userCredential.user.uid;
    })

}

//Promise<void>
const sendEmailVerification = (confirmedEmailSuccessUrl) =>
  auth.currentUser.sendEmailVerification({
    url: confirmedEmailSuccessUrl,
  });


//Promise<user>
const loginWithEmailAndPassword = (email, password) => {
 
  const user = { email: '', displayName: '', type: '', emailVerified: true };

  return auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const fbUser = userCredential.user;
      user.email = fbUser.email;
      user.emailVerified = fbUser.emailVerified;
      user.displayName = fbUser.displayName; 
      return findUser(fbUser.uid);
    })
    .then((userAuthProfile) => {      
      user.type = userAuthProfile.type;
      userSubject.next(user);
      return user;
    })

}




//Promise<void>
const logout = () => {
  return auth.signOut()
    .then(() => userSubject.next()
    )
}


//Promise<void>
const createAuthProfile = (uid, email, displayName, type) => {
  const user = auth.currentUser;

  return user.updateProfile({
   // displayName: deriveValueFromDisplayNameAndType(displayName, type)
   displayName
    // photoURL
  })
    //save in an application table as well (separate to the firebase authentication service) 
    .then(() => {
      db.collection("users").doc(uid).set(
        {
          email,
          displayName,
          type
        }
      );
    })
    .then(() => uid)

}

const exampleCreateFullProfile = ({ uid, name, about, gender, age, sports }) => {
 
  return db.collection("user_profile").doc(uid).set(
    {
      name,
      gender,
      age,
      sports,
      about
    }
  );
  
}

//Promise<void>
const doPasswordReset = email => auth.sendPasswordResetEmail(email);





const findUser = uid => {  
  return db.collection("users").doc(uid).get()
    .then((doc) => {      
      return { uid: doc.id, ...doc.data() };
    })
}

//just messing:
const findUsers = () => {

  db.collection("users").get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      c_log(doc.id + " => " + JSON.stringify(doc.data()));      
    });
  });

}

// const deriveDisplayNameAndTypeFromValue = (value) => {
//   let displayName = value;
//   let type = "A";
//   let i = value.indexOf("_|_");
//   if (i > -1) {
//     displayName = value.substring(0, i);
//     type = value.substring(value.length - 1, value.length);
//   }
//   return { displayName, type };
// }

// const deriveValueFromDisplayNameAndType = (displayName, type = "A") => {
//   return displayName + "_|_" + type;
// }


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
  exampleCreateFullProfile
  // createAuthProfile
}

export default userService

//export { deriveDisplayNameAndTypeFromValue, deriveValueFromDisplayNameAndType }