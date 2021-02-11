import React, { Component } from 'react'

import { FaMicrophoneAlt } from 'react-icons/fa';
import { IconContext } from "react-icons";

import "./Microphone.css";


class Microphone extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        let microphoneIcon = undefined;
        this.props.isListening ? (
            microphoneIcon = 
            <IconContext.Provider value={{ className: "Microphone-icon Microphone-isListening" }}>
                <div>
                    <FaMicrophoneAlt onClick={this.props.handleMicClick}/>
                </div>
            </IconContext.Provider>
        ) : (
            microphoneIcon = 
            <IconContext.Provider value={{ className: "Microphone-icon Microphone-isNotListening" }}>
                <div>
                    <FaMicrophoneAlt onClick={this.props.handleMicClick}/>
                </div>
            </IconContext.Provider>
        )
        return (
            <div className="Microphone-all">
                {microphoneIcon}
            </div>
        )
    }
}

export default Microphone
