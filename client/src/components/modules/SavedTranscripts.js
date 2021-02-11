import React, { Component } from 'react'

import { get } from '../../utilities';

import SingleSavedTranscript from "./SingleSavedTranscript.js";

import "./SavedTranscripts.css"

class SavedTranscripts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            savedTranscript: [],
        };
    }
    componentDidMount() {
        get("/api/savedtranscripts").then((savedTranscript) => {
            this.setState({
                savedTranscript: savedTranscript,
            })
        })
    }
    // Update the list of transcipts that show up when a transcript is deleted in SingleSavedDelete
    // This is passed to SingleSavedTranscript and used in updatePage function
    updateTranscript = (todelete) => {
        this.setState({
            savedTranscript: this.state.savedTranscript.filter(savedTranscript => savedTranscript._id != todelete)
        })
    }

    updatePage = (todelete) => {
        this.props.updateCharts(todelete);
        this.updateTranscript(todelete);
    }

    render() {
        return (
            <div>
                <h3 className="SavedTranscript-archive">SAVED TRANSCRIPTS</h3>
                <SingleSavedTranscript userId={this.props.userId} updatePage={this.updatePage} savedTranscript={this.state.savedTranscript} />
            </div>
        )
    }
}

export default SavedTranscripts
