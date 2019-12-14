import React from 'react';
import './App.css';
import Header from '../src/components/Header';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from '../src/components/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className="intro">
          <h3>Welcome to SafeHaven</h3>
          <p>Saving lives and properties is our mission</p>
          
            <Button variant="contained" color="primary"><Link to="/Login">Get started</Link></Button>
            <Switch>
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
