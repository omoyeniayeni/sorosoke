import React, { Component } from 'react'
import Microphone from './Microphone';
import Transcript from "./Transcript.js";
import Topic from "../modules/Topic.js";
import Navbar from "../modules/Navbar.js";


import { Link, navigate } from "@reach/router";

import { get, post } from "../../utilities";


import "./Timer.css";

// Converted Mateusz Rybczonec's countdown timer: https://bit.ly/3nH3AhO to React.js form and added functions

class Timer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            timeLeft: undefined,
            timePassed: 0,
            timerInterval: undefined,
            timeUp: false,
            finishedBeforeTime: false,

            fullDasharray: 283,
            strokeDasharray: "283",

            pathColor: "normal",
        }
    }

    componentDidMount() {
        this.setState({
            timeLeft: this.props.setTime
        })
    }

    formatTime = (time) => {
        // The largest round integer less than or equal to the result of time divided being by 60.
        const minutes = Math.floor(time / 60); // I think this will be passed as a prop
        
        // Seconds are the remainder of the time divided by 60 (modulus operator)
        let seconds = time % 60; // I think this will be passed as a prop
        
        // If the value of seconds is less than 10, then display seconds with a leading zero
        if (seconds < 10) {
          seconds = `0${seconds}`;
        }
      
        // The output in MM:SS format
        return `${minutes}:${seconds}`;
    }

    timeUp = () => {
        clearInterval(this.state.timerInterval);
        this.props.toggleListen();
        this.resetStates();
        this.setState({
            timeUp: true
        });
    }

    resetStates = () => {
        this.setState({
            fullDasharray: 283,
            strokeDasharray: "283",

            pathColor: "normal",
        });
        clearInterval(this.state.timerInterval);
    }

    startTimer = () => {
        this.setState({
            timerInterval: setInterval(() => {
                this.updateTimePassed();
                if (this.state.timeLeft === 0) {
                    this.timeUp()
                }
                this.calculateCircleDasharray();
                this.setRemainingPathColor();
            }, 1000)
        })
    }

    updateTimePassed = () => {
        this.setState({
            timePassed: this.state.timePassed + 1,
        }, () => this.updateTimeLeft ())
    };

    updateTimeLeft = () => {
        this.setState({
            timeLeft: this.props.setTime - this.state.timePassed
        })
    }


    calculateTimeFraction = () => {
        let fraction = this.state.timeLeft / this.props.setTime;
        let remainingFraction = 1-fraction;
        let setTimeInverse = 1 / this.props.setTime;
        let result = fraction - setTimeInverse * remainingFraction;
        return result;
    }
            
    calculateCircleDasharray = () => {
        let circleDasharray = (this.calculateTimeFraction() * this.state.fullDasharray).toFixed(0);
        this.setState({
            strokeDasharray: `${circleDasharray} 283`
        })
    }

    setRemainingPathColor = () => { 
        let alertThreshold = this.props.setTime / 10;
        let warningThreshold = this.props.setTime / 2;
        if (this.state.timeLeft <= alertThreshold) {
            this.setState({
                pathColor: "alert"
            })
        }   
        else if (this.state.timeLeft <= warningThreshold) {
            this.setState({
                pathColor: "warning"
            })
        }
        else if (this.state.timeLeft <= this.props.setTime) {
            this.setState({
                pathColor: "normal"
            })
        }
    }

    handleMicClick = () => {
        this.props.toggleListen();
        if (!this.props.isListening) {
            this.startTimer();
        }
        else {
            this.handleFinishedBeforeTime();
        }
    }

    handleFinishedBeforeTime = () => {
        this.setState({
            finishedBeforeTime: true,
        })
        this.resetStates();
    }

    handleClickOnSave = () => {
        console.log("handled save")
        this.saveNewTranscript();
        this.props.sendTimeUsed(this.calculateTimeUsed());
        this.props.sendPauseTime(this.props.pauses, this.props.pauseTime, this.props.speechDelay);
    }

    saveNewTranscript = () => {
        const body = { topic: this.props.randomTopic, content: this.props.finalTranscript };
        post("/api/savedtranscript", body).then((content) => {
            this.props.analyseTranscript(content);
        });
    }

    handleClickOnDiscard = () => {
        if (confirm("You are about to discard this input")) {
            // this.props.resetTranscript();
            navigate("/");
        }
    }

    calculateTimeUsed = () => {
        let timeUsed = 0;
        if (this.state.timeUp) {
            timeUsed = this.props.setTime - this.props.pauseTime
        }
        else if (this.state.finishedBeforeTime) {
            timeUsed = this.state.timePassed - this.props.pauseTime
        }
        return timeUsed
    }

    render() {
        let micMessage = undefined
        this.props.isListening ? (
            micMessage = "speaking...\n click to stop talking."
        ) : (
            micMessage = "click to begin speaking"
        )
        return (
            <div>
                {this.props.finalTranscript && this.state.timeUp ? (
                    <div>
                        <div className="Timer-endMessage">TIME UP!</div>
                        <div className="Timer-transcript">
                            <Transcript 
                                finalTranscript={this.props.finalTranscript} 
                            />
                        </div>
                        <button style={{ color: "var(--thepink)", borderColor: "var(--thepink)" }} className="Timer-button" onClick={this.handleClickOnDiscard}>discard</button>
                        <button style={{ color: "var(--thegreen)", borderColor: "var(--thegreen)" }} className="Timer-button" onClick={this.handleClickOnSave}>save</button>
                    </div>
                ) : 
                
                this.props.finalTranscript && this.state.finishedBeforeTime ? (
                    <div>
                        <div className="Timer-endMessage">You finished before time...</div>
                        <div className="Timer-transcript">
                            <Transcript 
                                finalTranscript={this.props.finalTranscript} 
                            />
                        </div>
                        <button style={{ color: "var(--thepink)", borderColor: "var(--thepink)" }} className="Timer-button" onClick={this.handleClickOnDiscard}>discard</button>
                        <button style={{ color: "var(--thegreen)", borderColor: "var(--thegreen)" }} className="Timer-button" onClick={this.handleClickOnSave}>save</button>
                    </div>
                ) :

                !this.props.finalTranscript && this.state.timeUp ? (
                        <div className="Timer-warningMessage">
                            You said nothing!
                        </div>
                ) : 
                !this.props.finalTranscript && this.state.finishedBeforeTime ? (
                    <div className="Timer-warningMessage">
                        You said nothing!
                    </div>
                ) :
                <div>
                <div className="Timer-all">
                    <div className="Timer-item Timer-topic">
                        <Topic randomTopic={this.props.randomTopic} />
                    </div>
                    <div className="Timer-item">
                        <Microphone 
                            isListening={this.props.isListening} 
                            handleMicClick={this.handleMicClick}  
                        />
                        <div className="Timer-micMessage">{micMessage}</div>
                    </div>
                    <div className="Timer-item Timer-image">
                        <div className="Timer-svg">
                            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                <g className="Timer-innerCircle">
                                <circle className="Timer-outerCircle" cx="50" cy="50" r="45" />
                                <path
                                    strokeDasharray = {this.state.strokeDasharray}
                                    className={`Timer-path Timer-${this.state.pathColor}`}
                                    d="
                                    M 50, 50
                                    m -45, 0
                                    a 45,45 0 1,0 90,0
                                    a 45,45 0 1,0 -90,0
                                    "
                                />
                                </g>
                            </svg>
                        </div>
                        <span className="Timer-timeLeft">
                            {this.formatTime(this.state.timeLeft)}
                        </span>
                    </div>   
                </div>
                <div className="Timer-littleMessage">make sure to speak audibly &#128521;</div>             
                </div>
                }
            </div>
        )
    }
}

export default Timer
