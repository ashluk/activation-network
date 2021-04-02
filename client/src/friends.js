import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFriends, unFriend, acceptFriend } from "./actions";
import Collaborations from "./collaborations";
import Private from "./privatemessage";

export default function Friends(props) {
    var [newCollaborations, setNewCollaborations] = useState([]);
    var collaborations = props.collaborations;
    var [newPrivateMessages, setNewPrivateMessages] = useState([]);
    var privatemessages = props.privatemessages;
    console.log("Props in friends component!!", props);
    const dispatch = useDispatch();
    const friend = useSelector(
        (state) =>
            state.friendData &&
            state.friendData.filter((friend) => friend.accepted == true)
    );
    console.log("what is friend in friend", friend);
    const wannabe = useSelector(
        (state) =>
            state.friendData &&
            state.friendData.filter((wannabe) => wannabe.accepted == false)
    );

    useEffect(() => {
        !friend && dispatch(getFriends());
    }, []);
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
            if (privatemessages) {
                setNewPrivateMessages(privatemessages);
            }
        },
        [privatemessages]
    );

    if (!friend && !wannabe) {
        return null;
    }
    console.log("what is wannabe in friend", wannabe);

    return (
        <div id="friends-and-wannabes">
            {friend &&
                friend.map(function (user) {
                    return (
                        <div id="friends-inside" key={user.id}>
                            <img
                                src={user.imageurl}
                                id="findimage"
                                width="200"
                                height="200"
                            />
                            {user.first} {user.last}
                            <button onClick={() => dispatch(unFriend(user.id))}>
                                UNFRIEND
                            </button>
                            <Collaborations
                                className="collaborations"
                                otherUserId={user.id}
                                handleCollaborationsInProfile={(url) =>
                                    setNewCollaborations([
                                        ...newCollaborations,
                                        url,
                                    ])
                                } //this puts the url in state
                                title={props.title}
                            />
                            <Private
                                otherUserId={user.id}
                                userId={props.userId}
                            />
                        </div>
                    );
                })}
            {wannabe &&
                wannabe.map(function (user) {
                    return (
                        <div key={user.id}>
                            <img
                                src={user.imageurl}
                                id="findimage"
                                width="200"
                                height="200"
                            />
                            <button
                                onClick={() => dispatch(acceptFriend(user.id))}
                            >
                                ACCEPT
                            </button>
                            {user.first} {user.last}
                        </div>
                    );
                })}
        </div>
    );
}
// <Link to="/hot">See who&apos;s hot</Link>
//    <Link to="/not">See who&apos;s not</Link>

/*

                            */
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
