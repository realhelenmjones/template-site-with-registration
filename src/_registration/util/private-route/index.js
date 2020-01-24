import React from "react";
import { Route, Redirect } from 'react-router-dom'

import { AuthUserContext } from '../session';


const PrivateRoute = ({ component: Component, ...props }) => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>{
        return authUser && (!props.regType || authUser.type === props.regType) ?
          <Route {...props} render={(innerProps) => <Component {...innerProps} />} />
          :
          <Route {...props} render={(innerProps) => <Redirect to={"/login?fwd="+encodeURIComponent(props.path)} />} />
          //TODO Redirect: use state instead of fwd
      }}
    </AuthUserContext.Consumer>
  </div>
);


const PrivateRouteTypeA = (props) => <PrivateRoute regType="A" {...props} />

const PrivateRouteTypeB = (props) => <PrivateRoute regType="B" {...props} />






export default PrivateRoute

export {PrivateRouteTypeA, PrivateRouteTypeB}

