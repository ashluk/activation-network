import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Delete extends React.Component {
    constructor() {
        super();
        this.state = {
            error: false,
        };
    }
    handleClick() {
        console.log("user clicked delete button");
        axios.get("/delete");
        location.replace("/welcome");
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClick}>DELETE CHAT MESSAGES</button>
            </div>
        );
    }
}
