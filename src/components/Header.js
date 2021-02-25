import React from "react";
import FbAuth from "./FbAuth";
import im from "../Images/logo.png";
const Header = () => {
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
          <FbAuth />
        </div>
      </div>
    </div>
  );
};

export default Header;
