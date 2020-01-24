import React from 'react'

import { useHistory } from "react-router-dom";

import * as ROUTES from 'constants/routes';
import { UpdateEmailForm } from '_registration/components/email-address'


const UpdateEmailB = () => {
    const history = useHistory();
    return (
        <>
        <UpdateEmailForm
            success={() => history.replace(ROUTES.PLEASE_CONFIRM_EMAIL_B)}
            cancel={() => history.replace(ROUTES.ACCOUNT_B)}
            confirmedEmailSuccessUrl={ROUTES.EMAIL_CONFIRMED_SUCCESS_URL_B}
        />
</>
    )
}

export default UpdateEmailB