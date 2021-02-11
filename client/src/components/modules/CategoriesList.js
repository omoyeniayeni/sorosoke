import React, { Component } from 'react'
import { Link } from "@reach/router";

import CategoryIcon from "./CategoryIcon.js";


import "./CategoriesList.css";

class CategoriesList extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {

    }

    render() {
        return (
            <>
            <section className="CategoriesList-all">
                <div className="CategoriesList-instruction">choose a category from which you will like to get a random topic / prompts...</div>
                <section className="CategoriesList-container">
                    {this.props.categories.map((categoryObj) => (
                    <section key={categoryObj._id} className="CategoriesList-item">
                        <CategoryIcon category={categoryObj.category.toLowerCase()} provideTopic={this.props.provideTopic} topic={categoryObj.topic} />
                        <div className="CategoriesList-name">{categoryObj.category}</div>
                    </section>
                    ))}
                </section>
            </section>
            </>
        )
    }
}

export default CategoriesList
