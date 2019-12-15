import React from 'react';

import {Row,Col, Card, Container,Button } from 'bootstrap-4-react'
import * as ROUTES from '../../constants';

import { Link } from 'react-router-dom';

const HomePage = () => (
  <>
  
  <Container>
          <Row>
          <Col col="sm">
          <Card text="center">
        <Card.Header ><b>Who is this for?</b></Card.Header>
        <Card.Body>
          <Card.Text>
          Experienced developers who are currently out of work.
          </Card.Text>         
        </Card.Body>
        </Card>
</Col> 
<Col col="sm">
          <Card text="center">
        <Card.Header ><b>Why?</b></Card.Header>
        <Card.Body>
          <Card.Text>
          There are experienced software developers who have been forced to work or are contemplating working minimum wage jobs whilst they continue looking for their next professional opportunity. 
          </Card.Text>         
        </Card.Body>
        </Card>
</Col>
<Col col="sm">
          <Card text="center">
        <Card.Header ><b>So what?</b></Card.Header>
        <Card.Body>
          <Card.Text>
          Experienced software developers should not be working unskilled minimum wage jobs. Experienced software developers should be doing valuable development work even if they still only make minimum wage equivalent.
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
    <Button primary type="button" style={{width:'100%'}}>Join (Confidential)</Button>
    </Link>
    
</Col>
<Col col="sm">
        
          <Link to={ROUTES.CONTACT}>
    <Button primary type="button" style={{width:'100%'}}>Contact Us</Button>
    </Link>
     
</Col> 
        </Row>
      </Container>
  
  <Container style={{backgroundColor:'rgba(0,0,0,.03)', padding:'10px'}}>
      <b>How does the SDA work?</b>
      <p>It doesn't yet - but it will!  Lets get some members first.</p>
<b>What is the plan?</b>
<p>Lots of ideas but basically we're going to try and get companies to provide paid work to developers whilst they look for their next permanent or contract position.  
Is it a ridiculous idea? Well let's give it a go and see!!!
</p>


<b>Who is 'We'?</b>
<p>'We' is YOU and all the other members. WE are a mighty alliance.</p>


<b>Case Study</b>
<p>A developer of 20 years was made redundant. He spent 5 months looking for work whilst also studying hard and working on his own projects to update his skill set which had quickly become legacy (a familiar story). He wasn't able to find a job so eventually he had to get a minimum wage job in the Post Office sorting office.  He was stuck doing that for 12 months. That is shameful. Eventually he got a contract.</p>

<b>Who can join?</b>
<ol>
  <li>You must have a good few years experience as a software developer.</li>
  <li>You need to have been out of work for a minumum of 4 weeks.</li>
  <li>If you are also needing to update your skills then have a portfolio showing your (self learning) progress e.g on statckblitz, codepen, codesandbox.io etc etc. Just enough to enable companies to see that you are adequately competent in whatever new technology you've been learning.</li>
</ol>

<b>Help welcomed!</b>
<p>If you think this is a good idea and want to help or know someone who can help let us know (<Link to={ROUTES.REGISTER}>Join</Link> or <Link to={ROUTES.CONTACT}>Contact Us</Link>). 

</p>
   
  </Container>
   
  
  </>
);

export default HomePage;