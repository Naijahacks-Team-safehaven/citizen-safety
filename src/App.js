import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from '../src/components/Login';
import Homepage from '../src/components/Homepage'

function App() {
  return (
    <div className="App">
      <Router>
        <div className="intro">      
            <Switch>
              <Route exact path="/">
                <Homepage />
              </Route>
              <Route path="/Login">
                  <Login />
              </Route>
            </Switch>    
        </div>
        </Router>
    </div>

  );
}

export default App;
