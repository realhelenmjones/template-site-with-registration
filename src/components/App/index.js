
import React  from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Collapse, Navbar, Nav, Container } from 'bootstrap-4-react';
import {LinkContainer} from 'react-router-bootstrap'

import * as ROUTES from '../../constants/routes';
import { AuthUserContext,withAuthentication } from '../../util/Session';

import HomePage from '../Home'
import AccountPage from '../Account';
import LoginPage from '../Login'
import LogoutPage from '../Logout'
import RegisterPage from '../Register'





const App = () => (

  <Router>
    <Header />
    <Main />
  </Router>

);


const Main = () => (
<Container>
        <Route path={ROUTES.REGISTER} component={RegisterPage} />
        <Route path={ROUTES.LOGIN} component={LoginPage} />
        <Route path={ROUTES.LOGOUT} component={LogoutPage} />
        <Route exact path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />      
  </Container>
)

const Header = () => (
  <AuthUserContext.Consumer>
     {authUser =>
  <React.Fragment>    
    <h1 style={{backgroundColor:'black', color:'white', textAlign:'center', marginBottom:'0px'}}>Helen M Jones</h1>  
   <Navbar expand="lg" dark bg="dark" mb="3">
        {/* <Navbar.Brand href="#"><img src="/images/profile.png" /><br /></Navbar.Brand> */}
        <Navbar.Toggler target="#navbarColor1" />
        <Collapse navbar id="navbarColor1">            
          <Navbar.Nav mr="auto">
            {  authUser? <NavigationAuth />: <NavigationNonAuth />}          
          </Navbar.Nav>           
        </Collapse>
      </Navbar>     
</React.Fragment>
}
</AuthUserContext.Consumer>
);


const NavigationAuth = () => (
  <>
  <LinkContainer to="/account"><Nav.ItemLink>Account</Nav.ItemLink></LinkContainer>  
  <LinkContainer to="/logout"><Nav.ItemLink>Logout</Nav.ItemLink></LinkContainer>
  </>
);

const NavigationNonAuth = () => (
  <>
  <LinkContainer to="/register"><Nav.ItemLink>Register</Nav.ItemLink></LinkContainer>
  <LinkContainer to="/login"><Nav.ItemLink>Login</Nav.ItemLink></LinkContainer>  
  </>
);



export default withAuthentication(App);