import React from "react";
import Typical from "react-typical";
import Typist from "react-typist";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import history from "./History";
const step1 = ["🙏  Namaste  🙏", 2000, "Welcome to Kathputli 🎮", 2000];
const step2 = [" with Facebook.", 2000, " as Guest.", 2000];
const obj = { show: false, element: "" };

class LandingPage extends React.Component {
  state = { modalShow: false };
  componentDidMount() {
    if (this.props.userId == "" || this.props.userId == "null") {
    } else {
      history.push("/games/playground");
    }
  }

  render() {
    return (
      <>
        <div
          style={{
            fontSize: "85px",
            textAlign: "center",
            marginTop: "15%",
            fontFamily: "Courier New",
          }}
        >
          <div>
            <Typical wrapper="span" steps={step1} loop={1} />
          </div>
          <div style={{ fontSize: "55px" }}>
            <Typist cursor={obj}>Login</Typist>
            <Typical wrapper="span" steps={step2} loop={Infinity} />
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { userId: state.auth.userId };
};

export default connect(mapStateToProps)(LandingPage);
