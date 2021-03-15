import { Component } from "react";
import axios from "./axios";

export default class Bioeditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: true,
            bio: this.props.bio,
        };
    }

    componentDidMount() {
        console.log("uploader mounted");
    }
    handleChange(e) {
        this.file = e.target.files[0];

        //we HAVE to call this.setState to store input into state
    }
    editBio() {
        this.setState({ editMode: true });
    }

    bioEditorMethod() {
        console.log("bio editor", this.props.bio);
        axios
            .post("/bioeditor")
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
                    <input
                        name="bio"
                        placeholder="bio"
                        onChange={(e) => this.handleChange(e)}
                    />
                </div>
            );
        } else {
            return (
                <div className="edit">
                    <button onClick={(e) => this.bioEditorMethod(e)}>
                        EDIT BIO
                    </button>
                    ;
                </div>
            );
        }
    }
}
