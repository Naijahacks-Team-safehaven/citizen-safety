 import React from 'react';
 import Button from '@material-ui/core/Button';
 import Header from './Header';
 import { Link } from 'react-router-dom';
 import '../styles/homepage.css';
 function Homepage(){
     return(
         <div>
            <Header />
          <div className="home">
          <h3>Welcome to SafeHaven</h3>
          <p>Saving lives and properties is our mission</p>
          <Button variant="contained" color="primary"><Link to="/Login">Get started</Link></Button>
          </div>
         </div>
         
     )
 }

 export default Homepage;