import React from "react";
import Typical from "react-typical";
import { connect } from "react-redux";
import history from "./History";
const step1 = [
  "Hello 👋",
  1000,
  "Welcome to Games-IC 🎮",
  2000,
  "Login with Facebook to continue...",
  2000,
];
// const step2 = ["Welcome to Games-IC", 5000];
class LandingPage extends React.Component {
  componentDidMount() {
    if (this.props.userId == "" || this.props.userId == "null") {
      console.log("NOT SIGNED IN");
    } else {
      console.log("ELSE");
      console.log("SIGNED IN", this.props.userId);
      history.push("/games-ic/data-collection");
    }
  }

  render() {
    return (
      <div
        className=""
        style={{
          fontSize: "90px",
          textAlign: "center",
          paddingTop: "10%",
          fontFamily: "Courier New",
        }}
      >
        <Typical wrapper="span" steps={step1} loop={Infinity} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { userId: state.auth.userId };
};

export default connect(mapStateToProps)(LandingPage);
