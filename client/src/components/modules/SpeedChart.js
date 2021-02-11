import React, { Component } from 'react'
import { Line, Bar, Doughnut, Pie, Scatter } from 'react-chartjs-2';

import "./SpeedChart.css";

class SpeedChart extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="SpeedChart-all">
                <Line
                    data={this.props.speedData}
                    options= {{
                        responsive: true,
                        maintainAspectRatio: false,
                        aspectRatio: 1,
                        title: {
                            display: true,
                            text: `speed over the past ${this.props.rows} prompts:`,
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
                                    labelString: "Speed(wps)",
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

export default SpeedChart
