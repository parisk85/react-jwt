import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import RegisterForm from './auth/RegisterForm'
import LoginForm from './auth/LoginForm'

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path='/' component={LoginForm} />
          <Route path='/confirm/*' component={LoginForm} />
          <Route exact path='/auth/login' component={LoginForm} />
          <Route exact path='/auth/register' component={RegisterForm} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
