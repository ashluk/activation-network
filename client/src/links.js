import React from "react";
import axios from "./axios";
export default class Links extends React.Component {
    constructor() {
        super();
        this.state = {
            error: false,
        };
    }
    handleClick() {
        console.log("user clicked linksubmit button");
        axios
            .post("/links", this.state)
            .then(({ data }) => {
                console.log("what is links data", data);
                if (data.success) {
                    console.log("data in links", data);
                } else {
                    this.setState({
                        error: true,
                    });
                }

                //if something breaks rendor an eror
            })
            .catch((err) => {
                console.log("err in axios LINK post", err);
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
    }
    render() {
        return (
            <div>
                <div id="linkforms">
                    <h1>Links Here</h1>
                    <input
                        type="url"
                        id="links"
                        name="links"
                        placeholder="got links???"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <button onClick={() => this.handleClick()}>submit</button>
                </div>
            </div>
        );
    }
}
