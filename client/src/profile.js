import Profilepic from "./profilepic";
import Bioeditor from "./bioeditor";
import Artistimages from "./artistimages";
import Musicupload from "./musicupload";
import { useState, useEffect } from "react";

export default function Profile(props) {
    var [newImages, setNewImages] = useState([]);
    var [newMusic, setNewMusic] = useState([]);
    var artwork = props.artwork;
    var music = props.music;
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
                return <img src={url} key={id}></img>;
            })}
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
