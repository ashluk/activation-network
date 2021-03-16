import { Component } from "react";
import axios from "./axios";

export default class Bioeditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: true,
            bio: this.props.bio,
            bioInProgress: undefined,
        };
        console.log("writing", this.state.bioInProgress);
    }

    componentDidMount() {
        console.log("uploader mounted");
        this.setState({
            bioInProgress: this.props.bio,
        });
    }

    handleChange(e) {
        console.log(
            "the name of input field user is typing in",
            e.target.value
        );

        this.setState(
            {
                bioInProgress: e.target.value,
            },
            () => console.log("this. state after setState", this.state)
        );
    }
    editBio() {
        this.setState({
            editMode: true,
            bioInProgress: this.state.bioInProgress,
        });
    }

    bioEditorMethod() {
        console.log("bio editor", this.state.bioInProgress);
        axios
            .post("/updatebio")
            .then((response) => {
                console.log("response from post", response.data);

                this.props.bioEditorInApp(response.data);
            })
            .catch(function (err) {
                console.log("err in axios catch", err);
            });
    }
    render() {
        if (this.state.edit) {
            return (
                <div className="noedit">
                    <h1>i am the bio editor</h1>
                    <textarea
                        onChange={(e) => this.handleChange(e)}
                        defaultValue={this.props.bio}
                    ></textarea>
                    <button onClick={(e) => this.bioEditorMethod(e)}>
                        EDIT BIO
                    </button>
                </div>
            );
        } else {
            return (
                <div className="edit">
                    <textarea
                        onChange={(e) => this.handleChange(e)}
                        defaultValue={this.props.bio}
                    ></textarea>
                    <button onClick={(e) => this.bioEditorMethod(e)}>
                        EDIT BIO
                    </button>
                    ;
                </div>
            );
        }
    }
}
