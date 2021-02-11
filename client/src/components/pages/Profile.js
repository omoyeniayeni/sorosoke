import React, { Component } from 'react'

import Avatar from "../modules/Avatar.js";
import Archive from "../modules/Archive.js";
import LoginPage from "./LoginPage.js";
import Navbar from "../modules/Navbar.js";

import "./Profile.css";

class Profile extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="Profile-all">
            {this.props.userId ? (
                <div>
                    <Navbar 
                        handleLogin={this.props.handleLogin}
                        handleLogout={this.props.handleLogout}
                        userId={this.props.userId}
                        current="profile"
                        userName={this.props.userName}
                    />
                    {/* <Avatar />  */}
                    <Archive 
                        userId = {this.props.userId}
                        userName = {this.props.userName}
                    />
                </div>
            ) : (
                <LoginPage 
                    handleLogin={this.props.handleLogin}
                    handleLogout={this.props.handleLogout}
                    provideTopic = {this.props.provideTopic}
                    userId={this.props.userId}
                />
            )}
            </div>
        )
    }
}

export default Profile
