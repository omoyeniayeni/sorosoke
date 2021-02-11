import React, { Component } from 'react'
import { Link } from "@reach/router";
import { NavLink } from 'react-router-dom';


import LoginButton from './LoginButton';
import "./Navbar.css"

class Navbar extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        let profileBar;
        this.props.userName? profileBar = this.props.userName : profileBar = "archive"
        return (
            <div className="Navbar-container">
                {this.props.current === "categories" ? (
                    <div className="Navbar-links Navbar-item">
                        {/* Logo */}
                        <Link className="Navbar-link Navbar-current" to="/categories">practice</Link> | 
                        <Link className="Navbar-link" to={`/profile/${this.props.userId}`}>{profileBar}</Link> |
                        <Link className="Navbar-link" to="/about">about</Link> |
                        {/*<Archive /> */}
                    </div>
                ) :
                this.props.current === "profile" ? (
                    <div className="Navbar-links Navbar-item">
                        {/* Logo */}
                        <Link className="Navbar-link" to="/categories">practice</Link> | 
                        <Link className="Navbar-link Navbar-current" to={`/profile/${this.props.userId}`}>{profileBar}</Link> |
                        <Link className="Navbar-link" to="/about">about</Link> |
                        {/*<Archive /> */}
                    </div>
                ) : 
                this.props.current === "about" ? (
                    <div className="Navbar-links Navbar-item">
                        {/* Logo */}
                        <Link className="Navbar-link" to="/categories">practice</Link> | 
                        <Link className="Navbar-link" to={`/profile/${this.props.userId}`}>{profileBar}</Link> |
                        <Link className="Navbar-link Navbar-current" to="/about">about</Link> |
                        {/*<Archive /> */}
                    </div>
                ) :
                    <div className="Navbar-links Navbar-item">
                        {/* Logo */}
                        <Link className="Navbar-link" to="/categories">practice</Link> | 
                        <Link className="Navbar-link" to={`/profile/${this.props.userId}`}>{profileBar}</Link> |
                        <Link className="Navbar-link" to="/about">about</Link> |
                        {/*<Archive /> */}
                    </div>
                }
                <div className="Navbar-logout Navbar-item">
                    <LoginButton 
                            handleLogin={this.props.handleLogin}
                            handleLogout={this.props.handleLogout}
                            userId={this.props.userId}
                    />
                </div>
            </div>
        )
    }
}

export default Navbar
