import React from 'react'

import PropTypes from "prop-types";
import urlPropType from 'url-prop-type';


import { Alert } from 'bootstrap-4-react';

import {WarnIcon} from '_icons'
import { UpdateEmailForm } from '_registration/components/email-address'


const UpdateEmail = ({success, cancel, confirmedEmailSuccessUrl}) => {
    return (
        <>
        <Alert warning><WarnIcon /> When you change your email we will send you a link to click on. 
            We will also send a link to your previous email address in case you change your mind</Alert>
        <UpdateEmailForm
            success={success}
            cancel={cancel}
            confirmedEmailSuccessUrl={confirmedEmailSuccessUrl}
        />
</>
    )
}

UpdateEmailForm.propTypes = {
    success: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
    confirmedEmailSuccessUrl: urlPropType.isRequired
  };
  
export default UpdateEmail