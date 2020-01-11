import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { compose } from 'recompose';

import userService from '../../services/UserService'
import * as ROUTES from '../../constants';

class LogoutPageBase extends Component {

    
    componentWillMount() {
        userService.logout(); 
    }

    render() {
        return <Redirect to={ROUTES.HOME} />;
    }
    
}

  const LogoutPage = compose(
    withRouter
  )(LogoutPageBase);

  export default LogoutPage

