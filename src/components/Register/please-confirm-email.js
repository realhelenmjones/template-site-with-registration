import React from 'react';

import { Container, Alert } from 'bootstrap-4-react';

import ErrorMessage from '../ErrorMessage';
import userService from '../../services/UserService'
import {c_log} from '../../util/logger'

class ConfirmEmailAddress extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      emailSent: false
    }
    this.sendEmailAgain = this.sendEmailAgain.bind(this);
  }

  doSetState(emailSent, error){
    this.setState({
      emailSent,
      error
    })
  }

  sendEmailAgain(e) {
    e.preventDefault();
    this.doSetState(false,null);
    userService.sendEmailVerification()
      .then(() => {
        this.doSetState(true,null);        
      })
      .catch(error => {
        this.doSetState(false,error);        
      })
  }

  render() {
    const {error, emailSent} = this.state;
    const {email} = this.props;
    return (
      <>
        <Container>
          <div>
            <h3>Activate your account</h3>

            {email ?
              <p>Email address you registered with is <b>{email}</b></p>
              : null}

            <p> We have sent you a link to activate your account. Please check your email (including your spam folder). </p>

            <p>If the email isn't there (it may take a few minutes) <a href="#" onClick={this.sendEmailAgain}>send another email</a> </p>

            {emailSent ?
              <Alert success>Email sent again. Note: it may take a few minutes to arrive.</Alert>
              : null}
               {error ?
              <Alert warning><ErrorMessage error={error}/> Please try again later</Alert>
              : null}


          </div>


        </Container>
      </>
    )
  }

}

export default ConfirmEmailAddress;