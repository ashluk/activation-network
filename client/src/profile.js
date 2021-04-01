import Profilepic from "./profilepic";
import Bioeditor from "./bioeditor";
import Artistimages from "./artistimages";
import Musicupload from "./musicupload";
import Collaborations from "./collaborations";
import { useState, useEffect } from "react";
import axios from "./axios";

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
    useEffect(function () {
        axios.get(`/collaborations/${props.id}.json`).then(({ data }) => {
            setNewCollaborations(data.rows);
            console.log("CurrentUser in displaycollab", data.rows);
        });
    }, []);
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
            {newCollaborations &&
                newCollaborations.map(function (user) {
                    return (
                        <div key={user.id} id="display-video">
                            <Link to={`/user/${user.userId}`}>
                                <video
                                    width="500"
                                    height="500"
                                    loop
                                    autoPlay="autoplay"
                                >
                                    <source
                                        src={user.file}
                                        type="video/mp4"
                                    ></source>
                                </video>
                            </Link>
                            <a id="hidebutton" href="/login"></a>

                            <h3>{user.title}</h3>
                            <h6>{user.description}</h6>
                        </div>
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

 <Collaborations
                className="collaborations"
                handleCollaborationsInProfile={(url) =>
                    setNewCollaborations([...newCollaborations, url])
                } //this puts the url in state
                title={props.title}
            />
           
            */
