import React from "react";
import { Link } from 'react-router-dom';
import {Route, Redirect} from 'react-router-dom'



import { AuthUserContext } from '../../components/Session';
import { renderComponent } from "recompose";


const PrivateRoute = ({component:Component, ...props}) => (
    <div>
     <AuthUserContext.Consumer>
        {authUser =>
          authUser ? 
          <Route {...props} render={(innerProps)=> <Component {...innerProps}/>} />  
          : 
          <Route {...props} render={(innerProps)=> <Redirect to="/login"/>} />
        }
      </AuthUserContext.Consumer>
    </div>
  );


 export default PrivateRoute

