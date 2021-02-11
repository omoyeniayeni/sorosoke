import React, { Component } from 'react'
import { get, post } from "../../utilities";
import { Router, Redirect, navigate } from "@reach/router";

import "./SingleSavedDelete.css";
import "../../utilities.css";

class SingleSavedDelete extends Component {
    constructor(props) {
        super(props);
    }


    deleteSavedTranscript = () => {
        post("/api/deletesavedtranscript", { _id: this.props.transcriptId })
        .then(this.props.updatePage(this.props.transcriptId))
        .then(alert("Successfully deleted! You can move back to a different tab."));
    }

    render() {
        return (
            <div className="SingleSavedDelete-container">
                <div className="SingleSavedDelete-item">Are you sure you want to delete this? &emsp;
                    <button 
                        onClick={() => {this.deleteSavedTranscript()}} 
                        className="SingleSavedDelete-button">
                        Yes
                    </button>
                </div>
            </div>
        )
    }
}

export default SingleSavedDelete
