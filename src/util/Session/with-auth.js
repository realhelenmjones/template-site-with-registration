import React from 'react';
import AuthUserContext from './context';
import userService from '../../services/UserService'


const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    
    constructor(props) {
      super(props);
      this.state = {
        authUser: null,
      };
    }

    componentDidMount() {console.log("withAuthentication mounted");
        this.listener = userService.onAuthStateChanged(
        authUser => {
        console.log("logged on"); console.log(authUser);
          if (authUser){
            const user = userService.findUser(authUser.uid);console.log(user);
            user.emailVerified = authUser.emailVerified;
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
