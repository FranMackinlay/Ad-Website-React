import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, withRouter, Redirect } from "react-router-dom";
import Register from './components/Register/register';
import Login from './components/Login/login';
import Ads from './components/Ads/ads';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <Router>


        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/ads" component={Ads} />

          <Redirect to="/register" />
        </Switch>

      </Router>

    )
  }

}
