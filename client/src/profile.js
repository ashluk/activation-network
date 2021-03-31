import Profilepic from "./profilepic";
import Bioeditor from "./bioeditor";
import Artistimages from "./artistimages";
import Musicupload from "./musicupload";
import Collaborations from "./collaborations";
import { useState, useEffect } from "react";

export default function Profile(props) {
    var [newImages, setNewImages] = useState([]);
    var [newMusic, setNewMusic] = useState([]);
    var [newCollaborations, setNewCollaborations] = useState([]);
    var collaborations = props.collaborations;
    var artwork = props.artwork;
    var music = props.music;
    console.log("what is in STATE", props);
    console.log("collaborations in state", collaborations);
    console.log("artwork in state", artwork);
    console.log("music in state", music);

    useEffect(
        function () {
            if (artwork) {
                setNewImages(artwork);
            }
        },
        [artwork]
    );
    useEffect(
        function () {
            if (music) {
                setNewMusic(music);
            }
        },
        [music]
    );
    useEffect(
        function () {
            if (collaborations) {
                setNewCollaborations(collaborations);
            }
        },
        [collaborations]
    );

    console.log("props in profile", props);
    return (
        <div id="profile-in-profile">
            <Profilepic
                className="profile-pic"
                imageUrl={props.imageUrl}
                first={props.first}
                last={props.last}
            />
            <Bioeditor
                bio={props.bio}
                bioInApp={(bio) => props.bioInApp(bio)}
            />

            {newImages.map(function (url, id) {
                return (
                    <video width="500" height="500" key={id} controls>
                        <source src={url} type="video/mp4"></source>;
                    </video>
                );
            })}

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
                handleMusicInProfile={(url) => setNewMusic([...newMusic, url])} //this puts the url in state
                title={props.title}
            />
        </div>
    );
}
//i want to pass artistimage a function for putting the imageurl into state
//profile needs state

//<Logout />
//                toggleUploader={() => props.toggleUploader()}

//<Artistimages className="artist-or-image" title={props.title} />
//
//            <Audioplayer urls={[newImages]} />;

/*

            */
/*
 {newImages.map(function (url, id) {
                return <img src={url} key={id}></img>;
            })}
            */
/*
{newCollaborations.map(function (url, id) {
                return (
                    <video width="500" height="500" key={id} controls>
                        <source src={url} type="video/mp4"></source>;
                    </video>
                );
            })}

            <Collaborations
                className="collaborations"
                handleCollaborationsInProfile={(url) =>
                    setNewCollaborations([...newCollaborations, url])
                } //this puts the url in state
                title={props.title}
            />
            */
