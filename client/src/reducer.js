//reducer is just a function
//takes two arguments -- the current state and an action

//state={} is setting a default argument. if we call the function if state is undefined then we set the value to an empty object. This will only happen the first time since otherwise state will not be undefined

export default function reducer(state = {}, action) {
    //series of IF statements...
    if (action.type == "RECEIVE_FRIENDS") {
        state = {
            ...state,
            friendData: action.friendData,
        };
        //update state here
    } else if (action.type == "DELETE_FRIEND") {
        state = {
            ...state,
            friendData: state.friendData.filter(
                (friendData) => friendData.id != action.friendDelete
            ),
        };
    } else if (action.type == "ACCEPT_FRIEND") {
        state = {
            ...state,
            friendData: state.friendData.map((friendData) => {
                if (friendData.id == action.acceptFriend) {
                    return { ...friendData, accepted: true };
                } else {
                    return friendData;
                }
            }),
        };
    }
    /////////////CHAT///////////////////////
    if (action.type == "ADD_MESSAGES") {
        state = {
            ...state,
            mostRecentMessages: action.mostRecentMessages,
        };
        //update state here
    } else if (action.type == "ADD_MESSAGE") {
        state = {
            ...state,
            mostRecentMessages: [
                ...state.mostRecentMessages,
                action.newMessage,
            ],
            //A conditional for the action with individual new messages. For this action, the reducer should return a new object that has all the same properties as the old state object except the array of chat messages is replaced with a new array that has in it all the same objects as the old chat messages array plus one more at the end
        };
    }
    ///////////////////////PRIVATE MESSAGES////////////////////
    if (action.type == "ADD_PRIVATEMESSAGES") {
        state = {
            ...state,
            mostRecentPrivateMessages: action.mostRecentPrivateMessages,
        };
    }
    if (action.type == "ADD_PRIVATEMESSAGE") {
        state = {
            ...state,
            mostRecentPrivateMessages: [
                ...state.mostRecentPrivateMessages,
                action.newPrivateMessage,
            ],
            //A conditional for the action with individual new messages. For this action, the reducer should return a new object that has all the same properties as the old state object except the array of chat messages is replaced with a new array that has in it all the same objects as the old chat messages array plus one more at the end
        };
        //update state here
    }
    return state;
}

//we need multiple IF statments -- examples below
//IF action.type === unfriend -- change state
//IF action.type === friends and wannabees --- change stat
//last thing we do is return state

//it is REALLY important to not MUTATE state. this means we will need to CLONE
//useful methods for this are filter and map.

//filter -  if we want to get rid of something from an array
//map - always returns a new array of the same length
