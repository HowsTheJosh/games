import React from "react";
import FbAuth from "./FbAuth";

const Header = () => {
  return (
    <div id="headerdiv" className="ui segment">
      <div className="ui secondary menu">
        <h1>Games-IC </h1>
        <div className="right menu">
          <FbAuth />
        </div>
      </div>
    </div>
  );
};

export default Header;
