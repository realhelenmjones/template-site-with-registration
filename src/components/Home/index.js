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
        <Card.Header>One</Card.Header>
        <Card.Body>
          <Card.Text>
          Blah blah blah blah
          </Card.Text>         
        </Card.Body>
        </Card>
</Col> 
<Col col="sm">
          <Card text="center">
        <Card.Header>Two</Card.Header>
        <Card.Body>
          <Card.Text>
          Blah blah blah blah. Blah blah blah blah
          </Card.Text>         
        </Card.Body>
        </Card>
</Col>
<Col col="sm">
          <Card text="center">
        <Card.Header>Three</Card.Header>
        <Card.Body>
          <Card.Text>
          Blah blah blah blah. Blah blah blah blah. Blah blah blah blah
          </Card.Text>         
        </Card.Body>
        </Card>
</Col>              
          </Row>
      </Container>
  
  <Container >
  <Link to={ROUTES.REGISTER}>
    <Button primary type="button" style={{width:'100%'}}>Register</Button>
    </Link>
    </Container>
    <Container>
    <h2>Blah blah blah blah</h2>
    <p>dfff</p>
    </Container>

  </>
);

export default HomePage;