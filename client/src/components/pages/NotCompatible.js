import React, { Component } from 'react'

import { FaRegSadTear } from 'react-icons/fa';


import image from "../../public/image.png";
import "./NotCompatible.css"

export class NotCompatible extends Component {
    constructor (props) {
        super (props);
    }
    render() {
        return (
            <div>
                <section className="NotCompatible-sectionLogo">
                    <img src={image} className="NotCompatible-bigText" />
                    <div className="NotCompatible-disclaimer">
                        <h3><FaRegSadTear/> Browser / Device Not Supported <FaRegSadTear/> </h3>
                        <br/>
                        SoroSoke is only available for use on PCs and with Chrome browser.
                    </div>
                </section> 
            </div>
        )
    }
}

export default NotCompatible
