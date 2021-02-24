import React from "react";
import history from "./History";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

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
          // history.push("/yap/data-collection");
          history.push("/yap/playground");
        } else {
          console.log("SIGNASDASDA");
          this.props.signOut();
        }
      });
    };
  }

  login = () => {
    window.FB.login((response) => {
      this.props.signIn(response.authResponse.userID);
      history.push("/yap/data-collection");
    });
  };

  logout = () => {
    window.FB.logout(() => {
      this.props.signOut();
      history.push("/yap");
    });
  };

  renderAuthButton() {
    if (this.props.isSignedIn === "connected") {
      return (
        <button onClick={this.logout} className="ui blue facebook button">
          <i className="facebook icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.login} className="ui blue facebook button">
          <i className="facebook icon" />
          Sign In
        </button>
      );
    }
  }
  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(FbAuth);
