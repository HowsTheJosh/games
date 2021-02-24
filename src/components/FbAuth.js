import React from "react";
import history from "./History";
import { connect } from "react-redux";
import { signIn, signOut, setUserName } from "../actions";
import { renderIntoDocument } from "react-dom/test-utils";
var userName = "",
  id = 0;
class FbAuth extends React.Component {
  componentDidMount() {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: "2260742510736157",
        version: "v2.7",
      });
      window.FB.getLoginStatus((response) => {
        if (response.status == "connected") {
          this.props.signIn(response.authResponse.userID);
          this.setusernamefunc(response.authResponse.userID);
          history.push("/games-ic/data-collection");
        } else {
          this.props.signOut();
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
      this.props.signIn(res.authResponse.userID);
      this.setusernamefunc(res.authResponse.userID);
      history.push("/games-ic/data-collection");
    });
  };

  logout = () => {
    window.FB.logout(() => {
      this.props.signOut();
      history.push("/games-ic");
    });
  };

  renderAuthButton() {
    if (this.props.isSignedIn === "connected") {
      return (
        <div className="ui secondary menu">
          <h2>{this.props.uname}</h2>

          <button
            onClick={this.logout}
            className="ui blue facebook button right menu"
          >
            <i className="facebook icon" />
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
            <div className="hidden content  ">Sign In</div>
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
