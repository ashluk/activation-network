import { useState, useEffect } from "react";
import axios from "./axios";
import OtherProfile from "./otherprofile";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Collaborations from "./collaborations";

export default function Displaycollaborations(props) {
    var [newCollaborations, setNewCollaborations] = useState([]);
    var [currentUser, setCurrentUser] = useState([]);
    var [otherUser, setOtherUser] = useState([]);
    var collaborations = props.collaborations;
    console.log("props in displaycollaborations", props.match.params);

    useEffect(
        function () {
            if (collaborations) {
                setNewCollaborations(collaborations);
            }
        },
        [collaborations]
    );

    useEffect(function () {
        axios
            .get(`/collaborations/${props.match.params.id}.json`)
            .then(({ data }) => {
                setNewCollaborations(data.rows);
                console.log("CurrentUser in displaycollab", data.rows);
            });
    }, []);
    console.log("NEW COLLAB", newCollaborations);

    return (
        <div id="display-collaborations">
            {newCollaborations &&
                newCollaborations.map(function (user) {
                    return (
                        <div key={user.id} id="display-video">
                            <h1>{user.title}</h1>
                            <p>{user.description}</p>
                            <Link to={`/user/${user.userId}`}>
                                <video
                                    width="400"
                                    height="400"
                                    loop
                                    autoPlay="autoplay"
                                >
                                    <source
                                        src={user.file}
                                        type="video/mp4"
                                    ></source>
                                </video>
                            </Link>
                            <OtherProfile
                                match={{
                                    params: { id: user.collaborator_id },
                                }}
                            />
                        </div>
                    );
                })}
        </div>
    );
}

/*
{newCollaborations.map(function (url, id) {
                                return (
                                    <video
                                        width="500"
                                        height="500"
                                        key={id}
                                        controls
                                    >
                                        <source
                                            src={url}
                                            type="video/mp4"
                                        ></source>
                                        ;
                                    </video>
                                );
                            })}
                            */
/*
  <Collaborations
                className="collaborations"
                otherUserId={props.match.params.id}
                handleCollaborationsInProfile={(url) =>
                    setNewCollaborations([...newCollaborations, url])
                } //this puts the url in state
                title={props.title}
            />
            */
