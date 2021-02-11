import React, { Component } from 'react'
import { FaTwitterSquare, FaWhatsappSquare, FaEnvelope  } from 'react-icons/fa';
import { MdMessage  } from 'react-icons/md';
import { IconContext } from "react-icons";

import "./SingleSavedShare.css";
import "../../utilities.css";

class SingleSavedShare extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    facebookShare = () => {
        // TODO
    }

    whatsappShare = () => {
        const prefix = "whatsapp://send?text=";
        const raw = this.props.transcript.concat("...\n");
        const suffix = "Check out SoroSoke on https://soro-soke.herokuapp.com/";
        const rawLink = prefix.concat(raw).concat(suffix);
        const encodedLink = encodeURI(rawLink);
        return encodedLink;
    }

    twitterShare = () => {
        const prefix = "https://twitter.com/intent/tweet?text=";
        const raw = this.props.transcript.substring(0, 200).concat("...\n");
        const suffix = "Check out SoroSoke on https://soro-soke.herokuapp.com/";
        const rawLink = prefix.concat(raw).concat(suffix);
        const encodedLink = encodeURI(rawLink);
        return encodedLink;
    }
    
    emailShare = () => {
        const prefix = "mailto:?body=";
        const raw = this.props.transcript.concat("...\n");
        const suffix = "Check out SoroSoke on https://soro-soke.herokuapp.com/";
        const rawLink = prefix.concat(raw).concat(suffix);
        const encodedLink = encodeURI(rawLink);
        return encodedLink;
    }  

    messageShare = () => {
        const prefix = "sms:?&body=";
        const raw = this.props.transcript.concat("...\n");
        const suffix = "Check out SoroSoke on https://soro-soke.herokuapp.com/";
        const rawLink = prefix.concat(raw).concat(suffix);
        const encodedLink = encodeURI(rawLink);
        return encodedLink;
    }  

    render() {
        return (
            <div className="SingleSavedShare-container">
                <a href={this.whatsappShare()} target="_blank"><FaWhatsappSquare className="SingleSavedShare-whatsapp SingleSavedShare-item" /></a>
                <a href={this.twitterShare()} target="_blank"><FaTwitterSquare className="SingleSavedShare-twitter SingleSavedShare-item" /></a>
                <a href={this.emailShare()} target="_blank"><FaEnvelope className="SingleSavedShare-email SingleSavedShare-item"  /></a>
                <a href={this.messageShare()} target="_blank"><MdMessage className="SingleSavedShare-message SingleSavedShare-item"  /></a>
            </div>
        )
    }
}

export default SingleSavedShare
