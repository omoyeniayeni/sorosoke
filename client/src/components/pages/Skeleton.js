import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import Navbar from "../modules/Navbar.js";

import "../../utilities.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "947362323574-h52vtsp5aenl8hhk9mo5cja89ahihjli.apps.googleusercontent.com";

class Skeleton extends Component {
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
        <div className="Skeleton-loginContainer">
          {this.props.userId ? (
            <GoogleLogout
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Logout"
              onLogoutSuccess={this.props.handleLogout}
              onFailure={(err) => console.log(err)}
              // Change the default login button
              render = {(customButton) => (
                <button className="Skeleton-logout" onClick={customButton.onClick}>Log Out</button>
              )}
            />
          ) : (
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={this.props.handleLogin}
              onFailure={(err) => console.log(err)}
              // Change the default login button
              render = {(customButton) => (
                <button className="Skeleton-login" onClick={customButton.onClick}>
                  <span className="Skeleton-loginMessage">yes</span>
                </button>
              )}
            />
          )}  
        </div>    
      </>
    );
  }
}

export default Skeleton;
