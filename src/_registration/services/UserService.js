
import { auth, db } from '../../util/Firebase';
import Cookies from 'universal-cookie';

import passwordHash from 'password-hash';

import EmailVerificationError from '../util/email-verification-error'

import { c_error, c_log } from '_common/util/logger';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject'
import ma from '_common/util/missingArg';
import CopyUserError from '_registration/util/copy-user-error'
import DeleteOldDisplayeNameError from '_registration/util/delete-old-display-name-error'


const USER_COPY_TABLE = "user_copy"
const DISPLAY_NAME_UNIQUE_TABLE = "display_name"
const USER_PROFILE_TABLE = "user_profile";

const userSubject = new BehaviorSubject();

const cookies = new Cookies();

const subscribeUserChange = (cb) =>
  userSubject.asObservable().subscribe(cb);

const verifyDisplayNameUnique = (displayName = ma()) => {
  return db.collection(DISPLAY_NAME_UNIQUE_TABLE).doc(displayName).get()
    .then((doc) => {
      if (doc.exists) {
        let error = new Error("Display name is already in use");
        error.name = "auth/name-already-in-use"
        return Promise.reject(error);
      }

    })
    .then(() => { })
    .catch(error => {
      c_error(error);
      throw (error);
    })
}



//Promise<uid>
const registerWithEmailAndPassword = ({ email = ma(), password = ma() }) => {
  return auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      return userCredential.user.uid;
    })
    .catch(error => {
      c_error(error);
      throw (error);
    })

}

//Promise<void>
const sendEmailVerification = (confirmedEmailSuccessUrl = ma()) => {
  return auth.currentUser.sendEmailVerification({
    url: confirmedEmailSuccessUrl
  })
    .catch(error => {
      c_error(error);
      throw new EmailVerificationError(error);
    })
}


//Promise<user>
const loginWithEmailAndPassword = ({ email = ma(), password = ma() }) => {

  return auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user
      cookies.set("username", user.displayName, {path: "/"});
      cookies.set("avatar", user.photoURL, {path: "/"});
      userSubject.next(_buildSessionUserFromFBUser(user));
      return user;
    })
    .catch(error => {
      c_error(error);
      throw (error);
    })
}




//Promise<void>
const logout = () => {
  return auth.signOut()
    .then(() => {
      cookies.remove("username");
      cookies.remove("avatar");
      return userSubject.next()
    }
    )
}




const createAuthProfile = ({ password = ma(), email = ma(), displayName = ma(), regType = ma() }) => {
  const user = auth.currentUser;
  const storedPhotoUrl = _deriveStoredValueFromValueAndType("", regType);

  return _createDisplayNameUniqueness(displayName)
    .then(() => {
      return user.updateProfile({
        displayName,
        photoURL: storedPhotoUrl
      })
    })
    .then(() => {
      return _createCopyOfUser({ password, email, displayName, regType })
    })
    .catch(error => {
      c_error(error);
      if (!(error instanceof CopyUserError)) {
        throw error;
      }
    })
    .then(() => user.uid)


}





//Promise<void>
//TODO test error
const updateDisplayName = (displayName = ma()) => {
  const authUser = auth.currentUser;
  const oldDisplayName = authUser.displayName;
  return _createDisplayNameUniqueness(displayName)
    .then(() => {
      return authUser.updateProfile({
        displayName
      })
    })
    .then(() => {
      userSubject.next(_buildSessionUserFromFBUser(authUser));
    })
    .then(() => {
      return _deleteDisplayNameUniqueness(oldDisplayName);
    })
    .then(() => {
      _updateCopyOfUser({ displayName })
    })
    .catch(error => {
      c_error(error);
      if (!(error instanceof CopyUserError)
        && !(error instanceof DeleteOldDisplayeNameError)) {
        throw error;
      }
    });



}

const exampleCreateFullProfile = (uid, name, about, gender, age, sports) => {

  return db.collection(USER_PROFILE_TABLE).doc(uid).set(
    {
      name,
      gender,
      age,
      sports,
      about
    }
  )
    .catch(error => {
      c_error(error);
      throw (error);
    })

}

//Promise<void>
const doPasswordReset = (email = ma()) => {
  return auth.sendPasswordResetEmail(email)
    .catch(error => {
      c_error(error);
      throw (error);
    })
}


//Promise<void> TODO test
const updateEmail = (email = ma()) => {
  const authUser = auth.currentUser;

  return authUser.updateEmail(email)
    .then(() => {
      return _updateCopyOfUser({ email })
    })
    .then(() => {
      return userSubject.next(_buildSessionUserFromFBUser(authUser));
    })

    .catch(error => {
      c_error(error);
      if (!(error instanceof CopyUserError)) {
        throw error;
      }
    });


}




//just messing:
const findUser = (uid = ma()) => {
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
  })

}

const _buildSessionUserFromFBUser = (authUser = ma()) => {
  const { photoUrl, type } = _deriveValueAndTypeFromStoredValue(authUser.photoURL);
  return {
    email: authUser.email,
    emailVerified: authUser.emailVerified,
    displayName: authUser.displayName,
    type: type,
    photoUrl: photoUrl
  }
}

const _deriveValueAndTypeFromStoredValue = (storedValue = "") => {
  let value = storedValue;
  let type = "A";
  let i = storedValue.indexOf("_|_");
  if (i > -1) {
    value = storedValue.substring(0, i);
    type = storedValue.substring(storedValue.length - 1, storedValue.length);
  }
  return { value, type };
}

const _deriveStoredValueFromValueAndType = (value = "", type = "A") => {
  return value + "_|_" + type;
}

const _createDisplayNameUniqueness = (displayName = ma()) => {
  const user = auth.currentUser;
  return db.collection(DISPLAY_NAME_UNIQUE_TABLE).doc(displayName).set(
    {
      uid: user.uid
    }
  )
    .catch(error => {
      c_error(error);
      throw (error);
    })
}
//todo where uid=
const _deleteDisplayNameUniqueness = (displayName) => {
  try {
    const user = auth.currentUser;
    return db.collection(DISPLAY_NAME_UNIQUE_TABLE).doc(displayName).delete()
      .catch(error => {
        throw new DeleteOldDisplayeNameError(error);
      })
  }
  catch (error) {
    c_error(error);
    throw new DeleteOldDisplayeNameError(error);
  }
}

const _createCopyOfUser = ({ password = ma(), email = ma(), displayName = ma(), regType = ma() }) => {
  try {
    const user = auth.currentUser;

    return db.collection(USER_COPY_TABLE).doc(user.uid).set(
      {
        oid: passwordHash.generate(password),
        email,
        displayName,
        regType
      }
    )
      .catch(error => {
        c_error(error);
        throw new CopyUserError(error);
      })
  }
  catch (error) {
    c_error(error);
    throw new CopyUserError(error);
  }
}

const _updateCopyOfUser = ({ displayName, email }) => {
  const authUser = auth.currentUser;
  try {
    let propsToUpdate = {}
    if (displayName)
      propsToUpdate.displayName = displayName;
    if (email)
      propsToUpdate.email = email;

    return db.collection(USER_COPY_TABLE).doc(authUser.uid).update(
      propsToUpdate
    )
      .catch(error => {
        c_error(error);
        throw new CopyUserError(error);
      })
  }
  catch (error) {
    c_error(error);
    throw new CopyUserError(error);
  }

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
  exampleCreateFullProfile,
  verifyDisplayNameUnique,
  updateDisplayName,
  updateEmail
  // createAuthProfile
}

export default userService

//export { deriveDisplayNameAndTypeFromValue, deriveValueFromDisplayNameAndType }