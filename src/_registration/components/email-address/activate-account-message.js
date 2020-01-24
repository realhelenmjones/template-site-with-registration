import React from 'react';
import urlPropType from 'url-prop-type';

import BaseConfirmEmailAddress from './base-confirm-email-message';

const ActivateAccountMessage = ({successUrl}) =>
  <BaseConfirmEmailAddress successUrl >
        <h1>Please activate your account.</h1>

        <p> We have sent you a link to activate your account. Please check your email (including your spam folder). </p>
  </BaseConfirmEmailAddress>

ActivateAccountMessage.propTypes = {
  successUrl: urlPropType.isRequired 
};

export default ActivateAccountMessage