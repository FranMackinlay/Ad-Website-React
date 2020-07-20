import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from './components/Register/register';
import Login from './components/Login/login';
import Ads from './components/Ads/ads';
import adDetail from './components/AdDetail/adDetail';
import CreateAd from './components/CreateAd/createAd';
import EditAd from './components/EditAd/editAd';
import Profile from './components/Profile/profile';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route exact path="/editAd/id=:_id" component={EditAd} />
          <Route exact path="/ads/:_id" component={adDetail} />
          <Route path="/ads" component={Ads} />
          <Route path="/createAd" component={CreateAd} />
          <Route path="/profile" component={Profile} />
          <Route to="/ads" component={Ads} />
        </Switch>
      </Router>
    );
  }
}
