import React, { Component } from 'react'
import { Link, navigate } from "@reach/router";
import { NavLeft, NavRight } from "../modules/NavIcons.js";

import "./TopicPage.css"

class TopicPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            time: 10,
        }
    }

    componentDidMount() {
        this.timeout = setTimeout(() => this.setState({ redirect: true }), 10000)
        this.interval = setInterval(() => this.timer(), 1000);

    }

    componentWillUnmount() {
        clearTimeout(this.timeout)
    }

    timer = () => {
        this.setState({
            time: this.state.time - 1
        })
        if (this.state.time <= 0) {
            clearInterval(this.interval);
            return;
        }
    }

    changePage = () => {
        navigate("/timer")
    }

    render() {
        if (this.state.redirect) {
            this.changePage();
        }
        return (
            <>
                <Link to="/categories"><NavLeft /></Link>
                <div className="TopicPage-instruction">you have {this.state.time} seconds to read your prompt...</div>
                <div className="TopicPage-topic">
                    "{this.props.randomTopic}"
                </div>
                <Link to="/timer"><NavRight /></Link>
            </>
        )
    }
}

export default TopicPage
