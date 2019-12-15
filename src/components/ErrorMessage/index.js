import React from 'react';


const ErrorMessage = ({ error }) => {
    if (error.code === 'auth/weak-password') {
        return 'Password is too weak';
    }
    else if (error.code === 'auth/invalid-email') {
        return 'Email is invalid';
    }
    else if (error.code === 'auth/email-already-in-use') {
        return 'The email address is already registered';
    }
    else if (error.code === 'auth/user-disabled') {
        return 'Account has been disabled';
    }
    else if (error.code === 'auth/user-not-found') {
        return 'Login details are incorrect';
    }
    else if (error.code === 'auth/wrong-password') {
        return 'Login details are incorrect';
    }
    else if (error.code.indexOf('network')>-1) {
        return 'A network error has occurred';
    }    
    else {
        return error.message;
    }
}

export default ErrorMessage;
