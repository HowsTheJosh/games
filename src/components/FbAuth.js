import React from "react";
import history from "./History";
import { connect } from "react-redux";
import { signIn, signOut, setUserName } from "../actions";

class FbAuth extends React.Component {
  constructor(props) {
    super(props);
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: "2260742510736157",
        version: "v2.7",
      });
      window.FB.getLoginStatus((response) => {
        if (response.status == "connected") {
          this.props.signIn(response.authResponse.userID);
          this.setusernamefunc(response.authResponse.userID);
          history.push("/games/playground");
        } else {
          this.props.signOut();
          history.push("/games")
        }
      });
    };
  }
  setusernamefunc = (uid) => {
    window.FB.api("/" + uid, "GET", { fields: "name" }, (response) => {
      this.props.setUserName(response.name);
    });
  };

  login = () => {
    window.FB.login((res) => {
      try {
        this.props.signIn(res.authResponse.userID);
        this.setusernamefunc(res.authResponse.userID);
        history.push("/games/playground");
      } catch (err) {
        alert("Login to continue...!!!");
      }
    });
  };

  logout = () => {
    window.FB.logout(() => {
      this.props.signOut();
      history.push("/games");
    });
  };

  renderAuthButton() {
    if (this.props.isSignedIn === "connected") {
      return (
        <div className="ui secondary menu">
          <button
            onClick={this.logout}
            className="ui blue facebook button massive right menu"
          >
            Sign Out
          </button>
        </div>
      );
    } else {
      return (
        <div className="ui secondary menu">
          <div
            onClick={this.login}
            className="ui animated button blue massive right menu"
            tabIndex="0"
          >
            <div className="visible content">
              <i className="facebook icon "></i> Facebook
            </div>
            <div className="hidden content">Sign In</div>
          </div>
        </div>
      );
    }
  }
  render() {
    return <>{this.renderAuthButton()}</>;
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    userIdd: state.auth.userId,
    uname: state.auth.userName,
  };
};

export default connect(mapStateToProps, { signIn, signOut, setUserName })(
  FbAuth
);
