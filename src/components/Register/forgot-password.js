import React, { Component } from 'react';
import { Form, Button,Alert } from 'bootstrap-4-react';
import SpinnerOverlay from '../../util/SpinnerOverlay'

import ErrorMessage from '../ErrorMessage';
import userService from '../../services/UserService'
import { c_log } from '../../util/logger'

class ResetPasswordPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            loading:false,
            success:false
        }
        
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };

    onSubmit = event => {
        const { email } = this.state;
        this.setState({ error:null, loading:true, success:false });
        userService.doPasswordReset(email)
            .then(() => {
                this.setState({ error: null, loading:false, success:true });
            })
            .catch(error => {
                this.setState({ error, loading:false, success:false });
            });
        event.preventDefault();
    };

    render() {
        const { email, error, success, loading } = this.state;
        return (
            <>
              {success ? <Alert success>We have sent you an email to reset your password</Alert> :
          <SpinnerOverlay loading={loading}>
          <Form onSubmit={this.onSubmit}>
            <Form.Group>
              <label htmlFor="email">Email address</label>
              <Form.Input type="email" id="email" name="email"
                value={email}
                onChange={this.onChange} />    
            </Form.Group>
           
    
            <Button primary type="submit"> Reset Password</Button>
            {error && <Alert danger style={{marginTop:'10px'}}><ErrorMessage error={error} /></Alert>}
          </Form>
          </SpinnerOverlay>
    }
          </>
        );
      }    
  
}


export default ResetPasswordPage;

