import React from "react";
import {Route, Redirect} from 'react-router-dom'



import { AuthUserContext } from '../Session';
import {ConfirmEmailAddress} from '../../components/Register'


const PrivateRoute = ({component:Component, regType="A", ...props}) => (
    <div>
     <AuthUserContext.Consumer>
        {authUser =>
          authUser && authUser.type==regType ? 
            authUser.emailVerified ? 
              <Route {...props} render={(innerProps)=> <Component {...innerProps}/>} />  
            : 
              <Route {...props} render={(innerProps)=> <ConfirmEmailAddress email={authUser.email} {...innerProps}/>} />  
          : 
          <Route {...props} render={(innerProps)=> <Redirect to={"/login?type="+regType}/>} />
        }
      </AuthUserContext.Consumer>
    </div>
  );

  

 export default PrivateRoute

