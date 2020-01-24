
import React  from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Collapse, Navbar, Nav, Container, Dropdown } from 'bootstrap-4-react';
import {LinkContainer} from 'react-router-bootstrap'

import * as ROUTES from '../../constants/routes';

import {PrivateRouteTypeA,PrivateRouteTypeB} from '_registration/util/private-route';
import { AuthUserContext,withAuthentication } from '_registration/util/session';
import ErrorBoundary  from '_common/util/ErrorBoundary'

import HomePage from '../tmp-home'
import AccountPage from '../tmp-account';
import AccountPageB from '../tmp-accountB';
import LogoutPage from '_registration/components/logout'
import ResetPassword from '_registration/components/reset-password'
import {AccountLink,AccountLinkContainer} from '_registration/components/dual-reg-links'
import {RegisterFormA,RegisterFormB,ActivateAccountMessage, ActivateAccountMessageB, 
  EmailConfirmed, EmailConfirmedB, ConfirmNewEmailMessage,ConfirmNewEmailMessageB,
  Login,UpdateEmail, UpdateEmailB} from 'components/register'






const App = () => (
<ErrorBoundary>
  <Router>
    <Header />
    <Main />
  </Router>
  </ErrorBoundary>
);





const Main = () => (
  <ErrorBoundary>
<Container>
        <Route  path={ROUTES.REGISTER} component={RegisterFormA} />
        <Route path={ROUTES.REGISTER_B} component={RegisterFormB}/>

        <Route path={ROUTES.RESET_PASSWORD} component={ResetPassword} />    
        
        <Route path={ROUTES.PLEASE_CONFIRM_EMAIL} component={ActivateAccountMessage} />      
        <Route path={ROUTES.PLEASE_CONFIRM_EMAIL_B} component={ActivateAccountMessageB} />      
        
        <Route  path={ROUTES.EMAIL_CONFIRMED_SUCCESS} component={EmailConfirmed} />  
        <Route  path={ROUTES.EMAIL_CONFIRMED_SUCCESS_B} component={EmailConfirmedB} />  

        <PrivateRouteTypeA exact path={ROUTES.ACCOUNT} component={AccountPage}/>      
        <PrivateRouteTypeB path={ROUTES.ACCOUNT_B} component={AccountPageB}/>      
        

        <Route path={ROUTES.LOGIN} component={Login} />
        <Route path={ROUTES.LOGOUT} component={LogoutPage} />
        <Route exact path={ROUTES.HOME} component={HomePage} />
        
        
        
  </Container>
  </ErrorBoundary>

)

const Header = () => (
  <ErrorBoundary>
  <AuthUserContext.Consumer>
     {authUser =>
  <React.Fragment>
  
     
    <div className='titleBar'><Link to={ROUTES.HOME}>Website Template</Link></div>    
   
   <Navbar expand="sm" light bg="light" mb="3">      
        <Navbar.Toggler target="#navbarColor1" />
        <Collapse navbar id="navbarColor1">            
          <Navbar.Nav mr="auto">
            {  authUser ? <NavigationAuth />: <NavigationNonAuth />}          
          </Navbar.Nav>   
          {authUser &&        
          <Navbar.Text><AccountLink accountRouteB={ROUTES.ACCOUNT_B} accountRoute={ROUTES.ACCOUNT} style={{textDecoration:'none'}}><img src="/images/avatar.png" style={{height:'18px'}} alt="profile img"/> { authUser.displayName?authUser.displayName:'' }</AccountLink></Navbar.Text> 
          } 
        </Collapse>
      </Navbar>  
     
      
</React.Fragment>
}
</AuthUserContext.Consumer>
</ErrorBoundary>
);


const NavigationAuth = () => (
  <>  
  <LinkContainer to={ROUTES.LOGOUT}><Nav.ItemLink>Logout</Nav.ItemLink></LinkContainer>
  <AccountLinkContainer accountRouteB={ROUTES.ACCOUNT_B} accountRoute={ROUTES.ACCOUNT} ><Nav.ItemLink>My Profile</Nav.ItemLink></AccountLinkContainer>  
  </> 
);

const NavigationNonAuth = () => (
  <>
  <LinkContainer to={ROUTES.REGISTER}><Nav.ItemLink>Register type A</Nav.ItemLink></LinkContainer>
  <LinkContainer to={ROUTES.REGISTER_B}><Nav.ItemLink>Register type B</Nav.ItemLink></LinkContainer>
  <LinkContainer to={ROUTES.LOGIN}><Nav.ItemLink>Login </Nav.ItemLink></LinkContainer>  
  <LinkContainer to={ROUTES.ACCOUNT}><Nav.ItemLink>Account type A</Nav.ItemLink></LinkContainer>  
  <LinkContainer to={ROUTES.ACCOUNT_B}><Nav.ItemLink>Account type B</Nav.ItemLink></LinkContainer>  
 

  
  </>
);



export default withAuthentication(App);