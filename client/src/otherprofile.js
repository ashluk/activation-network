import { Component } from "react";
import axios from "./axios";

export default class OtherProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        //this is the prop that is automatically passed down when we have a dynamic route
        console.log("this.props.match", this.props.match);
        if (this.props.match.params.id == 100) {
            //we are using == instead of === because we are comparing a string not a number
            this.props.history.push("/");
        }
    }
    render() {
        return (
            <div>
                <h1>i am the other user</h1>
                <h2>
                    i will be responsible for displaying the other users profile
                    including bio, picture but no one can edit
                </h2>
            </div>
        );
    }
}
