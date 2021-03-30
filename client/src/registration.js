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
        console.log("user clicked buootn");
        axios
            .post("/registration", this.state)
            .then(({ data }) => {
                console.log("what is data", data);
                if (data.success) {
                    //if everything works redirect -- location.replace redirects
                    console.log("what is data after", data);

                    console.log(data);
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
                //in this case [] means that it is a variable
                [e.target.name]: e.target.value,
            },
            () => console.log("this. state after setState", this.state)
        );
        //we HAVE to call this.setState to store input into state
    }
    render() {
        return (
            <div>
                <div id="regforms">
                    <h1>Registration</h1>
                    {this.state.error && <p>something went wrong</p>}
                    <input
                        name="first"
                        placeholder="first"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <input
                        name="last"
                        placeholder="last"
                        onChange={(e) => this.handleChange(e)}
                    />
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
                    <select
                        name="artistormusician"
                        onChange={(e) => this.handleChange(e)}
                    >
                        <option value="select">select</option>

                        <option value="artist">artist</option>
                        <option value="musician">musician</option>
                    </select>

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
            </div>
        );
    }
}
