import React from "react";
import axios from "./axios";

import { Link } from "react-router-dom";

export default class Artistimages extends React.Component {
    constructor() {
        super();
        this.file = undefined;
        this.state = {
            error: false,
        };
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
    handleClick() {
        var formData = new FormData();
        formData.append("title", this.state.title);
        formData.append("tags", this.state.tags);
        formData.append("type", this.state.type);

        formData.append("file", this.state.file);
        console.log("this.state", this.state);
        console.log("type", this.state.type);
        console.log("tags", this.state.tags);
        axios
            .post("/upload/artwork", formData)
            .then(({ data }) => {
                console.log("what is data in artistimages", data);
                if (data.success) {
                    //i want to call something here passed to it by profile.
                    console.log("what is data in artistimages after", data);
                    this.props.handleImageInProfile(data.url);
                    console.log("data in profile", data);
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

    handleImage(e) {
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
                <div id="artist-images">
                    {this.state.error && <p>something went wrong</p>}
                    UPLOAD YOUR ART
                    <input
                        type="file"
                        name="file"
                        accept="video/*"
                        onChange={(e) => this.handleImage(e)}
                    />
                    <input
                        name="title"
                        placeholder="title"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <select name="type" onChange={(e) => this.handleChange(e)}>
                        <option value="select">select</option>

                        <option value="art">art</option>
                        <option value="music">music</option>
                    </select>
                    <select name="tags" onChange={(e) => this.handleChange(e)}>
                        <option value="select">select</option>

                        <option value="3d">3d</option>
                        <option value="vhs">vhs</option>
                        <option value="cyberpunk">cyberpunk</option>

                        <option value="animation">animation</option>
                        <option value="dance">dance</option>
                        <option value="gan">gan</option>
                        <option value="fashion">fashion</option>
                    </select>
                    <button onClick={() => this.handleClick()}>submit</button>
                </div>
            </div>
        );
    }
}
