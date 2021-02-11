import React, { Component } from 'react'
import { Line, Bar, Doughnut, Pie, Scatter } from 'react-chartjs-2';

import "./PauseChart.css";

class PauseChart extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div  className="PauseChart-all">
                <Line
                    data={this.props.pauseData}
                    options= {{
                        responsive: true,
                        maintainAspectRatio: false,
                        aspectRatio: 1,
                        title: {
                            display: true,
                            text: `number of pauses over the past ${this.props.rows} prompts:`,
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
                                    labelString: "Pauses",
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

export default PauseChart
