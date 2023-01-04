import React, { Component } from 'react'
import { Redirect } from "@reach/router";

import LoginButton from "../modules/LoginButton.js"
import Archive from '../modules/Archive.js';
import Categories from "./Categories.js"
import image from "../../public/image.png";
import { NavDoubleDown } from "../modules/NavIcons.js";


import "./LoginPage.css"
import Profile from './Profile.js';

class LoginPage extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let loginButton = undefined;
        loginButton = <LoginButton handleLogin={this.props.handleLogin} handleLogout={this.props.handleLogout} userId={this.props.userId} />;

        if (this.props.userId) {
            return (
                <Categories 
                    provideTopic = {this.props.provideTopic}
                    handleLogin={this.props.handleLogin}
                    handleLogout={this.props.handleLogout}
                    userId={this.props.userId}
                />
            )
        }
        return (
            <div>                
                <section className="LoginPage-sectionLogo">
                    <section className="LoginPage-sectionLogoContent">
                        <img src={image} className="LoginPage-bigText" />
                        <p className="LoginPage-loginCue">Ready to improve your speaking skills?
                            <p className="LoginPage-loginButton">
                                {loginButton}
                            </p>
                        </p>
                        <a className="LoginPage-navDown" href="#LoginPage-sectionIntroduction"><NavDoubleDown /></a>
                    </section>
                </section>
                <section id="LoginPage-sectionIntroduction" className="LoginPage-sectionIntroduction">
                    <p  className="LoginPage-noteHead">Why use SoroSoke?</p>
                    <div className="LoginPage-note">
                        <p className="LoginPage-noteOne">
                            The ability to give impromptu speeches without preparation is a 
                            vital skill which could be necessary in various contexts such as giving 
                            unplanned updates at work, filling in for a speaker, being interviewed 
                            and speaking during debates.
                        </p>
                        <p className="LoginPage-noteTwo">
                            Sọrọ sókè is a Yoruba term that translates to 'Speak Up'. SoroSoke listens 
                            to you as you speak on on one of the several available engaging prompts without 
                            preparing for it and gives you feedback on what you say. 
                            The feedbacks range from your speed, to your pauses, 
                            to your repetitive use of certain words and even suggests words to use in place of 
                            you top repeated words.
                        </p>
                    </div>
                    <a className="LoginPage-navDown" href="#LoginPage-sectionAllSteps"><NavDoubleDown /></a>
                </section>
                <section id="LoginPage-sectionAllSteps" className="LoginPage-sectionAllSteps">
                    <h1 className="LoginPage-sectionHead">How to use SoroSoke?</h1>
                    <section className="LoginPage-sectionSteps">
                        <section className="LoginPage-sectionOne">
                            <h3>Step 1</h3>
                            <p>
                                <u>Login:</u> Login to SoroSoke with your google account to make use of 
                                this service.
                            </p>
                        </section>
                        <section className="LoginPage-sectionTwo">
                            <h3>Step 2</h3>
                            <p>
                                <u>Pick a category:</u> Choose one of the categories provided by 
                                SoroSoke and you will be assigned a random topic!
                            </p>
                        </section>
                        <section className="LoginPage-sectionThree">
                            <h3>Step 3</h3>
                            <p>
                                <u>Set a time:</u> Set your timer between 0 seconds and 5 minutes 59 seconds.
                            </p>
                        </section>
                        <section className="LoginPage-sectionFour">
                            <h3>Step 4</h3>
                            <p>
                                <u>View your topic:</u> You get to view your randomly assigned topic for 
                                a maximum of 10 seconds. Enough time to <em>prepare</em>? We'll see!
                            </p>
                        </section>
                        <section className="LoginPage-sectionFive">
                            <h3>Step 5</h3>
                            <p>
                                <u>SoroSoke (Speak up):</u> Turn on your mic and get talking...
                            </p>
                        </section>
                        <section className="LoginPage-sectionSix">
                            <h3>Step 6</h3>
                            <p>
                                <u>Get your feedback:</u> SoroSoke returns some feedback about your speech which are saved in your archives!
                            </p>
                        </section>
                    </section>
                    <p className="LoginPage-loginCueDown">Ready to improve your speaking skills? 
                        <p className="LoginPage-loginButton">
                            {loginButton}
                        </p>
                    </p>
                </section>
            </div>
        )
    }
}

export default LoginPage
