import React from "react";
import {Route, Redirect} from 'react-router-dom'



import { AuthUserContext } from '../Session';
import ConfirmEmailAddress from '../../components/Register/please-confirm-email'


const PrivateRoute = ({component:Component, ...props}) => (
    <div>
     <AuthUserContext.Consumer>
        {authUser =>
          authUser ? 
          authUser.emailVerified ?
          <Route {...props} render={(innerProps)=> <Component {...innerProps}/>} />  
          :<Route {...props} render={(innerProps)=> <ConfirmEmailAddress emailAddress={authUser.emailAddress} {...innerProps}/>} />  
          : 
          <Route {...props} render={(innerProps)=> <Redirect to="/login"/>} />
        }
      </AuthUserContext.Consumer>
    </div>
  );


 export default PrivateRoute

