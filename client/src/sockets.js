import { mostRecentPrivateMessages, newPrivateMessage } from "./actions";
import { io } from "socket.io-client";
export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();
        socket.on("sending back to client", (data) => {
            console.log("sending back to socket.js", data);
        });

        socket.on("privateMessages", (msgs) =>
            store.dispatch(mostRecentPrivateMessages(msgs))
        );

        socket.on("privateMessage", (msg) => {
            console.log("message in SOCKETJS", msg);
            store.dispatch(newPrivateMessage(msg));
        });
        //whenever chatMessage or Messages gets emitted we run the chatMessage/Messages function . store.dispatch is dispatching an action, like an onClick
    }
};
