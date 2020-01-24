import React from 'react'
import urlPropType from 'url-prop-type';

import BaseConfirmEmailAddress from './base-confirm-email-message'

const ConfirmNewEmailMessage = ({successUrl}) =>
    <BaseConfirmEmailAddress successUrl={successUrl} >
          <h1>Please confirm your email address.</h1>

          <p> We have sent you a link. Please check your email (including your spam folder). </p>
    </BaseConfirmEmailAddress>

ConfirmNewEmailMessage.propTypes = {
  successUrl: urlPropType.isRequired 
};

export default ConfirmNewEmailMessage