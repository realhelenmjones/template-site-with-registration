import React from 'react'
import {Link } from 'react-router-dom';

import {LinkContainer} from 'react-router-bootstrap'

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


const AccountLinkContainer = (props) => (
    <AuthUserContext.Consumer>
        {authUser => {
            const to = authUser.type === "B" ? ROUTES.ACCOUNT_B : ROUTES.ACCOUNT;
            return <LinkContainer to={to} {...props} >{props.children}</LinkContainer>
        }}
     </AuthUserContext.Consumer>

)

export {AccountLink, AccountLinkContainer}