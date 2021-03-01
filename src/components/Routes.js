import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
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
            <Route path="/games" exact component={LandingPage} />
            <Route path="/games/playground" component={PlayGround} />
          </Switch>
        </Router>
      </div>
    );
  }
}
