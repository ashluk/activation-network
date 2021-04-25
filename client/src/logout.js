import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Logout extends React.Component {
    constructor() {
        super();
        this.state = {
            error: false,
        };
    }
    handleClick() {
        console.log("user clicked logout button");
        axios.get("/logout");
        location.replace("/welcome");
    }

    render() {
        return (
            <div>
                <img
                    src="object7.png"
                    width="70px"
                    height="70px"
                    className="logout"
                    onClick={this.handleClick}
                />
            </div>
        );
    }
}
//                <button onClick={this.handleClick}>LOGOUT</button>
