import React from 'react';

function isDev(){
    return (process && process.env && process.env.NODE_ENV && process.env.NODE_ENV==='development');
}

const ErrorMessage = ({ error }) => {
  
        return isDev()?error.message : "An unexpected error occurred.";
  
}

export default ErrorMessage;
