import React from 'react';
import '../styles/header.css'
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
function Header(){
    return(
        <div className="header">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/About">About</Link></li>
                <li><Button><Link to="/login">Login</Link></Button></li>
                <li><Button><Link to="/Signup">Signup</Link></Button></li>
            </ul>
        </div>
    )
}

export default Header;