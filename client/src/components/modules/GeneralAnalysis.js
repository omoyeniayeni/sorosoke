import React, { Component } from 'react'
import SpeedChart from './SpeedChart.js';
import PauseChart from './PauseChart.js';
import PauseTimeChart from './PauseTimeChart.js';

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

import { get, post } from "../../utilities.js";

import "./GeneralAnalysis.css";
import "../../utilities.css";

class GeneralAnalysis extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        let mark = undefined;
        this.props.practicedToday ? mark = <span>&#10003;</span> : mark = <span>&#10007;</span>
        return (
            <>
                <Tabs fill defaultActiveKey="speedChart" className="GeneralAnalysis-tabs" id="uncontrolled-tab-example">
                    <Tab className="GeneralAnalysis-tab" eventKey="speedChart" title="Speed">
                        <div className="GeneralAnalysis-container">
                            <SpeedChart 
                                speedData={this.props.speedData} 
                                rows = {this.props.rows}
                            />
                        </div>
                    </Tab>
                    <Tab eventKey="pauseChart" title="Pauses">
                        <div className="GeneralAnalysis-container">
                            <PauseChart 
                                pauseData={this.props.pauseData} 
                                rows = {this.props.rows}
                            />  
                        </div>
                    </Tab>
                    <Tab eventKey="pauseTimeChart" title="Pause Duration">
                        <div className="GeneralAnalysis-container">
                            <PauseTimeChart 
                                pauseTimeData={this.props.pauseTimeData} 
                                rows = {this.props.rows}
                            />
                        </div>
                    </Tab>
                </Tabs>
                <div className="GeneralAnalysis-chart">
                    Prompts practiced: {this.props.rawRows}
                    <div className="GeneralAnalysis-chartNote">this excludes discarded and discarded prompts.</div>
                </div>
                <div className="GeneralAnalysis-chart">
                    <div>Daily practice? {mark}</div>
                    <div className="GeneralAnalysis-chartNote">you get a checkmark if you have practiced in the last 24 hours.</div>
                </div>
            </>
        )
    }
}

export default GeneralAnalysis
