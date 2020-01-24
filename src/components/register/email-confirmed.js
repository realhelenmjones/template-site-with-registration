import React from 'react';

import { Container, Button } from 'bootstrap-4-react';
import { Link } from 'react-router-dom';

import * as ROUTES from 'constants/routes';

const EmailConfirmedPage= ()=>(
  <>
    <Container>
        <h1>Account A - You are now registered</h1>

        
        <p><Link to={ROUTES.ACCOUNT}>
    <Button primary type="button" style={{width:'100%'}}>Your Account</Button>
    </Link></p>
        
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
        
        <p>Curabitur pretium tincidunt lacus. Nulla gravida orci a odio</p>
        
          
          <ol>
          <li>Nullam varius, turpis et commodo pharetra, est eros bibendum elit</li>
        
          <li>Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat.
          </li>
         
         </ol>

        
    </Container>   
</>
)

export default EmailConfirmedPage;