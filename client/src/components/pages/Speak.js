import React, { Component } from 'react'
import { Link } from "@reach/router";

import Microphone from "../modules/Microphone.js";
import Timer from "../modules/Timer.js";
import Topic from "../modules/Topic.js";
import { NavLeft, NavRight } from "../modules/NavIcons.js";
import LoginPage from "./LoginPage.js";
import NotCompatible from "./NotCompatible.js";


import "./Speak.css";
let recognition;
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition || window.oSpeechRecognition;
    let SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
    let SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;
    
    recognition = new SpeechRecognition();
    
    recognition.continous = true
    recognition.interimResults = true
    recognition.lang = 'en-US'   
}
else {
    recognition = {continous:true, interimResults:true, lang:"en-US"}
}
  
class Speak extends Component {
    constructor() {
        super()
        this.state = {
            isListening: false,
            finalTranscript: undefined,
            ongoingTranscript: "",
            pauses: 0,
            pauseRate: 0,
            pauseTime: 0,
            speechDelay: 0,
            startTime: undefined,
            soundStartTime: undefined,
            soundEndTime: undefined,
            soundStartArray: []
        }
    }

    handleListen = () => { 
        let finalTranscript = '';
        // If mic is listening, start recognition. 
        this.state.isListening ? (
            this.setState({
                startTime: new Date().getTime()   // COME BACK TO THIS.
            }),
            recognition.start(),
            recognition.onend = () => {                
                // Increase the number of pauses and Restart recognition
                recognition.start()
                this.updatePauses()
                // When recognition starts, update the pause time
                recognition.onstart = () => {
                    
                }
            },
            recognition.onsoundstart = () => {
                console.log("sound has started")
                let temporaryArray = this.state.soundStartArray;
                temporaryArray.push(new Date().getTime())
                this.setState({
                    soundStartTime: new Date().getTime(),
                    soundStartArray: temporaryArray,
                })
                if (this.state.soundEndTime && this.state.soundStartTime > this.state.soundEndTime) {
                    let timeDifference = (this.state.soundStartTime - this.state.soundEndTime)/1000;
                    this.setState({
                        pauseTime: this.state.pauseTime + timeDifference
                    })
                }
            },
            recognition.onsoundend = () => {
                this.setState({
                    soundEndTime: new Date().getTime(),
                })
            },
            recognition.onresult = (event) => {
                let ongoingTranscript = ''
    
                // Following the official documentation, iterate through the first 
                // index of the speech recognition result list.
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    event.results[i].isFinal ? finalTranscript += event.results[i][0].transcript + ' ' : ongoingTranscript += event.results[i][0].transcript;
                }
                
                this.setState({
                    finalTranscript: finalTranscript
                })
            },
            recognition.onerror = (event) => {
                console.log(`Error ${event.error} in speech recognition`)
            }

        ) : (
            // If mic is not listening (button clicked), stop the recognition.
            recognition.stop(),
            recognition.onend = () => {
                let speechDelay = (this.state.soundStartArray[0] - this.state.startTime)/1000;
                this.setState({
                    speechDelay: speechDelay,
                    pauseTime: this.state.pauseTime + speechDelay
                })
            }
        )
    }
    // Toggle Listening
    toggleListen = () => {
        this.setState({
            isListening: !this.state.isListening
        }, () => this.handleListen())
    }
 
    // Update the number of time user pauses
    updatePauses = () => {
        this.setState({
            pauses: this.state.pauses + 1
        })
    }

    render() {
        if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        return (
            <>
            {this.props.userId && this.props.randomTopic && this.props.setTime ? (
                <div>
                    <Link to="/timer"><NavLeft /></Link>
                    <div className="Speak-timer">
                        <Timer 
                            isListening={this.state.isListening} 
                            toggleListen={this.toggleListen} 
                            setTime={this.props.setTime} 
                            finalTranscript={this.state.finalTranscript}
                            // To post in savedtranscript API
                            randomTopic={this.props.randomTopic}
                            // Send transcript to app, so that Analysis can access it
                            analyseTranscript={this.props.analyseTranscript}
                            sendTimeUsed = {this.props.sendTimeUsed}
                            // Send pause time so that it can be used to calculate speed
                            pauses = {this.state.pauses}
                            pauseRate = {this.state.pauseRate}
                            pauseTime = {this.state.pauseTime}
                            speechDelay = {this.state.speechDelay}
                            sendPauseTime = {this.props.sendPauseTime}
                            randomTopic={this.props.randomTopic}
                            getSpeed={this.props.getSpeed}
                            getPauseRate={this.props.getPauseRate}
                            resetTranscript = {this.props.resetTranscript}
                        />
                    </div>
                </div>
            ) : 
            this.props.userId && this.props.setTime && !this.props.randomTopic ? (
                <div>
                    <div className="Speak-warning">YOU NEED TO CHOOSE A CATEGORY</div>
                    <Link to="/categories"><NavLeft /></Link>
                </div>
            ) : 
            this.props.userId && this.props.randomTopic && !this.props.setTime ? (
                <div>
                    <div className="Speak-warning">YOU NEED TO SET A TIME!</div>
                    <Link to="/timer"><NavLeft /></Link>
                </div>
            ) :
            this.props.userId && !this.props.randomTopic && !this.props.setTime ? (
                <div>
                    <div className="Speak-warning">YOU NEED TO CHOOSE A CATEGORY AND SET A TIME!</div>
                    <Link to="/categories"><NavLeft /></Link>
                </div>
            ) :
                <LoginPage 
                    handleLogin={this.props.handleLogin}
                    handleLogout={this.props.handleLogout}
                    provideTopic = {this.props.provideTopic}
                    userId={this.props.userId}
                />
            }
            </>
        )
        }
        else {
            return (
                <NotCompatible/>
            )
        }
    }
}
 
export default Speak