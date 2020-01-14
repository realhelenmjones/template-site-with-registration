import React from "react";
import { Route, Redirect } from 'react-router-dom'


import * as ROUTES from 'constants/routes';
import { AuthUserContext } from '../Session';


const PrivateRoute = ({ component: Component, ...props }) => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>{
        return authUser && (!props.regType || authUser.type === props.regType) ?
          <Route {...props} render={(innerProps) => <Component {...innerProps} />} />
          :
          <Route {...props} render={(innerProps) => <Redirect to={ROUTES.LOGIN+"?fwd="+encodeURIComponent(props.path)} />} />
      }}
    </AuthUserContext.Consumer>
  </div>
);


const PrivateRouteTypeA = (props) => <PrivateRoute regType="A" {...props} />

const PrivateRouteTypeB = (props) => <PrivateRoute regType="B" {...props} />






export default PrivateRoute

export {PrivateRouteTypeA, PrivateRouteTypeB}

