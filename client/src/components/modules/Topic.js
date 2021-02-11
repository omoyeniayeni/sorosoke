import React, { Component } from 'react'

class Topic extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <div>
                "{this.props.randomTopic}"
            </div>
        )
    }
}

export default Topic
