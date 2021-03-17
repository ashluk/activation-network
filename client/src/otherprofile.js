import { Component } from "react";
import axios from "./axios";

export default class OtherProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            otherUser: "",
        };
        console.log("actually what is this state", this.state);
    }
    componentDidMount() {
        //this is the prop that is automatically passed down when we have a dynamic route
        console.log("this.props.match", this.props.match);
        console.log("this props match params id", this.props.match.params.id);
        /*if (this.props.match.params.id == 100) {
            //we are using == instead of === because we are comparing a string not a number
            this.props.history.push("/");
        }*/
        axios
            .get(`/user/${this.props.match.params.id}.json`)

            .then(({ data }) => {
                console.log("what is data in axios otherprofile", data);
                if (data.success == false) {
                    this.props.history.push("/");
                } else {
                    this.setState({ otherUser: data[0] });
                }
            })
            .catch((err) => {
                console.log("error in axios user:id", err);
            });
    }
    render() {
        return (
            <div>
                <h2>this is where the profile pic would go </h2>;
                <h1>
                    my name is {this.state.otherUser.first}{" "}
                    {this.state.otherUser.last}
                </h1>
                <img
                    className="profile-pic"
                    src={this.state.otherUser.imageurl}
                    id="profilepic"
                    alt={this.state.otherUser.first}
                    width="200"
                    height="200"
                />
                <h2>{this.state.otherUser.bio}</h2>
            </div>
        );
    }
}

//this.props.match.params.id is what we need to see the other id
