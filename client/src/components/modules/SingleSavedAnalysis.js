// import React, { Component } from 'react'
// import { get, post } from "../../utilities";
// import { navigate } from "@reach/router";


// import "./SingleSavedAnalysis.css";

// class SingleSavedAnalysis extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             analysis: [],
//         };
//     }

//     componentDidMount() {
//         get("/api/analyses", { transcriptId: this.props.transcriptId }).then((analysis) => {
//             this.setState({
//                 analysis: analysis,
//             })
//         })
//     }

//     render() {
//         console.log(this.state.analysis)
//         return (
//             <div>
//                 {this.state.analysis.map((analysisObj) => (
//                     <div className="SingleSavedAnalysis-container">
//                         <p className="SingleSavedAnalysis-analysis">Analysis</p>
//                         <p key={`Time_Used_${analysisObj._id}`} className="SingleSavedAnalysis-item">You used {analysisObj.timeUsed} seconds </p>
//                         <p key={`Speed_${analysisObj._id}`} className="SingleSavedAnalysis-item">Your speed: {analysisObj.speed} wps</p>
//                         <p key={`Pauses_${analysisObj._id}`} className="SingleSavedAnalysis-item">You paused {analysisObj.pauses} times</p>
//                         <p key={`Pause_Time_${analysisObj._id}`} className="SingleSavedAnalysis-item">The duration of your pauses was {analysisObj.pauseTime} seconds</p>
//                     </div>
//                 ))}
//             </div>
//         )
//     }
// }

// export default SingleSavedAnalysis
