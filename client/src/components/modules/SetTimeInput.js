import React, { Component } from 'react'

import "./SetTimeInput.css";

class SetTimeInput extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <input
            type="text"
            placeholder= {this.props.placeholder}
            value={this.props.value}
            onChange={this.props.handleChange}
            className="SetTimeInput-input"
            />
        )
    }
}

export default SetTimeInput
