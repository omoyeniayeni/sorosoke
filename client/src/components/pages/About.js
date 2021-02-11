import React, { Component } from 'react'
import Navbar from '../modules/Navbar';
import LoginPage from "./LoginPage.js";

import image from "../../public/image.png";

import { NavDoubleDown } from "../modules/NavIcons.js";

import "./About.css";
import "../../utilities.css";

class about extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }
    // <img src={image} className="About-bigText" />

    render() {
        return (
            <>
            {this.props.userId ? (
                <div className="About-all">
                    <Navbar 
                        handleLogin={this.props.handleLogin}
                        handleLogout={this.props.handleLogout}
                        userName={this.props.userName}
                        userId={this.props.userId}
                        current="about"
                    />
                    <section className="About-sectionIntroduction">
                        <p  className="About-noteHead">Why use SoroSoke?</p>
                        <div className="About-note">
                            <p className="About-noteOne">
                                The ability to give impromptu speeches without preparation is a 
                                vital skill which could be necessary in various contexts such as giving 
                                unplanned updates at work, filling in for a speaker, being interviewed 
                                and speaking during debates.
                            </p>
                            {/* <img src={image} className="About-bigText" /> */}
                            <p className="About-noteTwo">
                                Sọrọ sókè is a Yoruba term that translates to 'Speak Up'. SoroSoke listens 
                                to you as you speak on on one of the several available engaging prompts without 
                                preparing for it and gives you feedback on what you say. 
                                The feedbacks range from your speed, to your pauses, 
                                to your repetitive use of certain words and even suggests words to use in place of 
                                you top repeated words.
                            </p>
                        </div>
                        <a className="About-navDown" href="#About-sectionAllSteps"><NavDoubleDown /></a>
                    </section>
                    <section id="About-sectionAllSteps" className="About-sectionAllSteps">
                        <h1 className="About-sectionHead">How to use SoroSoke?</h1>
                        <section className="About-sectionSteps">
                            <section className="About-sectionOne">
                                <h3>Step 1</h3>
                                <p>
                                    <u>Login:</u> Login to SoroSoke with your google account to make use of 
                                    this service.
                                </p>
                            </section>
                            <section className="About-sectionTwo">
                                <h3>Step 2</h3>
                                <p>
                                    <u>Pick a category:</u> Choose one of the categories provided by 
                                    SoroSoke and you will be assigned a random topic!
                                </p>
                            </section>
                            <section className="About-sectionThree">
                                <h3>Step 3</h3>
                                <p>
                                    <u>Set a time:</u> Set your timer between 0 seconds and 5 minutes 59 seconds.
                                </p>
                            </section>
                            <section className="About-sectionFour">
                                <h3>Step 4</h3>
                                <p>
                                    <u>View your topic:</u> You get to view your randomly assigned topic for 
                                    a maximum of 10 seconds. Enough time to <em>prepare</em>? We'll see!
                                </p>
                            </section>
                            <section className="About-sectionFive">
                                <h3>Step 5</h3>
                                <p>
                                    <u>SoroSoke (Speak up):</u> Turn on your mic and get talking...
                                </p>
                            </section>
                            <section className="About-sectionSix">
                                <h3>Step 6</h3>
                                <p>
                                    <u>Get your feedback:</u> SoroSoke returns some feedback about your speech which are saved in your archives!
                                </p>
                            </section>
                        </section>
                    </section>
                </div>
            ) : (
                <LoginPage 
                    handleLogin={this.props.handleLogin}
                    handleLogout={this.props.handleLogout}
                    provideTopic = {this.props.provideTopic}
                    userId={this.props.userId}
                />
            )}
            </>
        )
    }
}

export default about
