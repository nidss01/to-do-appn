// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginScreen from './component/LoginScreen';
import DashboardScreen from './component/DashboardScreen';
import TodoFormScreen from './component/TodoFormScreen';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginScreen} />
        <Route path="/dashboard" component={DashboardScreen} />
        <Route path="/add-todo" component={TodoFormScreen} />
      </Switch>
    </Router>
  );
};

export default App;
