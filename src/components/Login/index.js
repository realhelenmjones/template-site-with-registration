import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { compose } from 'recompose';
import { Form, Button } from 'bootstrap-4-react';

import { RegisterLink } from '../Register';
import userService from '../../services/UserService'
import * as ROUTES from '../../constants/routes';

const LoginPage = () => (
  <div>
    <h1>Login</h1>
    <LoginForm />
    <p>
        Don't have an account? <Link to={ROUTES.REGISTER}>Register</Link>
    </p>
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class LoginFormBase extends Component {

  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {

    event.preventDefault();    

    if (this.isInvalid())
      return;

    const { email, password } = this.state;

    userService
      .loginWithEmailAndPassword(email, password)
      .then(() => {
        this.props.history.push(ROUTES.ACCOUNT);
      })
      .catch(error => {
        this.setState({ error });
      });

      
  };

  isInvalid(){
    const { email, password, error } = this.state;
    return password === '' || email === '';
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;
    return (
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
        {error && <p>{error.message}</p>}
      </Form>
    );
  }
}

const LoginForm = compose(
  withRouter
)(LoginFormBase);

export default LoginPage;
export { LoginForm };