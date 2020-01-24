import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { compose } from 'recompose';

import userService from '../../services/UserService'


class LogoutPageBase extends Component {
    
    componentWillMount() {
        userService.logout(); 
    }

    render() {
         return <Redirect to="/" />;
    }
    
}

  const LogoutPage = compose(
    withRouter
  )(LogoutPageBase);

  export default LogoutPage

