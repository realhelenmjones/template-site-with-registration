import React from 'react';

function isDev(){
    return (process && process.env && process.env.NODE_ENV && process.env.NODE_ENV==='development');
}

const ErrorMessage = ({ error }) => {
    if (error.code === 'auth/weak-password') {
        return 'Password is too weak.';
    }
    else if (error.code === 'auth/invalid-email') {
        return 'Email is invalid.';
    }
    else if (error.code === 'auth/email-already-in-use') {
        return 'The email address is already registered.';
    }
    else if (error.code === 'auth/user-disabled') {
        return 'Account has been disabled.';
    }
    else if (error.code === 'auth/user-not-found') {
        return 'Login details are incorrect.';
    }
    else if (error.code === 'auth/wrong-password') {
        return 'Login details are incorrect.';
    }
    else if (error.code && error.code.indexOf('network')>-1) {
        return 'A network error has occurred.';
    }    
    else{
        return isDev()?error.message : "An unexpected error occurred.";
    }
}

export default ErrorMessage;
