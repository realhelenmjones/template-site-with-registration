import React from 'react';

import PropTypes from "prop-types";
import urlPropType from 'url-prop-type';

import { Container, Alert } from 'bootstrap-4-react';
import {LooksLikeALink} from '_common/components/CustomLink'
import ErrorMessage from '_common/components/ErrorMessage';
import userService from '../../services/UserService'



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
    userService.sendEmailVerification(this.props.successUrl)
      .then(() => {
        this.doSetState(true,null);        
      })
      .catch(error => {
        this.doSetState(false,error);        
      })
  }

  render() {
    const {error, emailSent} = this.state;
    const {email, children} = this.props;
    return (
      <Container>
      
      {children}    
      
      <p>If the email isn't there (it may take a few minutes) <LooksLikeALink onClick={this.sendEmailAgain}>send another email</LooksLikeALink> </p>

      {email && <p>The email address you is <b>{email}</b></p>}
            
      {emailSent && <Alert success>Email sent again. Note: it may take a few minutes to arrive.</Alert>}
            
      {error && <Alert warning><ErrorMessage error={error}/></Alert>}   
      </Container>
    )
  }

}

BaseConfirmEmailAddress.propTypes = {
  successUrl: urlPropType.isRequired,
  children: PropTypes.any.isRequired 
};



export default BaseConfirmEmailAddress