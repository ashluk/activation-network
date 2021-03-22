//import { chatMessages, chatMessage } from "./actions";
import { io } from "socket.io-client";
export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();
        socket.on("sending back to client", (data) => {
            console.log("sending back to socket.js", data);
        });
        // socket.on("chatMessages", (msgs) => store.dispatch(chatMessages(msgs)));

        //   socket.on("chatMessage", (msg) => store.dispatch(chatMessage(msg)));
        //whenever chatMessage or Messages gets emitted we run the chatMessage/Messages function . store.dispatch is dispatching an action, like an onClick
    }
};
