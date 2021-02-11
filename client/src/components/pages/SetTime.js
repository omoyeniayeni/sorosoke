import React, { Component } from 'react'
import { Link, navigate } from "@reach/router";


import { NavLeft, NavRight, NavUp, NavDown } from "../modules/NavIcons.js";
import Topic from "../modules/Topic.js";
import LoginPage from "./LoginPage.js";

import "./SetTime.css";

const regex = /^[+-]?\d*(?:[.,]\d*)?$/;

class SetTime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            minutesValue: "",
            secondsValue: "",
            time: 0,

            minutesPlaceholder: "mm",
            secondsPlaceholder: "ss",
        }
    }

    componentDidMount() {

    }

    handleMinutesChange = (event) => {
        if (regex.test(event.target.value) && event.target.value <= 5) {
            this.setState({
                minutesValue: event.target.value
            })   
        }
    };

    handleSecondsChange = (event) => {
        if (regex.test(event.target.value) && event.target.value <= 59) {
            this.setState({
                secondsValue: event.target.value
            })
        }
    };

    increaseMinutes = () => {
        if (this.state.minutesValue === "") {
            this.setState({
                minutesValue: 1
            })
        }
        else if (this.state.minutesValue >= 0 && this.state.minutesValue <= 4 && this.state.minutesValue !== "") {
            this.setState({
                minutesValue: parseInt(this.state.minutesValue) + 1
            })
        }
    }

    decreaseMinutes =() => {
        if (this.state.minutesValue <= 5 && this.state.minutesValue >0 && this.state.minutesValue !== "")
        this.setState({
            minutesValue: parseInt(this.state.minutesValue) - 1
        })
    }

    increaseSeconds = () => {
        if (this.state.secondsValue === "") {
            this.setState({
                secondsValue: 10
            })
        }
        else if (this.state.secondsValue >= 0 && this.state.secondsValue <= 49 && this.state.secondsValue !== "") {
            this.setState({
                secondsValue: parseInt(this.state.secondsValue) + 10
            })
        }
        else if (this.state.secondsValue > 49) {
            this.setState({
                secondsValue: 59
            })
        }
    }

    decreaseSeconds =() => {
        if(this.state.secondsValue <= 59 && this.state.secondsValue > 9 && this.state.secondsValue !== "")
        this.setState({
            secondsValue: parseInt(this.state.secondsValue) - 10
        })

        else if (this.state.secondsValue < 10)
        this.setState({
            secondsValue: 0
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.onSubmit && this.onSubmit(this.state.minutesValue) && this.onSubmit(this.state.secondsValue);
        this.props.handleTime(this.state.minutesValue, this.state.secondsValue);
        navigate("/speak")
    };

    render() {
        return (
            <div>
                {this.props.userId && this.props.randomTopic ? (
                    <div className="SetTime-all">
                        <div className="SetTime-instruction">choose a time between 0s and 5m:59s to talk about the prompt you were assigned...</div>
                        <Link to="/topic"><NavLeft /></Link>
                        <div className="SetTime-container">
                            <div className="SetTime-minutesContainer">
                                <div onClick={this.increaseMinutes} ><NavUp /></div>
                                <input
                                    type="text"
                                    placeholder= {this.state.minutesPlaceholder}
                                    value={this.state.minutesValue}
                                    onChange={this.handleMinutesChange}
                                    maxLength="2"
                                    className="SetTime-input"
                                    required
                                />
                                <div onClick={this.decreaseMinutes} ><NavDown /></div>
                            </div>
                            <div className="SetTime-colon">:</div>
                            <div className="SetTime-secondsContainer">
                                <div onClick={this.increaseSeconds} ><NavUp /></div>
                                <input
                                    type="text"
                                    placeholder= {this.state.secondsPlaceholder} 
                                    value={this.state.secondsValue}
                                    onChange={this.handleSecondsChange}
                                    maxLength="2"
                                    className="SetTime-input"
                                    required
                                />  
                                <div onClick={this.decreaseSeconds} ><NavDown /></div>
                            </div>
                        </div>
                        <NavRight handleSubmit={this.handleSubmit} />
                    </div>
                ) : 
                
                this.props.userId && !this.props.randomTopic ? (
                    <div>
                        <div className="SetTime-warning">YOU NEED TO CHOOSE A CATEGORY.</div>
                        <Link to="/categories"><NavLeft /></Link>
                    </div>
                ) :
                    <div>
                        <LoginPage 
                            handleLogin={this.props.handleLogin}
                            handleLogout={this.props.handleLogout}
                            provideTopic = {this.props.provideTopic}
                            userId={this.props.userId}
                        />
                    </div>
                }
            </div>
        )
    }
}

export default SetTime
