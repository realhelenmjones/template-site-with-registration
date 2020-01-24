import React from 'react'
import PropTypes from "prop-types";

import ma from '_common/util/missingArg';
// import { c_error,c_log } from '_common/util/logger';



function isDev() {
    return (process && process.env && process.env.NODE_ENV && process.env.NODE_ENV === 'development');
}
//TODO
const ErrorMessage = ({ error=ma() }) => {
   
    let msg;
    if (error.code) {
        if (error.code === 'auth/weak-password') {
            msg = 'Password is too weak.';
        }
        else if (error.code === 'auth/invalid-email') {
            msg = 'Email is invalid.';
        }
        else if (error.code === 'auth/email-already-in-use') {
            msg = 'The email address is already registered.';
        }
        else if (error.code === 'auth/requires-recent-login') {
            msg = 'This action is sensitive and you need to logoff then logon again first.';
        }        
        else if (error.code === 'auth/user-disabled') {
            msg = 'Account has been disabled.';
        }
        else if (error.code === 'auth/user-not-found') {
            msg = 'Login details are incorrect.';
        }
        else if (error.code === 'auth/wrong-password') {
            msg = 'Login details are incorrect.';
        }
        else if (error.code.indexOf('network') > -1) {
            msg = 'A network error has occurred.';
        }
    }
    else if (error.name) {
        if (error.name === 'auth/name-already-in-use') {
            msg = 'Display name is already used';
        }
    }  
    if (!msg)
        msg =isDev() ? error.message : "An unexpected error occurred.";
        
    return msg; 
    
}

ErrorMessage.propTypes = {
    error: PropTypes.shape({
        code: PropTypes.string,
        name: PropTypes.string,
        message: PropTypes.string.isRequired
      })
}; 
export default ErrorMessage;
