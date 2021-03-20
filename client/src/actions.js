//here we export all our action creator functions...
import axios from "axios";

//action creator is just a function that returns an object.

//the object that gets returned is the action
/*export function fn() {
    return {
        type: "UPDATE_STATE_SOMEHOW",
        data: 1,
        //data is sometimes referred to as the payload -- we send along some data here
    };
}*/
export async function getFriends() {
    const { data } = await axios.get("/getfriends");
    return {
        type: "RECEIVE_FRIENDS",
        friendData: data,
    };
}

export async function unFriend(userId) {
    const { data } = await axios.post(`/endfriendship/${userId}`);
    return {
        type: "DELETE_FRIEND",
        friendDelete: userId,
    };
}
export async function acceptFriend(userId) {
    const { data } = await axios.post(`/acceptrequest/${userId}`);
    return {
        type: "ACCEPT_FRIEND",
        acceptFriend: userId,
    };
}

//for part 9 we will need 3 action creator functions.....
