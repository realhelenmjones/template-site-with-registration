import React from 'react'

import { useHistory } from "react-router-dom";

import * as ROUTES from 'constants/routes';
import { UpdateEmailForm } from '_registration/components/email-address'


const UpdateEmail = () => {
    const history = useHistory();
    return (
        <>
        <UpdateEmailForm
            success={() => history.replace(ROUTES.PLEASE_CONFIRM_EMAIL)}
            cancel={() => history.replace(ROUTES.ACCOUNT)}
            confirmedEmailSuccessUrl={ROUTES.EMAIL_CONFIRMED_SUCCESS_URL}
        />
</>
    )
}

export default UpdateEmail