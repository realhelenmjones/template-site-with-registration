import React from 'react';

import {ConfirmNewEmailMessage as BaseConfirmNewEmailMessage} from '_registration/components/email-address';

import * as ROUTES from 'constants/routes';

export default ()=> 
<BaseConfirmNewEmailMessage successUrl={ROUTES.ACCOUNT} />

