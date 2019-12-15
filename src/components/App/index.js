
import React  from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Collapse, Navbar, Nav, Container } from 'bootstrap-4-react';
import {LinkContainer} from 'react-router-bootstrap'

import * as ROUTES from '../../constants';

import PrivateRoute from '../../util/PrivateRoute';
import { AuthUserContext,withAuthentication } from '../../util/Session';

import HomePage from '../Home'
import AccountPage from '../Account';
import LoginPage from '../Login'
import LogoutPage from '../Logout'
import RegisterPage,{RegisterSuccessPage} from '../Register'






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
        <PrivateRoute path={ROUTES.ACCOUNT} component={AccountPage} />      
        {/* {TODO PrivateRoute} */}
        <Route path={ROUTES.REGISTER_SUCCESS} component={RegisterSuccessPage} />      
  </Container>

)

const Header = () => (
  <AuthUserContext.Consumer>
     {authUser =>
  <React.Fragment>
  
     {/* TODO styled component */}
    <div className='titleBar'><Link to={ROUTES.HOME}>Software Developer Alliance .org.uk</Link></div>
   <Navbar expand="lg" light bg="light" mb="3">
      <Navbar.Brand href="#"></Navbar.Brand>
        <Navbar.Toggler target="#navbarColor1" />
        <Collapse navbar id="navbarColor1">            
          <Navbar.Nav mr="auto">
            {  authUser? <NavigationAuth authUser={authUser}/>: <NavigationNonAuth />}          
          </Navbar.Nav>           
          <Navbar.Text><Link to={ROUTES.ACCOUNT}>{  authUser?authUser.username:'' }</Link></Navbar.Text> 
        </Collapse>
      </Navbar>    
      
</React.Fragment>
}
</AuthUserContext.Consumer>
);


const NavigationAuth = ({authUser}) => (
  <>  
  <LinkContainer to={ROUTES.LOGOUT}><Nav.ItemLink>Logout</Nav.ItemLink></LinkContainer>
  <LinkContainer to={ROUTES.ACCOUNT}><Nav.ItemLink>My Profile</Nav.ItemLink></LinkContainer>  
  </>
);

const NavigationNonAuth = () => (
  <>
  <LinkContainer to={ROUTES.REGISTER}><Nav.ItemLink>Register</Nav.ItemLink></LinkContainer>
  <LinkContainer to={ROUTES.LOGIN}><Nav.ItemLink>Login</Nav.ItemLink></LinkContainer>  
  </>
);



export default withAuthentication(App);