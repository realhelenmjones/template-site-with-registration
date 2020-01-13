
import React  from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Collapse, Navbar, Nav, Container, Dropdown, Row, Col } from 'bootstrap-4-react';
import {LinkContainer} from 'react-router-bootstrap'

import * as ROUTES from '../../constants';

import {PrivateRouteTypeA,PrivateRouteTypeB} from '../../util/PrivateRoute';
import { AuthUserContext,withAuthentication } from '../../util/Session';
import ErrorBoundary  from '../../util/ErrorBoundary'

import HomePage from '../Home'
import AccountPage from '../Account';
import AccountPageB from '../AccountB';
import LoginPage from '../Login'
import LogoutPage from '../Logout'
import RegisterFormA,{RegisterFormB,ConfirmEmailAddress,ConfirmEmailAddressB, EmailConfirmedPage, EmailConfirmedPageB, ResetPasswordPage} from '../Register'

import {AccountLink} from '../Register/links'




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
        
        <Route path={ROUTES.PLEASE_CONFIRM_EMAIL} component={ConfirmEmailAddress} />      
        <Route path={ROUTES.PLEASE_CONFIRM_EMAIL_B} component={ConfirmEmailAddressB} />      
        
        <Route  path={ROUTES.EMAIL_CONFIRMED_SUCCESS} component={EmailConfirmedPage} />  
        <Route  path={ROUTES.EMAIL_CONFIRMED_SUCCESS_B} component={EmailConfirmedPageB} />  

        <PrivateRouteTypeA exact path={ROUTES.ACCOUNT} component={AccountPage}/>      
        <PrivateRouteTypeB path={ROUTES.ACCOUNT_B} component={AccountPageB}/>      
        

        <Route path={ROUTES.LOGIN} component={LoginPage} />
        <Route path={ROUTES.LOGOUT} component={LogoutPage} />
        <Route exact path={ROUTES.HOME} component={HomePage} />
        
        
        <Route path={ROUTES.RESET_PASSWORD} component={ResetPasswordPage} />      
  </Container>
  </ErrorBoundary>

)

const Header = () => (
  <ErrorBoundary>
  <AuthUserContext.Consumer>
     {authUser =>
  <React.Fragment>
  
     
    <div className='titleBar'><Link to={ROUTES.HOME}>Website Template</Link></div>    
   
   <Navbar expand="lg" light bg="light" mb="3">      
        <Navbar.Toggler target="#navbarColor1" />
        <Collapse navbar id="navbarColor1">            
          <Navbar.Nav mr="auto">
            {  authUser ? <NavigationAuth />: <NavigationNonAuth />}          
          </Navbar.Nav>   
          {authUser &&        
          <Navbar.Text><AccountLink style={{textDecoration:'none'}}><img src="/images/avatar.png" style={{height:'18px'}}/> { authUser.displayName?authUser.displayName:'' }</AccountLink></Navbar.Text> 
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
  <LinkContainer to={ROUTES.ACCOUNT}><Nav.ItemLink>My Profile</Nav.ItemLink></LinkContainer>  
  </>
 
);

const NavigationNonAuth = () => (
  <>
  <LinkContainer to={ROUTES.REGISTER}><Nav.ItemLink>Register type A</Nav.ItemLink></LinkContainer>
  <LinkContainer to={ROUTES.REGISTER_B}><Nav.ItemLink>Register type B</Nav.ItemLink></LinkContainer>
  <LinkContainer to={ROUTES.LOGIN}><Nav.ItemLink>Login </Nav.ItemLink></LinkContainer>  
  <LinkContainer to={ROUTES.ACCOUNT}><Nav.ItemLink>My Account type A</Nav.ItemLink></LinkContainer>  
  <LinkContainer to={ROUTES.ACCOUNT_B}><Nav.ItemLink>My Account type B</Nav.ItemLink></LinkContainer>  
  <Nav.Item dropdown>
              <Nav.Link dropdownToggle>Drop down</Nav.Link>
              <Dropdown.Menu>
                <Dropdown.Item>Go here</Dropdown.Item>
                <Dropdown.Item>Go there</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>Somewhere else</Dropdown.Item>
              </Dropdown.Menu>
            </Nav.Item>
  
  </>
);



export default withAuthentication(App);