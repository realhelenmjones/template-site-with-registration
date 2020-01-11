import React from 'react';
import AuthUserContext from './context';
import userService, { deriveDisplayNameAndTypeFromValue } from '../../services/UserService'

import {c_log} from '../../util/logger'


const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    
    constructor(props) {
      super(props);
      this.state = {
        authUser: null,
      };
    }

    componentDidMount() {c_log("withAuthentication mounted");
        this.listener = userService.onAuthStateChanged(
        authUser => {
        c_log("with_auth detected onAuthStateChanged"); c_log(authUser);
          if (authUser && authUser.emailVerified){
            const {displayName, type} = deriveDisplayNameAndTypeFromValue(authUser.displayName);            
            const user = {email:authUser.email, displayName, type, emailVerified:authUser.emailVerified};                                
            this.setState({ authUser:user });
          }else{
            this.setState({ authUser: null });
          }
        },
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() { c_log("render AuthUserContext with authUser:");
    c_log(this.state.authUser);
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }

  return WithAuthentication;
};

export default withAuthentication;
