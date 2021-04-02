import { useEffect, useRef } from "react";
import { socket } from "./sockets";
import { useSelector } from "react-redux";

export default function Private(props) {
    /*const privateMessages = useSelector(
        (state) => state && state.mostRecentPrivateMessages
    );*/
    const incomingMessages = useSelector((state) => {
        console.log("state in PRIVATE", state);
        return (
            state.mostRecentPrivateMessages &&
            state.mostRecentPrivateMessages.filter((responseMessage) => {
                return (
                    (responseMessage.senderid == props.userId &&
                        responseMessage.recipient_id == props.otherUserId) ||
                    (responseMessage.senderid == props.otherUserId &&
                        responseMessage.recipient_id == props.userId)
                );
            })
            /* .sort((a, b) => {
                    return new Date(a.created_at) - new Date(b.created_at);
                })*/
        );
    });
    console.log("incomingMessages", incomingMessages);
    const elemRef = useRef();
    useEffect(() => {
        console.log("pm mounted");
        console.log("elemRef.current", elemRef.current);
        console.log("elemRef.current.scrollTop", elemRef.current.scrollTop);
        console.log(
            "elemRef.current.scrollHeight",
            elemRef.current.scrollHeight
        );
        console.log(
            "elemRef.current.currentHeight",
            elemRef.current.currentHeight
        );
        const newScrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
        elemRef.current.scrollTop = newScrollTop;
    }, [incomingMessages]);

    const keyCheck = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            console.log("e:", e.target.value);
            socket.emit("my amazing private message", [
                e.target.value,
                props.otherUserId,
            ]);
            e.target.value = "";
        }
    };
    return (
        <>
            <div id="private-message">
                <div className="chat-container" ref={elemRef}>
                    {incomingMessages &&
                        incomingMessages.map(function (user) {
                            return (
                                <div key={user.id}>
                                    <div id="chat-message">
                                        <div id="chat-name">
                                            {user.first} {user.last}
                                        </div>
                                        {user.message}
                                    </div>
                                    <div id="created-at">{user.created_at}</div>
                                </div>
                            );
                        })}
                </div>
                <textarea
                    placeholder="send a private message"
                    onKeyDown={keyCheck}
                ></textarea>
            </div>
        </>
    );
}
//overflow-y auto should add a scroll
