import React from "react";
import FbAuth from "./FbAuth";
import im from "../Images/logo.png";
import history from "./History";
import { connect } from "react-redux";
const Header = (props) => {
  return (
    <div id="headerdiv" className="ui segment">
      <div className="ui secondary menu">
        <img
          src={im}
          style={{
            width: "130px",
            height: "130px",
            marginTop: "-40px",
            marginBottom: "-40px",
          }}
        ></img>
        <div className="right menu">
          {props.uname && (
            <div className="ui label" style={{ fontSize: "23px" }}>
              {props.uname}
            </div>
          )}

          <button
            className="ui green button large"
            onClick={() => history.push("/games-ic")}
          >
            <i className="home icon" />
            Home
          </button>
          <button
            className="ui green button large"
            onClick={() => history.push("/games-ic/get-started")}
          >
            <i className="info icon" />
            Get Started
          </button>
          <button
            className="ui green button large"
            style={{ marginRight: 10 }}
            onClick={() =>
              (window.location.href =
                "https://www.termsfeed.com/live/533ef9ae-a10f-4065-b0c6-a4581222d0c9")
            }
          >
            <i className="file icon" />
            Privacy Policy
          </button>
          <FbAuth />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { uname: state.auth.userName };
};

export default connect(mapStateToProps)(Header);
