import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Register from './components/Register/register';
import Login from './components/Login/login';
import Ads from './components/Ads/ads';
import adDetail from './components/AdDetail/adDetail';
import CreateAd from './components/CreateAd/createAd';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <Router>


        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/anuncios" component={Ads} />
          <Route exact path="/detail/:_id" component={adDetail} />
          <Route path="/createAd" component={CreateAd} />

          <Redirect to="/register" />
        </Switch>

      </Router>

    )
  }

}
