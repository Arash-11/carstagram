import React from 'react';
import Login from './components/navigation/Login';
import SignUp from './components/navigation/Signup';
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
      </Switch>
    </Router>
  );
}

export default App;
