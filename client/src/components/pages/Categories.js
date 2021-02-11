import React, { Component } from 'react'

import Navbar from '../modules/Navbar.js';
import CategoriesList from "../modules/CategoriesList.js";
import LoginPage from "./LoginPage.js";


import { get, post } from "../../utilities";

import "./Categories.css";

class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        }
    }

    componentDidMount() {
        get("/api/categories").then((category) => this.setState({ categories: category }))
    }

    render() {
        return (
            <>
            {this.props.userId ? (
                <div className="Categories-all">
                    <Navbar 
                        handleLogin={this.props.handleLogin}
                        handleLogout={this.props.handleLogout}
                        userId={this.props.userId}
                        userName={this.props.userName}
                        current="categories"
                    />
                    <CategoriesList provideTopic={this.props.provideTopic} categories={this.state.categories} />
                </div>
            ) : (
                <LoginPage 
                    handleLogin={this.props.handleLogin}
                    handleLogout={this.props.handleLogout}
                    provideTopic = {this.props.provideTopic}
                    userId={this.props.userId}
                />
            )}
            </>
        )
    }
}

export default Categories
