import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFriends, unFriend, acceptFriend } from "./actions";

export default function Friends() {
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

    if (!friend && !wannabe) {
        return null;
    }
    console.log("what is wannabe in friend", wannabe);

    return (
        <div id="friends-and-wannabes">
            {friend &&
                friend.map(function (user) {
                    return (
                        <div key={user.id}>
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
