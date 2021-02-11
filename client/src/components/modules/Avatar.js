import React, { Component } from 'react'
import "./Avatar.css"

class Avatar extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <>
                <div className="Avatar-container">
                    <div className="Avatar-profilePicture" />    
                </div>
            </>
        )
    }
}

export default Avatar
