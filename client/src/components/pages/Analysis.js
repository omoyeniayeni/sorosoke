import React, { Component } from 'react'
import { Link } from "@reach/router";
import { navigate } from '@reach/router';
import { get, post } from "../../utilities";
import { Redirect } from "react-router-dom";

import Navbar from "../modules/Navbar.js";
import LoginPage from "./LoginPage.js";

import "./Analysis.css";

class Analysis extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props.transcriptId)
        const body = { 
            _id: this.props.transcriptId, 
            timeUsed: (this.props.timeUsed).toFixed(2), 
            speed: this.props.speed, 
            pauses: this.props.pauses, 
            pauseTime: (this.props.pauseTime).toFixed(2), 
            speechDelay: (this.props.speechDelay).toFixed(2),
        }
        post("/api/addanalysis", body)
        this.props.findSynonyms(this.props.transcriptContent)
    }

    // .then(this.props.resetTranscript())

    isRepeat = (repeat) => {
        return repeat.length >= 1 ? true : false
    }


    render() {
        let repeat = this.props.topThreeRepeatedWords(this.props.transcriptContent)
        return (
            <>
            {this.props.userId ? (
                <div className="Analysis-all">
                    <Navbar 
                        handleLogin={this.props.handleLogin}
                        handleLogout={this.props.handleLogout}
                        userId={this.props.userId}
                        userName={this.props.userName}
                    />
                    <div className="Analysis-heading">Analysis</div>
                    <section className="Analysis-transcriptContainer">
                        <p className="Analysis-transcript">
                            <p> You said...</p>
                            "{this.props.transcriptContent}"
                        </p>
                    </section>
                    
                    <section className="Analysis-analysis">
                        <br />
                        <div>You used <span style={{ color: "var(--thepink)" }}>{(this.props.timeUsed).toFixed(2)} seconds</span> to talk about "{this.props.transcriptTopic}"</div>
                        <div>Your speed was <span style={{ color: "var(--thepink)" }}>{this.props.speed}wps</span> </div>
                        <div>You paused <span style={{ color: "var(--thepink)" }}>{this.props.pauses} time(s)</span></div>
                        <div>The duration of your total pauses was <span style={{ color: "var(--thepink)" }}>{this.props.pauseTime.toFixed(2)} seconds</span></div>
                        <div>You were silent for <span style={{ color: "var(--thepink)" }}>{this.props.speechDelay.toFixed(2)} seconds</span> before you started talking</div>
                        <br />
                        {this.isRepeat(repeat) ? 
                            <section>
                                <div>Your top repeated words are: </div>
                                {repeat.map((word, i) => (
                                    <div style={{ color: "var(--thepink)" }}>{i+1}.&emsp;{word}</div> 
                                ))}
                                <br />
                            </section>
                            : null
                        }
                        {repeat.map((word, i) => (
                            this.props.synonyms[i] !== undefined ? 
                                <div>consider replacing 
                                    <span style={{ color: "var(--thepink)", fontWeight: "bold", fontSize: "18px" }}>&nbsp;"{word}"&nbsp;</span> 
                                    with 
                                    <span style={{ color: "var(--thegreen)", fontWeight: "bold", fontSize: "18px" }}>&nbsp;
                                    {this.props.synonyms[i].join(' / ')} </span>
                                        {console.log(i)}
                                </div>  
                            : null
                        ))}
                        <br />
                    </section>
                    <div>
                        <div className="Analysis-footer">Check out you saved transcripts on your<Link className="Analysis-profile" to={`/profile/${this.props.userId}`}>&nbsp;profile&nbsp;</Link>page.</div>
                    </div>
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

export default Analysis


