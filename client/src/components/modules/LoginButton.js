import React, { Component } from "react";
import { GoogleLogin } from '@react-oauth/google'; 

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
  
  render() {
    return (
      <>
        {this.props.userId ? (
          <button type="button" className="LoginButton-logoutButton" onClick= {this.props.handleLogout}>
            Sign Out
          </button>
        ) : (
          <GoogleLogin
            onSuccess = {this.props.handleLogin}
            onError={(err) => {
              console.log(err);
            }}
          />
        )}
      </>
    );
  }
}

export default LoginButton;
