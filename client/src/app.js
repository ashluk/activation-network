//app will be a class bc we are going to end up using state

import { Component } from "react";
import axios from "./axios";
import Profilepic from "./profilepic";
import Uploader from "./uploader";
import Logo from "./logo";
import Backgroundimage from "./backgroundimage";
import Artistimages from "./artistimages";
import Collaborations from "./collaborations";
import Displaycollaborations from "./displaycollaborations";
import Links from "./links";
import Artistinfo from "./artistinfo";
import FindArt from "./findart";

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
            music: [],
            artwork: [],
            imageUrl: undefined,
            error: false,
            uploaderIsVisible: false,
            bio: "",
            links: undefined,
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
                console.log("data.rows APP", data.rows[0]);
                this.setState(
                    {
                        first: data.rows[0].first,
                        last: data.rows[0].last,
                        imageUrl: data.rows[0].imageurl,
                        bio: data.rows[0].bio,
                        links: data.rows[0].links,

                        userId: data.rows[0].id,
                    },
                    () => console.log("state in app js", this.state)
                );
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
                console.log("ARTWORK in APP", artwork);
                this.setState({
                    artwork: artwork,
                });
            })
            .catch((err) => {
                console.log("error in axios upload APP", err);
            });
        axios
            .get("/music")
            .then(({ data }) => {
                var music = [];
                for (var i = 0; i < data.rows.length; i++) {
                    console.log("data.rows[i]MUSIC", data.rows[i]);
                    music.push(data.rows[i].file);
                }

                console.log("data.rows in artwork", data.rows);
                console.log("MUSIC in APP", music);
                this.setState({
                    music: music,
                });
            })
            .catch((err) => {
                console.log("error in axios upload APP", err);
            });
        axios
            .get("/collaborations/:id")
            .then(({ data }) => {
                var collaborations = [];
                for (var i = 0; i < data.rows.length; i++) {
                    console.log("data.rows[i]collaborations", data.rows[i]);
                    collaborations.push(data.rows[i].file);
                }

                console.log("data.rows in collaboration", data.rows);
                this.setState({
                    collaborations: collaborations,
                });
            })
            .catch((err) => {
                console.log("error in axios get collab", err);
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
    linksInApp(links) {
        this.setState({
            links: links,
        });
    }
    render() {
        return (
            <BrowserRouter>
                <Link to="/findart" id="stalkpeople">
                    <div id="newlinkto">
                        <img
                            src="object3.png"
                            width="100px"
                            height="100px"
                            className="object"
                        />
                        <div className="linktext"> ART</div>{" "}
                    </div>
                </Link>
                <Link to="/findmusic" id="findmusicians">
                    <div id="newlinkto">
                        <img
                            src="object6.png"
                            width="100px"
                            height="100px"
                            className="object"
                        />
                        <div className="linktext"> MUSIC</div>{" "}
                    </div>
                </Link>
                <Link to="/friends" id="friendsandwannabes">
                    <div id="newlinkto">
                        <img
                            src="object2.png"
                            width="100px"
                            height="100px"
                            className="object"
                        />
                        <div className="linktext"> COLLABORATORS</div>{" "}
                    </div>
                </Link>

                <Link to="/" id="yourprofile">
                    <div id="newlinkto">
                        <img
                            src="object1.png"
                            width="100px"
                            height="100px"
                            className="object"
                        />
                        <div className="linktext"> PROFILE</div>
                    </div>
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
                                music={this.state.music}
                                collaborations={this.state.collaborations}
                                bio={this.state.bio}
                                bioInApp={(bio) => this.bioInApp(bio)}
                                links={this.state.links}
                                linksInApp={(links) => this.linksInApp(links)}
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
                    <Route
                        path="/findart"
                        render={(props) => (
                            <FindArt
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
                            userId={this.state.userId}
                        />
                    )}
                />
                <div id="line2">
                    <img src="newhorizons4.png"></img>
                </div>
                <Logo />
                <footer>
                    <Backgroundimage />
                </footer>

                <Route
                    path="/collaborations/:id"
                    render={(props) => (
                        <Displaycollaborations
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

/*
                   
                */
