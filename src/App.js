import React from 'react';
import Login from './components/navigation/login';
import Join from './components/navigation/join';
import Navbar from './components/navigation/navbar';
import Account from './components/account/account';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Navbar} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/join" component={Join} exact />
        <Route path="/account" component={Account} exact />
      </Switch>
    </Router>
  );
}

export default App;
