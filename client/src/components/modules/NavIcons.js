import React, { Component } from 'react'

import { FaChevronRight, FaChevronLeft, FaAngleDoubleDown } from 'react-icons/fa';
import { VscTriangleUp, VscTriangleDown } from 'react-icons/vsc';
import { IconContext } from "react-icons";

import "./NavIcons.css";
import "../../utilities.css";

class NavRight extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){

    }

    render() {
        return (
            <div className="NavIcons-button NavIcons-rightButton" >
                <FaChevronRight className= "NavIcons-icon" onClick={this.props.handleSubmit} />
            </div>
        )
    }
}

class NavLeft extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){

    }

    render() {
        return (
            <div className="NavIcons-button NavIcons-leftButton">
                <FaChevronLeft className= "NavIcons-icon" />
            </div>
        )
    }
}

class NavUp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="NavIcons-control NavIcons-upButton">
                <VscTriangleUp className="NavIcons-icon" />
            </div>
        )
    }
}

class NavDown extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="NavIcons-control NavIcons-downButton">
                <VscTriangleDown className="NavIcons-icon" />
            </div>
        )
    }
}

class NavDoubleDown extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="NavIcons-control">
                <FaAngleDoubleDown className="NavIcons-icon NavIcons-doubleDownButton" />
            </div>
        )
    }
}

export { NavLeft, NavRight, NavUp, NavDown, NavDoubleDown }
