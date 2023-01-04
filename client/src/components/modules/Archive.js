import React, { Component } from 'react'
import MediaQuery from 'react-responsive'
import { get, post } from "../../utilities.js";
import cricket from "../../public/cricket.png"

import SavedTranscripts from "./SavedTranscripts.js";
import GeneralAnalysis from "./GeneralAnalysis.js";

import "./Archive.css"

class Archive extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onGN: true,
            savedTranscripts: undefined,
            labelMax: 10,
            recommendedSpeed: 2.5,
            rows: undefined,
            rawRows: undefined,
            practicedToday: false,
            speedData: {
                labels: [],
                datasets: []
            },
            pauseRateData: {
                labels: [],
                datasets: []
            },
            pauseTimeData: {
                labels: [],
                datasets: []
            },
        }
    }

    componentDidMount() {
        get("/api/savedtranscripts").then((analysis) => {
            this.setState({
                savedTranscripts: analysis
            })
            // Create an array to store the dates
            let dates = [];
            let speeds = [];
            let pauseRates = [];
            let pauseTimes = [];
            // Make rows the maximum number of rows that will be displayes
            let rows = this.state.labelMax;
            // If the user does not have as many rows as the maximum, make rows
            // the number of rows that they have
            if (analysis.length < rows) {
                rows = analysis.length
            }
            this.setState({
                rows: rows
            })
            this.setState({
                rawRows: analysis.length
            })
            // Copy the dates into the array
            for (let index = 0; index < rows; index++) {
                dates[index] = analysis[index]["date"].substring(5, 10);
                speeds[index] = analysis[index]["speed"];
                pauseRates[index] = analysis[index]["pauseRates"];
                pauseTimes[index] = analysis[index]["pauseTime"]
            }
            // Calculate the average speed of the user using the function created below
            let averageSpeed = this.getAverage(speeds);
            let averagePauseRate = this.getAverage(pauseRates);
            let averagePauseTime = this.getAverage(pauseTimes);
            // Create an array (averageSpeedArray) that contains the average speed N number of times
            // where N is the number of inputs the user has
            let averageSpeedArray = this.repeat(averageSpeed, speeds.length);
            let recommendedSpeedArray = this.repeat(this.state.recommendedSpeed, speeds.length);
            let averagePauseRateArray = this.repeat(averagePauseRate, pauseRates.length);
            let averagePauseTimeArray = this.repeat(averagePauseTime, pauseTimes.length);

            let timeNow = new Date();
            let lastPrompt = new Date (analysis[0]["date"]);
            let timeDifference = timeNow - lastPrompt
            let lastDay = timeDifference / 86400000

            if (lastDay < 1) {
                this.setState({
                    practicedToday: true,
                })
            }

            this.setState(prevState => ({
                ...prevState,
                speedData: {
                    ...prevState.speedData,
                    // The dates array created above is made the label
                    labels: dates,
                    datasets: [{
                        label: "Recent",
                        fill: false,
                        borderColor:'#9DBF9E',
                        pointRadius: 5,
                        pointHoverRadius: 10,
                        pointHoverBackgroundColor: 'black',
                        pointBackgroundColor: 'gray',
                        borderCapStyle: "square",
                        // The speeds array created above is made the data
                        data: speeds,
                    },
                    {
                        label: "Average",
                        // The averageSpeedArray array created above is made the data
                        data: averageSpeedArray,
                        fill: false,
                        borderColor:'#EE7674',
                        borderCapStyle: "square"
                    },
                    {
                        label: "Recommended",
                        // The recommendedSpeedArray array created above is made the data
                        data: recommendedSpeedArray,
                        fill: false,
                        borderColor:'gray',
                        borderCapStyle: "square",
                        borderDash: [10, 10],
                    }],
                }
            }))

            this.setState(prevState => ({
                ...prevState,
                pauseRateData: {
                    ...prevState.pauseRateData,
                    // The dates array created above is made the label
                    labels: dates,
                    datasets: [{
                        label: "Recent",
                        fill: false,
                        borderColor:'#9DBF9E',
                        pointRadius: 5,
                        pointHoverRadius: 10,
                        pointHoverBackgroundColor: 'black',
                        pointBackgroundColor: 'gray',
                        borderCapStyle: "square",
                        // The pauseRates array created above is made the data
                        data: pauseRates,
                    },
                    {
                        label: "Average",
                        // The averagePauseRateArray array created above is made the data
                        data: averagePauseRateArray,
                        fill: false,
                        borderColor:'#EE7674',
                        borderCapStyle: "square"
                    }],
                }
            }))

            this.setState(prevState => ({
                ...prevState,
                pauseTimeData: {
                    ...prevState.pauseTimeData,
                    // The dates array created above is made the label
                    labels: dates,
                    datasets: [{
                        label: "Recent",
                        fill: false,
                        borderColor:'#9DBF9E',
                        pointRadius: 5,
                        pointHoverRadius: 10,
                        pointHoverBackgroundColor: 'black',
                        pointBackgroundColor: 'gray',
                        borderCapStyle: "square",
                        // The pauseTimes array created above is made the data
                        data: pauseTimes,
                    },
                    {
                        label: "Average",
                        // The averagePauseTimeArray array created above is made the data
                        data: averagePauseTimeArray,
                        fill: false,
                        borderColor:'#EE7674',
                        borderCapStyle: "square"
                    }],
                }
            }))
        })
    }

    getAverage = (array) => {
        let number = array.length;
        let sum = 0;
        for (let index = 0; index < array.length; index++) {
            sum += array[index];
        }
        let average = sum/number;
        return average
    }

    repeat = (item, times) => {
        return new Array(times).fill(item);
    }

    toggleOnGN = () => {
        this.setState({
            onGN: !this.state.onGN
        })
    }

    updateCharts = (todelete) => {
        if (this.state.rawRows > 1) {
            this.setState({
                savedTranscripts: this.state.savedTranscripts.filter(savedTranscript => savedTranscript._id != todelete)
            }, () =>
            {
                let dates = [];
                let speeds = [];
                let pauseRates = [];
                let pauseTimes = [];
    
                let rows = this.state.labelMax;        
                
                if (this.state.savedTranscripts.length < rows) {
                    rows = this.state.savedTranscripts.length
                }
                this.setState({
                    rows: rows
                })
                this.setState({
                    rawRows: this.state.savedTranscripts.length
                })
                // Copy the dates into the array
                for (let index = 0; index < rows; index++) {
                    dates[index] = this.state.savedTranscripts[index]["date"].substring(5, 10);
                    speeds[index] = this.state.savedTranscripts[index]["speed"];
                    pauseRates[index] = this.state.savedTranscripts[index]["pauseRates"];
                    pauseTimes[index] = this.state.savedTranscripts[index]["pauseTime"]
                }
                // Calculate the average speed of the user using the function created below
                let averageSpeed = this.getAverage(speeds);
                let averagePauseRate = this.getAverage(pauseRates);
                let averagePauseTime = this.getAverage(pauseTimes);
                // Create an array (averageSpeedArray) that contains the average speed N number of times
                // where N is the number of inputs the user has
                let averageSpeedArray = this.repeat(averageSpeed, speeds.length);
                let recommendedSpeedArray = this.repeat(this.state.recommendedSpeed, speeds.length);
                let averagePauseRateArray = this.repeat(averagePauseRate, pauseRates.length);
                let averagePauseTimeArray = this.repeat(averagePauseTime, pauseTimes.length);
    
                let timeNow = new Date();
                let lastPrompt = new Date (this.state.savedTranscripts[0]["date"]);
                let timeDifference = timeNow - lastPrompt
                let lastDay = timeDifference / 86400000
    
                if (lastDay < 1) {
                    this.setState({
                        practicedToday: true,
                    })
                }
    
                this.setState(prevState => ({
                    ...prevState,
                    speedData: {
                        ...prevState.speedData,
                        // The dates array created above is made the label
                        labels: dates,
                        datasets: [{
                            label: "Recent",
                            fill: false,
                            borderColor:'#9DBF9E',
                            pointRadius: 5,
                            pointHoverRadius: 10,
                            pointHoverBackgroundColor: 'black',
                            pointBackgroundColor: 'gray',
                            borderCapStyle: "square",
                            // The speeds array created above is made the data
                            data: speeds,
                        },
                        {
                            label: "Average",
                            // The averageSpeedArray array created above is made the data
                            data: averageSpeedArray,
                            fill: false,
                            borderColor:'#EE7674',
                            borderCapStyle: "square"
                        },
                        {
                            label: "Recommended",
                            // The recommendedSpeedArray array created above is made the data
                            data: recommendedSpeedArray,
                            fill: false,
                            borderColor:'gray',
                            borderCapStyle: "square",
                            borderDash: [10, 10],
                        }],
                    }
                }))
    
                this.setState(prevState => ({
                    ...prevState,
                    pauseRateData: {
                        ...prevState.pauseRateData,
                        // The dates array created above is made the label
                        labels: dates,
                        datasets: [{
                            label: "Recent",
                            fill: false,
                            borderColor:'#9DBF9E',
                            pointRadius: 5,
                            pointHoverRadius: 10,
                            pointHoverBackgroundColor: 'black',
                            pointBackgroundColor: 'gray',
                            borderCapStyle: "square",
                            // The pauseRates array created above is made the data
                            data: pauseRates,
                        },
                        {
                            label: "Average",
                            // The averagePauseRateArray array created above is made the data
                            data: averagePauseRateArray,
                            fill: false,
                            borderColor:'#EE7674',
                            borderCapStyle: "square"
                        }],
                    }
                }))
    
                this.setState(prevState => ({
                    ...prevState,
                    pauseTimeData: {
                        ...prevState.pauseTimeData,
                        // The dates array created above is made the label
                        labels: dates,
                        datasets: [{
                            label: "Recent",
                            fill: false,
                            borderColor:'#9DBF9E',
                            pointRadius: 5,
                            pointHoverRadius: 10,
                            pointHoverBackgroundColor: 'black',
                            pointBackgroundColor: 'gray',
                            borderCapStyle: "square",
                            // The pauseTimes array created above is made the data
                            data: pauseTimes,
                        },
                        {
                            label: "Average",
                            // The averagePauseTimeArray array created above is made the data
                            data: averagePauseTimeArray,
                            fill: false,
                            borderColor:'#EE7674',
                            borderCapStyle: "square"
                        }],
                    }
                }))
            })
        }
    }

    render() {
        if (this.state.rawRows && this.state.rawRows !== 0) {
            return (
                <>
                    <MediaQuery maxWidth={1100}>
                        {this.state.onGN ? (
                        <div>
                            <button onClick={this.toggleOnGN} className="Archive-button">General Analyses</button>
                            <hr className="Archive-line" />
                            <div className="Archive-savedTranscripts" >
                                <SavedTranscripts updateCharts={this.updateCharts} userId={this.props.userId} />
                            </div>
                        </div>
                        ) : (
                            <div>
                                <button onClick={this.toggleOnGN} className="Archive-button">Saved Transcripts</button>
                                <hr className="Archive-line" />
                                <div className="Archive-generalAnalysis">
                                    <h3 className="GeneralAnalysis-heading">GENERAL ANALYSES</h3>
                                    <GeneralAnalysis {...this.state} />
                                </div>
                            </div>
                        )}
                    </MediaQuery>
                    <MediaQuery minWidth={1100}>
                        <div className="Archive-container">
                            <div className="Archive-generalAnalysis">
                                <h3 className="GeneralAnalysis-heading">GENERAL ANALYSES</h3>
                                <GeneralAnalysis {...this.state} />
                            </div>
                            <div className="Archive-savedTranscripts" ><SavedTranscripts updateCharts={this.updateCharts} userId={this.props.userId} /></div>
                        </div>
                    </MediaQuery>
                </>
            )
        }
        else {
            return (
                <>
                    <div className="Archive-containerTwo">
                        <img className="Archive-imageTwo" src={cricket} />
                        <p className="Archive-paragraphTwo">
                            <p  className="Archive-paragraphTwoTop">¡ NOTHING !</p>
                            <p className="Archive-paragraphTwoBottom">your archive is empty because you have not practiced any prompt &#9785;</p>
                        </p>
                    </div>
                </>
            )
        }
    }
}

export default Archive
