import React from "react";
import axios from "./axios";
export default class Links extends React.Component {
    constructor() {
        super();
        this.state = {
            editMode: false,
            links: undefined,

            error: false,
        };
    }
    handleClick() {
        console.log("user clicked linksubmit button", this.state);
        axios
            .post("/links", this.state)
            .then(({ data }) => {
                console.log("what is links data", data);
                if (data.success) {
                    this.props.linksInApp(this.state.links);

                    this.setState({ editMode: false });
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
                links: e.target.value,
            },
            () => console.log("this. state after setState", this.state.links)
        );
        console.log("this.props.links", this.props.links);
    }
    editLinks() {
        this.setState({
            editMode: true,
        });
        console.log("EDIT LINKS WAS PUSHED");
    }

    render() {
        if (!this.state.editMode) {
            return (
                <div id="editlinks">
                    {this.props.links}
                    <button onClick={() => this.editLinks()}>
                        EDIT WEBSITE LINK
                    </button>
                </div>
            );
        } else {
            return (
                <div>
                    <div id="linkforms">
                        <input
                            type="url"
                            id="links"
                            name="links"
                            placeholder="got links???"
                            onChange={(e) => this.handleChange(e)}
                        />
                        <button onClick={() => this.handleClick()}>
                            ADD WEBSITE
                        </button>
                    </div>
                </div>
            );
        }
    }
}
