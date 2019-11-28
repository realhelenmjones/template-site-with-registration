import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { compose } from 'recompose';

import userService from '../../services/UserService'
import * as ROUTES from '../../constants/routes';

class LogoutPageBase extends Component {

    constructor(props){
        super(props);
    }

    componentWillMount() {
        userService.logout(); 
        //todo               
    }

    render() {
        return <Redirect to={ROUTES.HOME} />;
    }
    
}

  const LogoutPage = compose(
    withRouter
  )(LogoutPageBase);

  export default LogoutPage

