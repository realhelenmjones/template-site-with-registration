import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { compose } from 'recompose';
import { Form, Button,Alert } from 'bootstrap-4-react';
import queryString from 'query-string'; 

import SpinnerOverlay from '_common/util/SpinnerOverlay'

import ErrorMessage from '../ErrorMessage';
import userService from '../../services/UserService'
import * as ROUTES from 'constants/routes';
import {c_log} from '_common/util/logger'

const LoginPage = () => (
  <div>
    <LoginForm />
    <p>
        <Link to={ROUTES.REGISTER}>Register</Link> |  
        &nbsp;<Link to={ROUTES.RESET_PASSWORD}>Forgot Password</Link>
    
        
    </p>
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: 'aaaaaaaa1q',
  error: null,
  loading : false
};

class LoginFormBase extends Component {

  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  
  onSubmit = event => {

    event.preventDefault();    
    this.setState({ loading:true, error:null });

    if (this.isInvalid())
      return;

    const { email, password } = this.state;

    userService
      .loginWithEmailAndPassword(email, password)
      .then((user) => { c_log(user);
        this.setState({ ...INITIAL_STATE });
        
        if (!user.emailVerified)
          this.props.history.push(user.type==="B"?ROUTES.PLEASE_CONFIRM_EMAIL_B:ROUTES.PLEASE_CONFIRM_EMAIL);
        else {
          const params = queryString.parse(this.props.location.search);
          c_log("fwd:"+params.fwd);
          if (params.fwd)
            this.props.history.push(params.fwd);
          else
            this.props.history.push(user.type==="B"?ROUTES.ACCOUNT_B : ROUTES.ACCOUNT);
        }
      })
      .catch(error => {
        this.setState({ error, loading:false });
      });

      
  };

  isInvalid(){
    const { email, password } = this.state;
    return password === '' || email === '';
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error, loading } = this.state;
    return (
      <>
      <SpinnerOverlay loading={loading}>
      <Form onSubmit={this.onSubmit}>
        <Form.Group>
          <label htmlFor="email">Email address</label>
          <Form.Input type="email" id="email" name="email"
            value={email}
            onChange={this.onChange} />

        </Form.Group>
        <Form.Group>
          <label htmlFor="password">Password</label>
          <Form.Input type="password" id="password"
            name="password"
            value={password}
            onChange={this.onChange}
          />
        </Form.Group>

        <Button primary type="submit" disabled={this.isInvalid()}> Login</Button>
        {error && <Alert danger style={{marginTop:'10px'}}><ErrorMessage error={error} /></Alert>}
      </Form>
      </SpinnerOverlay>
      </>
    );
  }
}

const LoginForm = compose(
  withRouter
)(LoginFormBase);

export default LoginPage;
export { LoginForm };