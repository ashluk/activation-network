//here we export all our action creator functions...

//action creator is just a function that returns an object.

//the object that gets returned is the action
export function fn() {
    return {
        type: "UPDATE_STATE_SOMEHOW",
        data: 1,
        //data is sometimes referred to as the payload -- we send along some data here
    };
}

//for part 9 we will need 3 action creator functions.....
