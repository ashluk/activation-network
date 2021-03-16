//app will be a class bc we are going to end up using state

import { Component } from "react";
import axios from "./axios";
import Profilepic from "./profilepic";
import Uploader from "./uploader";
import Logo from "./logo";
import { BrowserRouter, Route } from "react-router-dom";
import OtherProfile from "./otherprofile";
import Profile from "./profile";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            first: " ",
            last: " ",
            imageUrl: undefined,
            error: false,
            uploaderIsVisible: false,
            bio: "",
        };
        this.imageUploadInApp = this.imageUploadInApp.bind(this);
        /*this.componentDidMount = this.componentDidMount.bind(this);
        this.toggleUploader = this.toggleUploader.bind(this);*/
    }
    componentDidMount() {
        console.log("the app mounted");
        axios
            .get("./user")
            .then(({ data }) => {
                console.log("data.rows", data.rows[0]);
                this.setState({
                    first: data.rows[0].first,
                    last: data.rows[0].last,
                    imageUrl: data.rows[0].imageurl,
                    bio: data.rows[0].bio,
                });
            })
            .catch((err) => {
                console.log("error in axios user get", err);
            });

        /*var replacingThis = this;
        axios
            .get("/user")
            .then(function (response) {
                console.log("response in axios", response);
                console.log("response", response.data);

                replacingThis.first = response.data[0].first;
                replacingThis.last = response.data[0].last;
                replacingThis.bio = response.data[0].bio;
                replacingThis.imageUrl = response.data[0].imageUrl;
            })
            .catch(function (err) {
                console.log("error in imageID axios", err);
            });*/
        // here is where we want to make an axios request to 'get' info about logged in user (first name, last name, and profilePicUrl / imageUrl)
        // an axios route '/user' is a good path for it
        // when we have the info from the server, add it to the state of the component (i.e. setState)
    }
    imageUploadInApp(imageUrl) {
        console.log("imageUrl", imageUrl);
        this.setState({
            imageUrl: imageUrl,
        });
    }
    toggleUploader() {
        console.log("toggleUplaoder is running");
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible, //this means that we will make it the opposite of what we have --  true becomes false, false becomes true
        });
    }
    bioInApp(arg) {
        this.setState({
            bio: bio,
        });
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <h1>Hello from App</h1>
                    <Logo />
                    <Profilepic
                        first={this.state.first}
                        last={this.state.last}
                        imageUrl={this.state.imageUrl}
                        toggleUploader={() => this.toggleUploader()} //whatever we call these on the left hand side will become the name of the property
                    />

                    <Route
                        exact
                        path="/"
                        render={() => (
                            <Profile
                                first={this.state.first}
                                last={this.state.last}
                                imageUrl={this.state.imageUrl}
                                bio={this.state.bio}
                                bioInApp={(arg) => this.bioInApp(arg)}
                                toggleUploader={() => this.toggleUploader()}
                            />
                        )}
                    />

                    <Route
                        path="user/:id"
                        render={(props) => (
                            <OtherProfile
                                key={props.match.url}
                                match={props.match}
                                history={props.history}
                            />
                        )}
                    />

                    <h2 onClick={() => this.toggleUploader()}>
                        toggling uploader visibility
                    </h2>
                    {this.state.uploaderIsVisible && (
                        <Uploader
                            imageUploadInApp={this.imageUploadInApp}
                            // methodInApp={(arg) => this.methodInApp(arg)}
                            toggleUploader={() => this.toggleUploader()}
                        />
                    )}
                </div>
            </BrowserRouter>
        );
    }
}
//this conditionally renders Uploader   {this.state.uploaderIsVisible && <Uploader />} -- this is also how to pass a function
