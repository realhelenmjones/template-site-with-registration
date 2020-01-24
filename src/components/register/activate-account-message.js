import React from 'react';

import {ActivateAccountMessage as BaseActivateAccountMessage} from '_registration/components/email-address';

import * as ROUTES from '../../constants/routes';

export default ()=> 
<BaseActivateAccountMessage successUrl={ROUTES.EMAIL_CONFIRMED_SUCCESS_URL} />

