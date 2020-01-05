
import React  from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Collapse, Navbar, Nav, Container, Dropdown } from 'bootstrap-4-react';
import {LinkContainer} from 'react-router-bootstrap'

import * as ROUTES from '../../constants';

import PrivateRoute from '../../util/PrivateRoute';
import { AuthUserContext,withAuthentication } from '../../util/Session';
import ErrorBoundary  from '../../util/ErrorBoundary'

import HomePage from '../Home'
import AccountPage from '../Account';
import LoginPage from '../Login'
import LogoutPage from '../Logout'
import RegisterPage,{RegisterSuccessPage, EmailConfirmedPage, ResetPasswordPage} from '../Register'




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
        <Route path={ROUTES.REGISTER} component={RegisterPage} />
        <Route path={ROUTES.LOGIN} component={LoginPage} />
        <Route path={ROUTES.LOGOUT} component={LogoutPage} />
        <Route exact path={ROUTES.HOME} component={HomePage} />
        <PrivateRoute path={ROUTES.ACCOUNT} component={AccountPage} />      
        {/* {TODO PrivateRoute} */}
        <Route path={ROUTES.REGISTER_SUCCESS} component={RegisterSuccessPage} />      
        <Route path={ROUTES.EMAIL_CONFIRMED} component={EmailConfirmedPage} />  
        <Route path={ROUTES.RESET_PASSWORD} component={ResetPasswordPage} />      
  </Container>
  </ErrorBoundary>

)

const Header = () => (
  <ErrorBoundary>
  <AuthUserContext.Consumer>
     {authUser =>
  <React.Fragment>
  
     {/* TODO avatar for username account login */}
    <div className='titleBar'><Link to={ROUTES.HOME}>Software Developer Alliance .org.uk</Link></div>    
   
   <Navbar expand="lg" light bg="light" mb="3">      
        <Navbar.Toggler target="#navbarColor1" />
        <Collapse navbar id="navbarColor1">            
          <Navbar.Nav mr="auto">
            {  authUser && authUser.canLogOn? <NavigationAuth authUser={authUser}/>: <NavigationNonAuth />}          
          </Navbar.Nav>   
          {authUser && authUser.canLogOn ?        
          <Navbar.Text><Link to={ROUTES.ACCOUNT} style={{textDecoration:'none'}}><img src="./images/avatar.png" style={{height:'18px'}}/> { authUser.username?authUser.username:'' }</Link></Navbar.Text> 
          :null} 
        </Collapse>
      </Navbar>    
      
</React.Fragment>
}
</AuthUserContext.Consumer>
</ErrorBoundary>
);


const NavigationAuth = ({authUser}) => (
  authUser.canLogOn?
  <>  
  <LinkContainer to={ROUTES.LOGOUT}><Nav.ItemLink>Logout</Nav.ItemLink></LinkContainer>
  <LinkContainer to={ROUTES.ACCOUNT}><Nav.ItemLink>My Profile</Nav.ItemLink></LinkContainer>  
  </>
  :
  null
);

const NavigationNonAuth = () => (
  <>
  <LinkContainer to={ROUTES.REGISTER}><Nav.ItemLink>Register</Nav.ItemLink></LinkContainer>
  <LinkContainer to={ROUTES.LOGIN}><Nav.ItemLink>Login</Nav.ItemLink></LinkContainer>  
  <Nav.Item dropdown>
              <Nav.Link dropdownToggle>My Account</Nav.Link>
              <Dropdown.Menu>
                <Dropdown.Item>Place 'Seeking Crop Picking' Advert</Dropdown.Item>
                <Dropdown.Item>Place 'Offering Crop Picking Work' Advert</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Nav.Item>
  
  </>
);



export default withAuthentication(App);