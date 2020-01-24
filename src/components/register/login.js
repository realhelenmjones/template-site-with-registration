import React from 'react'
import { useHistory, Link } from "react-router-dom";

import * as ROUTES from 'constants/routes';


import LoginForm  from '_registration/components/login';


const Login = () => {
    const history = useHistory();
    return (
        <>
            <LoginForm
                success={()=>history.replace(ROUTES.ACCOUNT)}
                confirmEmail={()=>history.replace(ROUTES.PLEASE_CONFIRM_EMAIL)}
            />
            <Link to={ROUTES.RESET_PASSWORD}>Forgot Password</Link>
        </>
    )
}
export default Login;