import { useEffect, useRef } from "react";
import { socket } from "./sockets";
import { useSelector } from "react-redux";

export default function Private() {
    const privateMessages = useSelector(
        (state) => state && state.mostRecentPrivateMessages
    );
    console.log("privateMessages", privateMessages);
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
    }, [privateMessages]);

    const keyCheck = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            console.log("e:", e.target.value);
            socket.emit("my amazing private message", e.target.value);
            e.target.value = "";
        }
    };
    return (
        <>
            <div id="private-message">
                <h1>private messages here</h1>
                <div className="chat-container" ref={elemRef}>
                    {privateMessages &&
                        privateMessages.map(function (user) {
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
                    placeholder="add your message here"
                    onKeyDown={keyCheck}
                ></textarea>
            </div>
        </>
    );
}
//overflow-y auto should add a scroll
