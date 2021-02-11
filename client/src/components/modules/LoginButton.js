import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import Navbar from "../modules/Navbar.js";

import "../../utilities.css";
import "./LoginButton.css"

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "947362323574-h52vtsp5aenl8hhk9mo5cja89ahihjli.apps.googleusercontent.com";

class LoginButton extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  render() {
    return (
      <>
        {this.props.userId ? (
          <GoogleLogout
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Sign out"
            onLogoutSuccess={this.props.handleLogout}
            onFailure={(err) => console.log(`logout error: ${err}`)}
          />
        ) : (
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Sign in with Google"
            onSuccess={this.props.handleLogin}
            onFailure={(err) => console.log(err)}
          />
        )}  
      </>
    );
  }
}

export default LoginButton;
