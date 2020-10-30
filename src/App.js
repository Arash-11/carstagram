import React from 'react';
import Login from './components/Login';
import SignUp from './components/Signup';
import Mainpage from './Mainpage';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Mainpage} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/signup" component={SignUp} exact />
        <Route component={Mainpage} />
      </Switch>
    </Router>
  );
}

export default App;
