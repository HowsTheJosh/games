import React, { Component } from "react";
import { MemoryRouter, Switch, Route } from "react-router-dom";
import WebcamCapture from "./WebCam";
import history from "./History";
import PlayGround from "./PlayGround";
import Header from "./Header";
import LandingPage from "./LandingPage";

export default class Routes extends Component {
  render() {
    return (
      <div>
        <MemoryRouter history={history}>
          <Header />
          <Route path="/" exact component={LandingPage} />
          <Route path="/data-collection" component={WebcamCapture} />
          <Route path="/playground" component={PlayGround} />
        </MemoryRouter>
      </div>
    );
  }
}
