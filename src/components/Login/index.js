import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { compose } from 'recompose';
import { Form, Button } from 'bootstrap-4-react';


import ErrorMessage from '../ErrorMessage';
import userService from '../../services/UserService'
import * as ROUTES from '../../constants';

const LoginPage = () => (
  <div>
    <LoginForm />
    <p>
        Don't have an account? <Link to={ROUTES.REGISTER}>Register</Link>
    </p>
  </div>
);

const INITIAL_STATE = {
  email: 'bluewaterblue@hotmail.com',
  password: 'aaaaaaaa1q',
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
      .then(() => {console.log("jhjhjhjhjhjh");
        this.props.history.push(ROUTES.ACCOUNT);
      })
      .catch(error => {
        this.setState({ error });
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
        {error && <p><ErrorMessage error={error} /></p>}
      </Form>
    );
  }
}

const LoginForm = compose(
  withRouter
)(LoginFormBase);

export default LoginPage;
export { LoginForm };