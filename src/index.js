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
import { Login, Register, Logout } from "./components/login"
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/logout">
        <Logout />
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
