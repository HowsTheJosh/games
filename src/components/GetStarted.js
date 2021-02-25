import React from "react";
import modalimg from "../Images/modal.png";
class GetStarted extends React.Component {
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>HOW TO USE</h1>
        <p>1. Login with Facebook.</p>
        <img src={modalimg} style={{ width: "50%" }} />
      </div>
    );
  }
}

export default GetStarted;
