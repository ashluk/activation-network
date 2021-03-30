import { useState, useEffect } from "react";
import axios from "./axios";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Collaborations from "./collaborations";

export default function Displaycollaborations(props) {
    var [newCollaborations, setNewCollaborations] = useState([]);
    var [currentUser, setCurrentUser] = useState([]);
    var [otherUser, setOtherUser] = useState([]);
    var collaborations = props.collaborations;
    console.log("props in displaycollaborations", this.props);
    useEffect(
        function () {
            if (collaborations) {
                setNewCollaborations(collaborations);
            }
        },
        [collaborations]
    );
    useEffect(
        function () {
            axios.get("/collaborations/" + currentUser).then(({ data }) => {
                setCurrentUser(data.currentUser);
                console.log("setResultUsers", data.currentUser);
            });
        },
        [currentUser]
    );

    return (
        <div id="display-collaborations">
            {newCollaborations.map(function (url, id) {
                return (
                    <video width="500" height="500" key={id} controls>
                        <source src={url} type="video/mp4"></source>;
                    </video>
                );
            })}
            <Collaborations
                className="collaborations"
                otherUserId={user.id}
                handleCollaborationsInProfile={(url) =>
                    setNewCollaborations([...newCollaborations, url])
                } //this puts the url in state
                title={props.title}
            />
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
