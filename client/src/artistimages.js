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
    handleClick() {
        console.log("user clicked buootn");
        axios
            .post("/artistimages", this.state)
            .then(({ data }) => {
                console.log("what is data in artistimages", data);
                if (data.success) {
                    //if everything works redirect -- location.replace redirects
                    console.log("what is data in artistimages after", data);

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
    handleImage() {
        this.props.imageUploadInApp("this is an arg");
        var formData = new FormData();
        formData.append("file", this.state.file);
        axios
            .post("/artistimage", formData)
            .then(({ data }) => {
                console.log("response from post", data);
                this.props.imageUploadInApp(data.imageUrl);
            })
            .catch(function (err) {
                console.log("err in axios catch", err);
            });
    }

    render() {
        return (
            <div>
                <div id="artist-images">
                    {this.state.error && <p>something went wrong</p>}
                    UPLOAD YOUR WORK
                    <input
                        type="file"
                        name="file"
                        accept="image/*"
                        onChange={(e) => this.handleImage(e)}
                    />
                    <input
                        name="title"
                        placeholder="title"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <select
                        name="video-or-image"
                        onChange={(e) => this.handleChange(e)}
                    >
                        <option value="select">select</option>

                        <option value="video">video</option>
                        <option value="image">image</option>
                    </select>
                    <select name="tags" onChange={(e) => this.handleChange(e)}>
                        <option value="select">select</option>

                        <option value="3d">3d</option>
                        <option value="animation">animation</option>
                        <option value="drawing">drawing</option>
                        <option value="gan">gan</option>
                        <option value="responsive">responsive</option>
                    </select>
                    <button onClick={() => this.handleClick()}>submit</button>
                </div>
            </div>
        );
    }
}
