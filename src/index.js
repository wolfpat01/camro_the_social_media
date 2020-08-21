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
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/logout" component={Logout} />
      <Route path="/" component={App} />
    </Switch>
  </Router>
  ,
  document.getElementById('root')
);

serviceWorker.unregister();
