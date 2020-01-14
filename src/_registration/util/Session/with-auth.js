import React from 'react';
import AuthUserContext from './context';
import userService, { deriveDisplayNameAndTypeFromValue } from '../../services/UserService'

// import {c_log} from '_common/util/logger'


const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    
    constructor(props) {
      super(props);
      this.state = {
        authUser: null,
      };
    }

    componentDidMount() {
        this.listener = userService.subscribeUserChange(
        authUser => {
        
          if (authUser && authUser.emailVerified){
            //const {displayName, type} = deriveDisplayNameAndTypeFromValue(authUser.displayName);            
            // const user = {email:authUser.email, displayName:authUser.displayName, type:type, emailVerified:authUser.emailVerified};                                
            this.setState({ authUser });
          }else{
            this.setState({ authUser: null });
          }
        },
      );
    }

    componentWillUnmount() {
      this.listener.unsubscribe();
    }

    render() {     
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
