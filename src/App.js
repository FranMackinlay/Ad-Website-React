import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Register from './components/Register/register';
import Login from './components/Login/login';
import Ads from './components/Ads/ads';
import adDetail from './components/AdDetail/adDetail';
import CreateAd from './components/CreateAd/createAd';
import EditAd from './components/EditAd/editAd';
// import './App.css';

export default class App extends Component {
  render() {
    return (
      <Router>


        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route exact path="/editAd/id=:_id" component={EditAd} />
          <Route exact path="/anuncios/:_id" component={adDetail} />
          <Route path="/anuncios" component={Ads} />
          <Route path="/createAd" component={CreateAd} />
          <Route to="/register" component={Register} />
        </Switch>

      </Router>

    )
  }

}
