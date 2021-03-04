import React, { Component } from "react";

class Loading extends Component {
  render() {
    return (
      <div className="">
        <div className="ui active dimmer">
          <div className="ui massive text loader">
            <h1>Loading</h1> <br />
            Use Google Chrome for better experience.
            <br />
            <h5>If the game takes too long to load, please refresh.</h5>
          </div>
        </div>
      </div>
    );
  }
}

export default Loading;
