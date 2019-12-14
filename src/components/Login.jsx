import React from 'react';
import { TextField, Button } from '@material-ui/core'
import Header from './Header';
import '../styles/login.css';
function Login(){
    return(
        <div>
            <Header />
            <div className="form-field">
                <form>
                    <TextField variant="outlined" label="Username"/>
                    <br />
                    <br />
                    <TextField variant="outlined" label="Password"/>
                    <br />
                    <br />
                    <Button color="primary" variant="contained">Login</Button>
                </form>
            </div>
        </div>
    )
}
export default Login