import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import WebcamCapture from "./WebCam";
import history from "./History";
import PlayGround from "./PlayGround";
import Header from "./Header";
import LandingPage from "./LandingPage";

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <Header />
          <Switch>
            <Route path="/yap" exact component={LandingPage} />
            <Route path="/yap/data-collection" component={WebcamCapture} />
            <Route path="/yap/playground" component={PlayGround} />
          </Switch>
        </Router>
      </div>
    );
  }
}
