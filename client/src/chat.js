import { useEffect, useRef } from "react";
import { socket } from "./sockets";
import { useSelector } from "react-redux";

export default function Chat() {
    const chatMessages = useSelector((state) => state && state.chatMessages);
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
            elemRef.current.scrollTop - elemRef.current.clientHeight;
        elemRef.current.scrollTop = newScrollTop;
    }, []);

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
                <h1>Chat Room</h1>
                <div className="chat-container" ref={elemRef}>
                    <p>Chat Messages Will go here.........</p>
                    <p>Chat Messages Will go here.........</p>
                    <p>Chat Messages Will go here.........</p>
                    <p>Chat Messages Will go here.........</p>
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
