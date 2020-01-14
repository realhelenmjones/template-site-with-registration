import React from 'react';

import { Container, Alert } from 'bootstrap-4-react';

import ErrorMessage from '../ErrorMessage';
import userService from '../../services/UserService'
import * as ROUTES from 'constants/routes';


class BaseConfirmEmailAddress extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      emailSent: false,
      error: null
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
    userService.sendEmailVerification(this.props.confirmedEmailSuccessUrl)
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
            <h1>Please activate your account</h1>

           

            <p> We have sent you a link to activate your account. Please check your email (including your spam folder). </p>

            <p>If the email isn't there (it may take a few minutes) <a href="#" onClick={this.sendEmailAgain}>send another email</a> </p>

            {email ?
              <p>The email address you registered with is <b>{email}</b></p>
              : null}
            {emailSent ?
              <Alert success>Email sent again. Note: it may take a few minutes to arrive.</Alert>
              : null}
               {error ?
              <Alert warning><ErrorMessage error={error}/></Alert>
              : null}


          </div>


        </Container>
      </>
    )
  }

}

const ConfirmEmailAddress =()=>
<BaseConfirmEmailAddress confirmedEmailSuccessUrl={ROUTES.EMAIL_CONFIRMED_SUCCESS_URL} />


const ConfirmEmailAddressB =()=>
<BaseConfirmEmailAddress confirmedEmailSuccessUrl={ROUTES.EMAIL_CONFIRMED_SUCCESS_URL_B} />

export {ConfirmEmailAddress,ConfirmEmailAddressB};