import React from 'react';

import { Container } from 'bootstrap-4-react';

import userService from '../../services/UserService'

class ConfirmEmailAddress extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      emailSent: false
    }
    this.sendConfirmationEmail=this.sendConfirmationEmail.bind(this);
  }

  sendConfirmationEmail() {
    userService.onSendEmailVerification();
    this.setState({
      emailSent: true
    }
    )
  }

  render() {
    return (
    <>
      <Container>
        {!this.state.emailSent ? (
          <div>
            <h3>Email address needs confirming</h3>

            <p>Email address you registered with: {this.props.emailAddress}</p>
            <p> Verify your E-Mail: Check you E-Mails (Spam folder
                        included) for a confirmation E-Mail or send
                  another confirmation E-Mail.</p>

            <button
              type="button"
              onClick={this.sendConfirmationEmail}
            >
              Send another confirmation E-Mail
                </button>
          </div>
        ) : (
            <div>
              <h3>Email Sent!</h3>
              <p>Email address you registered with: {this.props.emailAddress}</p>
              
              <p> Verify your E-Mail: Check you E-Mails (Spam folder
                included) for a confirmation E-Mail or send
          another confirmation E-Mail.<br />

                <button
                  type="button"
                  onClick={this.sendConfirmationEmail}
                >
                  Send another confirmation E-Mail
                </button>
              </p>
            </div>
          )
        }


      </Container>
    </>
    )
  }

}

export default ConfirmEmailAddress;