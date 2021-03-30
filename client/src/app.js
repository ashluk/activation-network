//app will be a class bc we are going to end up using state

import { Component } from "react";
import axios from "./axios";
import Profilepic from "./profilepic";
import Uploader from "./uploader";
import Logo from "./logo";
import Backgroundimage from "./backgroundimage";
import Artistimages from "./artistimages";
import { BrowserRouter, Route } from "react-router-dom";
import OtherProfile from "./otherprofile";
import Profile from "./profile";
import FindPeople from "./findpeople";
import FindMusic from "./findmusic";

import Friends from "./friends";
import { Link } from "react-router-dom";
import Logout from "./logout";
import Chat from "./chat";
import Delete from "./delete";

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
            .get("/user")
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
        axios
            .get("/artwork")
            .then(({ data }) => {
                var artwork = [];
                for (var i = 0; i < data.rows.length; i++) {
                    console.log("data.rows[i", data.rows[i]);
                    artwork.push(data.rows[i].file);
                }

                console.log("data.rows in artwork", data.rows);
                this.setState({
                    artwork: artwork,
                });
            })
            .catch((err) => {
                console.log("error in axios upload art", err);
            });
        axios
            .get("/music")
            .then(({ data }) => {
                var music = [];
                for (var i = 0; i < data.rows.length; i++) {
                    console.log("data.rows[i]musix", data.rows[i]);
                    music.push(data.rows[i].file);
                }

                console.log("data.rows in musixc", data.rows);
                this.setState({
                    music: music,
                });
            })
            .catch((err) => {
                console.log("error in axios upload music", err);
            });
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
    bioInApp(bio) {
        this.setState({
            bio: bio,
        });
    }

    render() {
        return (
            <BrowserRouter>
                <div id="line">
                    <img src="https://static.tumblr.com/rzpvsia/0fan3j19h/site_horizon.png"></img>
                </div>
                <Link to="/users/" id="stalkpeople">
                    SEARCH FOR ARTISTS
                </Link>
                <Link to="/findmusic" id="findmusicians">
                    SEARCH FOR MUSICIANS
                </Link>

                <Link to="/" id="yourprofile">
                    YOUR PROFILE
                </Link>

                <div id="top-left">
                    <div className="currentuser">
                        <Profilepic
                            first={this.state.first}
                            last={this.state.last}
                            imageUrl={this.state.imageUrl}
                            toggleUploader={() => this.toggleUploader()} //whatever we call these on the left hand side will become the name of the property
                        />

                        <Logout />
                    </div>

                    <Route
                        exact
                        path="/"
                        render={() => (
                            <Profile
                                first={this.state.first}
                                last={this.state.last}
                                imageUrl={this.state.imageUrl}
                                artwork={this.state.artwork}
                                bio={this.state.bio}
                                bioInApp={(bio) => this.bioInApp(bio)}
                                toggleUploader={() => this.toggleUploader()}
                            />
                        )}
                    />

                    <Route
                        path="/user/:id"
                        render={(props) => (
                            <OtherProfile
                                key={props.match.url}
                                match={props.match}
                                history={props.history}
                            />
                        )}
                    />

                    <Route
                        path="/users/"
                        render={(props) => (
                            <FindPeople
                                key={props.match.url}
                                match={props.match}
                                history={props.history}
                            />
                        )}
                    />
                    <Route
                        path="/findmusic"
                        render={(props) => (
                            <FindMusic
                                key={props.match.url}
                                match={props.match}
                                history={props.history}
                            />
                        )}
                    />
                </div>
                <h2 onClick={() => this.toggleUploader()}></h2>
                {this.state.uploaderIsVisible && (
                    <Uploader
                        imageUploadInApp={this.imageUploadInApp}
                        // methodInApp={(arg) => this.methodInApp(arg)}
                        toggleUploader={() => this.toggleUploader()}
                    />
                )}
                <Route
                    path="/friends"
                    render={(props) => (
                        <Friends
                            key={props.match.url}
                            match={props.match}
                            history={props.history}
                        />
                    )}
                />
                <Route path="/chat" component={Chat} />
            </BrowserRouter>
        );
    }
}
//this conditionally renders Uploader   {this.state.uploaderIsVisible && <Uploader />} -- this is also how to pass a function
/* */
// <Route path="/artworks" component={Artworks} />
/*  <Route
                        path="/upload/artwork"
                        render={(props) => (
                            <Artistimages artwork={this.state.artwork} />
                        )}
                    />*/
