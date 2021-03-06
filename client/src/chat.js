import { useEffect, useRef } from "react";
import { socket } from "./sockets";
import { useSelector } from "react-redux";

export default function Chat() {
    const chatMessages = useSelector(
        (state) => state && state.mostRecentMessages
    );
    console.log("chatMessages", chatMessages);
    const elemRef = useRef();
    useEffect(() => {
        console.log("chat mounted");
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
    }, [chatMessages]);

    const keyCheck = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            console.log("e:", e.target.value);
            socket.emit("my amazing chat message", e.target.value);
            e.target.value = "";
        }
    };
    return (
        <>
            <div id="chat-room">
                <h1>cowboy connect</h1>
                <div className="chat-container" ref={elemRef}>
                    {chatMessages &&
                        chatMessages.map(function (user) {
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
