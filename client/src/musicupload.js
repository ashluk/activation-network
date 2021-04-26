import React from "react";
import axios from "./axios";

import { Link } from "react-router-dom";

export default class Musicupload extends React.Component {
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
            .post("/upload/music", formData)
            .then(({ data }) => {
                console.log("what is data in uploadmusic", data);
                if (data.success) {
                    //i want to call something here passed to it by profile.
                    console.log("what is data in uploadmusic after", data);
                    this.props.handleMusicInProfile(data.url);
                    console.log("Music in profile data", data.url);
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

    handleAudio(e) {
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
                <div id="music-upload">
                    {this.state.error && <p>something went wrong</p>}
                    UPLOAD YOUR MUSIC
                    <input
                        type="file"
                        name="file"
                        accept="audio/*"
                        onChange={(e) => this.handleAudio(e)}
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
                        <option value="breakbeat">breakbeat</option>
                        <option value="vocal">vocal</option>
                        <option value="hardcore">hardcore</option>
                        <option value="newbeat">newbeat</option>
                        <option value="experimental">experimental</option>
                        <option value="house">house</option>

                        <option value="industrial">industrial</option>
                        <option value="ambient">ambient</option>
                        <option value="jungle">jungle</option>
                        <option value="techno">techno</option>
                    </select>
                    <button onClick={() => this.handleClick()}>submit</button>
                </div>
            </div>
        );
    }
}
