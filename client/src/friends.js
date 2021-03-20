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
    const wannabe = useSelector(
        (state) =>
            state.friendData &&
            state.friendData.filter((wannabe) => wannabe.accepted == false)
    );
    useEffect(() => {
        !user && dispatch(getFriends());
    }, []);

    if (!friend && !wannabe) {
        return null;
    }

    return (
        <div id="friends-and-wannabes">
            {friend[0] ? (
                <div className="friend">
                    <img src={friend[0].imageUrl} />
                </div>
            ) : (
                "Everybody is already hot or not"
            )}
            {wannabe[0] ? (
                <div className="wannabe">
                    <img src={wannabe[0].imageUrl} />
                </div>
            ) : (
                "Everybody is already hot or not"
            )}
            <button onClick={() => dispatch(unFriend(friend.id))}>
                DELETE
            </button>
            <button onClick={() => dispatch(acceptFriend(wannabe.id))}>
                ACCEPT
            </button>

            <nav>
                <Link to="/hot">See who&apos;s hot</Link>
                <Link to="/not">See who&apos;s not</Link>
            </nav>
        </div>
    );
}
