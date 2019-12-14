import React from 'react';
import { TextField, Button } from '@material-ui/core'
function Login(){
    return(
        <div>
            <form>
                <TextField variant="outlined" label="Username"/>
                <TextField variant="outlined" label="Username"/>
                <Button color="primary"/>
            </form>
        </div>
    )
}
export default Login