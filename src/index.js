import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './css/index.css';
import App from './App';
import Login from "./login.js"
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/login">
        <Login mod="login" />
      </Route>
      <Route path="/register">
        <Login mod="register" />
      </Route>
      <Route path="/">
        <App />
      </Route>
    </Switch>
  </Router>
  //

  ,
  document.getElementById('root')
);

serviceWorker.unregister();
