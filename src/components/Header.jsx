import React from 'react';
import '../styles/header.css'
function Header(){
    return(
        <div className="header">
            <ul>
                <li>Home</li>
                <li>About us </li>
                <li className="button">Register</li>
                <li className="button">Login</li>
            </ul>
        </div>
    )
}

export default Header;