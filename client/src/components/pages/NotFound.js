import React, { Component } from "react";
import notfound from "../../public/notfound.png"
import "./NotFound.css";

class NotFound extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <img className="NotFound-image" src={notfound} />
      </div>
    );
  }
}

export default NotFound;
