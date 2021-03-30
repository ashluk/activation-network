import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Artistormusician extends React.Component {
    constructor() {
        super();
        this.state = {
            error: false,
        };
    }
    handleClick() {
        console.log("user clicked buootn");
        axios
            .post("/artistormusician", this.state)
            .then(({ data }) => {
                console.log("what is data in artistormusician", data);
                if (data.success) {
                    //if everything works redirect -- location.replace redirects
                    console.log("what is data in artistormusician after", data);

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

    render() {
        return (
            <div>
                <div id="featuredcollaborations"></div>
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
                        <div class="linktext">LOGIN</div>
                    </Link>
                </div>
            </div>
        );
    }
}
