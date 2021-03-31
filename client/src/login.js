import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
export default class Registration extends React.Component {
    constructor() {
        super();
        this.state = {
            error: false,
        };
    }
    handleClick() {
        console.log("user clicked login button");
        axios
            .post("/login", this.state)
            .then(({ data }) => {
                console.log("what is login data", data);
                if (data.success) {
                    location.replace("/");
                } else {
                    this.setState({
                        error: true,
                    });
                    //if something breaks rendor an eror
                }
            })
            .catch((err) => {
                console.log("err in axios post", err);
            });
    }
    handleChange(e) {
        console.log("change e.target.value !", e.target.value);
        //e gives us access to see what the user is typing
        console.log("the name of input field user is typing in", e.target.name);
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => console.log("this. state after setState", this.state)
        );
        //we HAVE to call this.setState to store input into state
    }
    render() {
        return (
            <div>
                <div id="loginforms">
                    <h1>Login</h1>
                    {this.state.error && <p>something went wrong</p>}

                    <input
                        name="email"
                        placeholder="email"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <input
                        name="password"
                        placeholder="password"
                        type="password"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <button onClick={() => this.handleClick()}>submit</button>
                </div>
                <div id="registrationlinkto">
                    {this.state.error && <p>something went wrong</p>}
                    <Link to="/registration">
                        <img
                            src="object4.png"
                            width="100px"
                            height="100px"
                            className="object"
                        />
                        <div className="linktext">REGISTRATION</div>
                    </Link>
                </div>
                <div id="linkto">
                    <Link to="/login">
                        <img
                            src="object5.png"
                            width="100px"
                            height="100px"
                            className="object"
                        />
                        <div className="linktext">LOGIN</div>
                    </Link>
                </div>
                <div id="linktologin">
                    <Link to="/reset">Click here to reset password!</Link>
                </div>
            </div>
        );
    }
}
