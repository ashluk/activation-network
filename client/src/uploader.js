import { Component } from "react";
import axios from "./axios";

export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.file = undefined;
        console.log("props in uploader", props);
    }
    componentDidMount() {
        console.log("uploader mounderd");
    }
    handleChange(e) {
        this.file = e.target.files[0];

        //we HAVE to call this.setState to store input into state
    }

    imageUploadMethod() {
        this.props.imageUploadInApp("this is an arg");
        var formData = new FormData();
        formData.append("file", this.state.file);
        axios
            .post("/upload", formData)
            .then(({ response }) => {
                console.log("response from post", response.data);
                this.props.imageUploadInApp(response.data.imageUrl);
                //var newImage = response.data.imgObject;
                // console.log("replacingThis.images", this.images);
            })
            .catch(function (err) {
                console.log("err in axios catch", err);
            });
    }
    render() {
        return (
            <div>
                <div className="modal">
                    <h2 className="uploader-text">
                        This is my uploader component!
                    </h2>
                    <div
                        className="x"
                        onClick={() => this.props.toggleUploader()}
                    >
                        X
                    </div>

                    <input
                        onChange={(e) => this.handleChange(e)}
                        type="file"
                        name="file"
                        accept="image/*"
                    ></input>
                    <h2 onClick={(e) => this.imageUploadMethod(e)}>
                        Click here to run method in uploader!
                    </h2>
                </div>
            </div>
        );
    }
}
//                <input onChange='handleChange' type="file" name='file' accept='image/*'>

//methodInUploader is now imageUploadMethod
