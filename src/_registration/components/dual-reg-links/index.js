import React from 'react'
import {Link } from 'react-router-dom';

import {LinkContainer} from 'react-router-bootstrap'

import { AuthUserContext } from '../../util/tmp-session';

const AccountLink = (props) => (
    <AuthUserContext.Consumer>
        {authUser => {
            const to = authUser.type === "B" ? props.accountRouteB : props.accountRoute;
            return <Link to={to} {...props} >{props.children}</Link>
        }}
     </AuthUserContext.Consumer>

)


const AccountLinkContainer = (props) => (
    <AuthUserContext.Consumer>
        {authUser => {
            const to = authUser.type === "B" ? props.accountRouteB : props.accountRoute;
            return <LinkContainer to={to} {...props} >{props.children}</LinkContainer>
        }}
     </AuthUserContext.Consumer>

)

export {AccountLink, AccountLinkContainer}