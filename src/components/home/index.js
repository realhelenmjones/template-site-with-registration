import React from 'react';

import {Row,Col, Card, Container,Button } from 'bootstrap-4-react'
import * as ROUTES from '../../constants/routes';

import { Link } from 'react-router-dom';

const HomePage = () => (
  <>
  
  <Container>
          <Row>
          <Col col="sm">
          <Card text="center">
        <Card.Header ><b>Who?</b></Card.Header>
        <Card.Image src="/images/solid_blue.png" top/>
        <Card.Body>
          <Card.Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </Card.Text>         
        </Card.Body>
        </Card>
</Col> 
<Col col="sm">
          <Card text="center">
        <Card.Header ><b>Why?</b></Card.Header>
        <Card.Image src="/images/solid_yellow.png" top/>
        <Card.Body>
          <Card.Text>
          Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit. 
          </Card.Text>         
        </Card.Body>
        </Card>
</Col>
<Col col="sm">
          <Card text="center">
        <Card.Header ><b>What?</b></Card.Header>
        <Card.Image src="/images/solid_pink.png" top/>
        <Card.Body>
          <Card.Text>
          Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam.
          </Card.Text>         
        </Card.Body>
        </Card>
</Col>              
          </Row>          
      </Container>
      <Container>
        <Row>
        <Col col="sm">
             
          <Link to={ROUTES.REGISTER}>
    <Button primary type="button" style={{width:'100%'}}>Register A</Button>
    </Link>
    
</Col>
<Col col="sm">
        
          <Link to={ROUTES.REGISTER_B}>
    <Button primary type="button" style={{width:'100%'}}>Register B</Button>
    </Link>
     
</Col> 
        </Row>
      </Container>
  
  <Container style={{backgroundColor:'rgba(0,0,0,.03)', padding:'10px'}}>
      <b>Maecenas fermentum consequat mi?</b>
      <p>Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat.</p>
<b>Nullam varius, turpis et commodo?</b>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. !!!
</p>

<b>Duis aute irure ?</b>
<ol>
  <li>Donec lobortis risus a elit.</li>
  <li>Ut ullamcorper, ligula eu tempor congue,.</li>
  <li>Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque.</li>
</ol>

  </Container>
   
  
  </>
);

export default HomePage;