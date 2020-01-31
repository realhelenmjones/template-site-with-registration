// import React from 'react'

import * as Sentry from '@sentry/browser';

function isDev(){
     return (process && process.env && process.env.NODE_ENV && process.env.NODE_ENV==='development');
}

export const c_log =(msg="") => {
     if (isDev())
        console.log(msg);
     
}

export const c_error =(error) => {
     if (isDev()){        
        error && console.error(error);        
     }
     else
          Sentry.captureException(error);                                       
}