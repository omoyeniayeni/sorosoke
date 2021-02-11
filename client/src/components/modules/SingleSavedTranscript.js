import React, { Component } from 'react'
import { get, post } from "../../utilities";

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import TabContainer from 'react-bootstrap/TabContainer'
import TabContent from 'react-bootstrap/TabContent'
import TabPane from 'react-bootstrap/TabPane'

import SingleSavedAnalysis from "./SingleSavedAnalysis.js";
import SingleSavedDelete from "./SingleSavedDelete.js";
import SingleSavedShare from "./SingleSavedShare.js";

import "./SingleSavedTranscript.css"
import "../../utilities.css";

class SingleSavedTranscript extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                {this.props.savedTranscript.map((transcriptObj) => (
                    <Tabs fill justify className="SingleSavedTranscript-tabs" defaultActiveKey="transcript" id="uncontrolled-tab-example">
                        <Tab eventKey="transcript" title="Transcript">
                            <div key={`A_${transcriptObj._id}`} className="SingleSavedTranscript-container">
                                <p key={`Date_${transcriptObj._id}`} className="SingleSavedTranscript-date"> {transcriptObj.date.substring(0, 10)} </p>
                                <p key={`Title_${transcriptObj._id}`} className="SingleSavedTranscript-title"> {transcriptObj.topic} </p>
                                <p key={`Break_${transcriptObj._id}`} className="SingleSavedTranscript-title"> <br/> </p>
                                <p key={`Words_${transcriptObj._id}`} className="SingleSavedTranscript-words"> {transcriptObj.transcript} </p>
                            </div>
                        </Tab>
                        <Tab eventKey="analysis" title="Analysis">
                            <div key={`B_${transcriptObj._id}`} className="SingleSavedTranscript-container">
                                <p key={`C_${transcriptObj._id}`} className="SingleSavedTranscript-analysis">Analysis</p>
                                <p key={`Time_Used_${transcriptObj._id}`} className="SingleSavedTranscript-words">You used {transcriptObj.timeUsed} seconds </p>
                                <p key={`Speed_${transcriptObj._id}`} className="SingleSavedTranscript-words">Your spoke at a speed of {transcriptObj.speed} wps</p>
                                <p key={`Pauses_${transcriptObj._id}`} className="SingleSavedTranscript-words">You paused {transcriptObj.pauses} times</p>
                                <p key={`Pause_Time_${transcriptObj._id}`} className="SingleSavedTranscript-words">The duration of your pauses was {transcriptObj.pauseTime} seconds</p>
                                <p key={`Speech_Delay_${transcriptObj._id}`} className="SingleSavedTranscript-words">You stayed silent for {transcriptObj.speechDelay} seconds before talking</p>
                            </div>
                        </Tab>
                        <Tab eventKey="share" title="Share">
                            <SingleSavedShare transcript={transcriptObj.transcript} />
                        </Tab>
                        <Tab eventKey="delete" title="Delete">
                            <SingleSavedDelete userId={this.props.userId} updatePage={this.props.updatePage} transcriptId={transcriptObj._id} />
                        </Tab>
                    </Tabs>
                ))} 
            </>
        )
    }
}

export default SingleSavedTranscript
