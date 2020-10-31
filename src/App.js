import React from 'react';
import Login from './components/Login';
import SignUp from './components/Signup';
import TopicContent from './components/TopicContent';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={TopicContent} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/signup" component={SignUp} exact />
        <Route component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
