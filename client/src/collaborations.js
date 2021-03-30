import React from "react";
import axios from "./axios";

import { Link } from "react-router-dom";
export default class Collaborations extends React.Component {
    constructor(props) {
        super(props);
        this.file = undefined;

        this.state = {
            error: false,
        };
    }
    handleChange(e) {
        console.log("change e.target.value !", e.target.value);
        console.log("the name of input field user is typing in", e.target.name);
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => console.log("this. state after setState", this.state)
        );
    }
    handleClick() {
        console.log("this.props in handleclick", this.props);
        var formData = new FormData();
        formData.append("title", this.state.title);
        formData.append("description", this.state.description);
        formData.append("file", this.state.file);
        formData.append("collaborator_id", this.props.otherUserId);

        console.log("this.state", this.state);
        console.log("file", this.state.file);
        axios
            .post("/upload/collaborations", formData)
            .then(({ data }) => {
                console.log("what is data in collaboration", data);
                if (data.success) {
                    //i want to call something here passed to it by profile.
                    console.log("what is data in collaboration after", data);
                    this.props.handleCollaborationsInProfile(data.url);
                    console.log(data);
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

    uploadCollaborations(e) {
        console.log("change e.target.value !", e.target.value);
        //e gives us access to see what the user is typing
        console.log(
            "the name of input field user is typing in",
            e.target.name,
            e.target.files[0]
        );
        this.setState(
            {
                //in this case [] means that it is a variable
                [e.target.name]: e.target.files[0],
            },
            () => console.log("this. state after setState", this.state)
        );
    }

    render() {
        return (
            <div>
                <div id="collaborations-upload">
                    {this.state.error && <p>something went wrong</p>}
                    READY TO SHARE YOUR PROJECT?
                    <input
                        type="file"
                        name="file"
                        accept="video/*"
                        onChange={(e) => this.uploadCollaborations(e)}
                    />
                    <input
                        name="title"
                        placeholder="title"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <input
                        name="description"
                        placeholder="description"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <button onClick={() => this.handleClick()}>submit</button>
                </div>
            </div>
        );
    }
}
/*
 <input
                        name="collaborator_id"
                        placeholder="collaborator_id"
                        onChange={(e) => this.handleChange(e)}
                    />
                    */
