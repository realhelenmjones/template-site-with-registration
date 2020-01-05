import React from 'react';
import AuthUserContext from './context';
import userService from '../../services/UserService'

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
          if (authUser){
            let displayName = authUser.displayName;
            let type="A";

            let i = authUser.displayName?authUser.displayName.indexOf("_QZ_"):-1;
            if (i>-1){
              displayName = authUser.displayName.substring(0,i);
              type = authUser.displayName.substring(authUser.displayName.length-1,authUser.displayName.length);
            }

           
            const user = {
              email : authUser.email,
              displayName,
              emailVerified : authUser.emailVerified,
              canLogOn : authUser.emailVerified,
              type
            }            
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
