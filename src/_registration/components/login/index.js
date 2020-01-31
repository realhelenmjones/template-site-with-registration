import React, { Component } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';
import PropTypes from "prop-types";
import { compose } from 'recompose';
import { Form, Button, Alert } from 'bootstrap-4-react';
import queryString from 'query-string';

import SpinnerOverlay from '_common/util/SpinnerOverlay'

import ErrorMessage from '_common/components/ErrorMessage';
import userService from '../../services/UserService'

// import {c_log} from '_common/util/logger'



const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
  loading: false,
  redirect: undefined
};

class LoginFormBase extends Component {

  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }


  onSubmit = event => {
    try {
      event.preventDefault();


      if (this.isInvalid())
        return;

      this.setState({ loading: true, error: null });

      const { email, password } = this.state;
      const {success, confirmEmail} = this.props;

      userService
        .loginWithEmailAndPassword({ email, password })
        .then((user) => {

          let redirect;
          if (!user.emailVerified)
            return confirmEmail()
          else {
            const params = queryString.parse(this.props.location.search);

            if (params.fwd)
              redirect = params.fwd;
            else
            return success()
          }
          this.setState({ ...INITIAL_STATE, redirect });
        })
        .catch(error => {
          this.setState({ error, loading: false });
        });

    }
    catch (error) {
      this.setState({ ...INITIAL_STATE, error });
    }
  };

  isInvalid() {
    const { email, password } = this.state;
    return password === '' || email === '';
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { redirect } = this.state;
    if (redirect)
      return <Redirect to={redirect} />

    const { email, password, error, loading } = this.state;
    return (
      <>        
        <SpinnerOverlay loading={loading}>
          <div className="formContainer">
            <Form onSubmit={this.onSubmit} method='POST'>
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

              <Button primary lg type="submit" disabled={loading}> Login</Button>
              {error && <Alert danger style={{ marginTop: '10px' }}><ErrorMessage error={error} /></Alert>}
            </Form>
          </div>
        </SpinnerOverlay>

      </>
    );
  }
}

LoginFormBase.propTypes = {
  success: PropTypes.func.isRequired,
  confirmEmail: PropTypes.func.isRequired
};

const LoginForm = compose(
  withRouter
)(LoginFormBase);

export default LoginForm;
