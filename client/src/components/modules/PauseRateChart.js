import React, { Component } from 'react'
import { Line } from 'react-chartjs-2';

import "./PauseRateChart.css";

class PauseRateChart extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div  className="PauseRateChart-all">
                <Line
                    data={this.props.pauseRateData}
                    options= {{
                        responsive: true,
                        maintainAspectRatio: false,
                        aspectRatio: 1,
                        title: {
                            display: true,
                            text: `frequency of pauses over the past ${this.props.rows} prompts:`,
                            fontSize: 16,
                            fontFamily: 'Cabin Sketch',
                            padding: 30,
                        },
                        legend: {
                            labels: {
                                fontFamily: 'Cabin Sketch',
                                boxWidth: 15,
                                padding: 30,
                            },
                            position: "bottom",
                        },
                        scales: {
                            xAxes: [{
                                ticks: {
                                    reverse: true,
                                    fontFamily: 'Cabin Sketch',
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Date',
                                    fontFamily: 'Cabin Sketch',
                                },
                                gridLines: {
                                    drawBorder: true,
                                    drawOnChartArea: false,
                                }
                            }],
                            yAxes: [{
                                ticks: {
                                    fontFamily: 'Cabin Sketch',
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: "Frequency of Pauses",
                                    fontFamily: 'Cabin Sketch',
                                },
                                gridLines: {
                                    drawBorder: true,
                                    drawOnChartArea: false,
                                }
                            }],
                        },
                        layout: {
                            padding: {
                                right: 20,
                                left: 20,
                            }
                        },
                    }}
                />
            </div>
        )
    }
}

export default PauseRateChart
