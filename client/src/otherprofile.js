import { Component } from "react";
import axios from "./axios";
import { FriendshipButton } from "./hooks/friendshipButton";
import Artistimages from "./artistimages";
import Musicupload from "./musicupload";
import Collaborations from "./collaborations";

export default class OtherProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            otherUser: "",
            artwork: [],
            music: [],
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
        axios
            .get(`/artwork/${this.props.match.params.id}.json`)
            .then(({ data }) => {
                var artwork = [];
                for (var i = 0; i < data.rows.length; i++) {
                    //console.log("data.rows[i]OTHER", data.rows[i].file);
                    artwork.push(data.rows[i].file);
                }

                this.setState({
                    artwork: artwork,
                });
                console.log("artwork INOTHERPROFILE", artwork);
            })
            .catch((err) => {
                console.log("error in axios upload art", err);
            });
        axios
            .get(`/music/${this.props.match.params.id}.json`)
            .then(({ data }) => {
                var music = [];
                for (var i = 0; i < data.rows.length; i++) {
                    console.log("data.rows[i]musixOTHER PROFILE", data.rows[i]);
                    music.push(data.rows[i].file);
                }

                this.setState({
                    music: music,
                });
            })
            .catch((err) => {
                console.log("error in axios upload music", err);
            });
    }
    render() {
        return (
            <div id="other-profile">
                <h1>
                    {this.state.otherUser.first} {this.state.otherUser.last}
                </h1>
                <img
                    className="profile-pic"
                    src={this.state.otherUser.imageurl}
                    id="profilepic"
                    alt={this.state.otherUser.first}
                    width="350"
                    height="350"
                />
                <h2>{this.state.otherUser.bio}</h2>

                {this.state.artwork &&
                    this.state.artwork.map(function (artwork) {
                        return (
                            // eslint-disable-next-line react/jsx-key
                            <video width="500" height="500" controls>
                                <source src={artwork} type="video/mp4"></source>
                            </video>
                        );
                    })}
                {this.state.music &&
                    this.state.music.map(function (music) {
                        return (
                            // eslint-disable-next-line react/jsx-key
                            <audio controls>
                                <source src={music} type="audio/mpeg"></source>
                            </audio>
                        );
                    })}
                <FriendshipButton otherUserId={this.props.match.params.id} />
            </div>
        );
    }
}
//otherUserId - {this.props.match.params.id} creates a property that i am passing down to friendshipbutton
/*
  <Artistimages
                    className="artworkimage"
                    handleImageInProfile={(url) =>
                        setNewImages([...newImages, url])
                    } //this puts the url in state
                    title={props.title}
                />
                {newMusic.map(function (url, id) {
                    return (
                        <audio controls key={id}>
                            <source src={url} type="audio/mpeg"></source>
                        </audio>
                    );
                })}
                <Musicupload
                    className="audio"
                    handleMusicInProfile={(url) =>
                        setNewMusic([...newMusic, url])
                    } //this puts the url in state
                    title={props.title}
                />
                */
/*
<video width="500" height="500" controls>
                    <source src={this.state.artwork} type="video/mp4"></source>
                </video>
                */
/*
{this.state.artwork.map(function (artwork, id) {
                    return (
                        <video width="500" height="500" key={id} controls>
                            <source src={artwork} type="video/mp4"></source>;
                        </video>
                    );
                })}
                */
