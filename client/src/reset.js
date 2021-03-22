import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
        };
    }
    secretSent() {}
    handleClick() {
        console.log("user clicked reset button");
        axios
            .post("/reset", this.state)
            .then(({ data }) => {
                console.log("what is reset data", data);
                if (data.success) {
                    this.setState({ step: 2 });
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
    updatePass() {
        axios
            .post("/verify", this.state)
            .then(({ data }) => {
                if (data.success) {
                    this.setState({ step: 3 });
                } else {
                    this.setState({
                        error: true,
                    });
                }
            })
            .catch((err) => {
                console.log("err in update pass", err);
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
        const { step } = this.state;

        if (step == 1) {
            return (
                <div>
                    <h1>password reset</h1>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="email"
                    />
                    <button onClick={() => this.handleClick()}>reset</button>
                </div>
            );
        }
        if (step == 2) {
            return (
                <div>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="code"
                        placeholder="entercode"
                    />
                    <input
                        onChange={(e) => this.handleChange(e)}
                        name="newpassword"
                        placeholder="new password"
                    />
                    <button onClick={() => this.updatePass()}>
                        keep new password
                    </button>
                </div>
            );
        }

        if (step == 3) {
            return (
                <div>
                    it worked!!
                    <Link to="/login">Click here to log in!</Link>
                </div>
            );
        }
    }
}
