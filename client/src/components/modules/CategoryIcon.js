import { navigate } from '@reach/router';
import React, { Component } from 'react'

import clown from "../../public/clown.jpg";
import animals from "../../public/animals.jpg";
import education from "../../public/education.jpg";
import environment from "../../public/environment.jpg";
import ethics from "../../public/ethics.jpg";
import food from "../../public/food.jpg";
import fun from "../../public/fun.jpg";
import health from "../../public/health.jpg";
import lifestyle from "../../public/lifestyle.jpg";
import media from "../../public/media.jpg";
import science from "../../public/science.jpg";
import society from "../../public/society.jpg";
import technology from "../../public/technology.jpg";

import "./CategoryIcon.css";

class CategoryIcon extends Component {
    constructor(props) {
        super(props);
    }

    handleClick = () => {
        this.props.provideTopic(this.props.topic);
        navigate("/topic")
    }

    render() {
        if (this.props.category === "animals") {
            return (
                <div className="CategoriesIcon-imageContainer" onClick={this.handleClick}>
                    <img src={animals} className="CategoriesIcon-image"/>
                    <div className="CategoriesIcon-text">Get a topic &#10552;</div>
                </div>
            )
        }
        else if (this.props.category === "education") {
            return (
                <div className="CategoriesIcon-imageContainer" onClick={this.handleClick}>
                    <img src={education} className="CategoriesIcon-image"/>
                    <div className="CategoriesIcon-text">Get a topic &#10552;</div>
                </div>
            )
        }
        else if (this.props.category === "environment") {
            return (
                <div className="CategoriesIcon-imageContainer" onClick={this.handleClick}>
                    <img src={environment} className="CategoriesIcon-image"/>
                    <div className="CategoriesIcon-text">Get a topic &#10552;</div>
                </div>
            )
        }
        else if (this.props.category === "ethics") {
            return (
                <div className="CategoriesIcon-imageContainer" onClick={this.handleClick}>
                    <img src={ethics} className="CategoriesIcon-image"/>
                    <div className="CategoriesIcon-text">Get a topic &#10552;</div>
                </div>
            )
        }
        else if (this.props.category === "food") {
            return (
                <div className="CategoriesIcon-imageContainer" onClick={this.handleClick}>
                    <img src={food} className="CategoriesIcon-image"/>
                    <div className="CategoriesIcon-text">Get a topic &#10552;</div>
                </div>
            )
        }
        else if (this.props.category === "fun") {
            return (
                <div className="CategoriesIcon-imageContainer" onClick={this.handleClick}>
                    <img src={fun} className="CategoriesIcon-image"/>
                    <div className="CategoriesIcon-text">Get a topic &#10552;</div>
                </div>
            )
        }
        else if (this.props.category === "health") {
            return (
                <div className="CategoriesIcon-imageContainer" onClick={this.handleClick}>
                    <img src={health} className="CategoriesIcon-image"/>
                    <div className="CategoriesIcon-text">Get a topic &#10552;</div>
                </div>
            )
        }
        else if (this.props.category === "lifestyle") {
            return (
                <div className="CategoriesIcon-imageContainer" onClick={this.handleClick}>
                    <img src={lifestyle} className="CategoriesIcon-image"/>
                    <div className="CategoriesIcon-text">Get a topic &#10552;</div>
                </div>
            )
        }
        else if (this.props.category === "media") {
            return (
                <div className="CategoriesIcon-imageContainer" onClick={this.handleClick}>
                    <img src={media} className="CategoriesIcon-image"/>
                    <div className="CategoriesIcon-text">Get a topic &#10552;</div>
                </div>
            )
        }
        else if (this.props.category === "science") {
            return (
                <div className="CategoriesIcon-imageContainer" onClick={this.handleClick}>
                    <img src={science} className="CategoriesIcon-image"/>
                    <div className="CategoriesIcon-text">Get a topic &#10552;</div>
                </div>
            )
        }
        else if (this.props.category === "society") {
            return (
                <div className="CategoriesIcon-imageContainer" onClick={this.handleClick}>
                    <img src={society} className="CategoriesIcon-image"/>
                    <div className="CategoriesIcon-text">Get a topic &#10552;</div>
                </div>
            )
        }
        else if (this.props.category === "technology") {
            return (
                <div className="CategoriesIcon-imageContainer" onClick={this.handleClick}>
                    <img src={technology} className="CategoriesIcon-image"/>
                    <div className="CategoriesIcon-text">Get a topic &#10552;</div>
                </div>
            )
        }
        else {
            return (
                <div className="CategoriesIcon-imageContainer" onClick={this.handleClick}>
                    <img src={clown} className="CategoriesIcon-image"/>
                    <div className="CategoriesIcon-text">Get a topic &#10552;</div>
                </div>
            )
        }
    }
}

export default CategoryIcon
