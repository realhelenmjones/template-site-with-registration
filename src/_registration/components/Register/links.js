import React from 'react'
import {Link } from 'react-router-dom';

import * as ROUTES from 'constants/routes';
import { AuthUserContext } from '../../util/Session';


const AccountLink = (props) => (
    <AuthUserContext.Consumer>
        {authUser => {
            const to = authUser.type === "B" ? ROUTES.ACCOUNT_B : ROUTES.ACCOUNT;
            return <Link to={to} {...props} >{props.children}</Link>
        }}
     </AuthUserContext.Consumer>

)

export {AccountLink}