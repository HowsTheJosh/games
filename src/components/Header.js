import React from "react";
import FbAuth from "./FbAuth";
import im from "../Images/logo.png";
import history from "./History";
import { connect } from "react-redux";
import { signIn, setUserName } from "../actions";
const Header = (props) => {
  const generateGuestId = () => {
    var guestId = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    var guestName = "GUEST" + guestId;
    props.signIn(guestId);
    props.setUserName(guestName);
    history.push('/games/playground')
  };
  return (
    <div id="headerdiv" className="ui segment">
      <div className="ui secondary menu">
        <img
          src={im}
          style={{
            width: "180px",
            height: "180px",
            marginTop: "-65px",
            marginBottom: "-80px",
          }}
        ></img>
        <div className="right menu">
          {props.uname && (
            <div className="ui label" style={{ fontSize: "23px" }}>
              {props.uname}
            </div>
          )}

          <button
            className="ui button large"
            style={{
              marginRight: 10,
              backgroundColor: "rgb(0,180,0)",
              color: "white",
            }}
            onClick={() =>
              window.open(
                "https://www.termsfeed.com/live/533ef9ae-a10f-4065-b0c6-a4581222d0c9")
            }
          >
            <i className="file icon" />
            Privacy Policy
          </button>
          {props.uname.length != 0 ? null : (
            <button
              id="guestButton"
              className="ui button large"
              style={{
                marginRight: 10,
                backgroundColor: "#ff8e00",
                color: "white",
              }}
              onClick={generateGuestId}
            >
              <i className="user secret icon" />
              Login as Guest
            </button>
          )}
          {props.uname.length === 0 ? (
            <FbAuth />
          ) : props.uname.includes("GUEST") ? null : (
            <FbAuth />
          )}
          {/* <FbAuth /> */}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { uname: state.auth.userName };
};

export default connect(mapStateToProps, { signIn, setUserName })(Header);
