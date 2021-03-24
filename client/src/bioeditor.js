import { Component } from "react";
import axios from "./axios";

export default class Bioeditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: true,
            //bio: this.props.bio,
            bio: undefined,
        };
        console.log("writing", this.state.bio);
    }

    componentDidMount() {
        console.log("uploader mounted");
        this.setState({
            bio: this.props.bio,
        });
    }

    handleChange(e) {
        console.log(
            "the name of input field user is typing in",
            e.target.value
        );

        this.setState(
            {
                bio: e.target.value,
            },
            () => console.log("this. state after setState", this.state)
        );
    }
    editBio() {
        this.setState({
            editMode: true,
            bio: this.state.bio,
        });
    }

    bioEditorMethod() {
        console.log("bio editor", this.state.bio);
        axios
            .post("/updatebio", { bio: this.state.bio })
            .then((response) => {
                console.log("response from post", response.data);
                console.log("this.props", this.props);
                this.props.bioInApp(this.state.bio);
            })
            .catch(function (err) {
                console.log("err in axios catch", err);
            });
    }

    render() {
        if (this.props.bio) {
            return (
                <div className="edit">
                    <textarea
                        onChange={(e) => this.handleChange(e)}
                        defaultValue={this.props.bio}
                    ></textarea>

                    <button
                        onClick={(e) => this.bioEditorMethod(e)}
                        id="bio-button"
                    >
                        EDIT BIO
                    </button>
                </div>
            );
        } else {
            return (
                <div className="add">
                    <textarea
                        onChange={(e) => this.handleChange(e)}
                        defaultValue={this.props.bio}
                    ></textarea>
                    <button
                        onClick={(e) => this.bioEditorMethod(e)}
                        id="bio-button"
                    >
                        ADD BIO
                    </button>
                </div>
            );
        }
    }
}
