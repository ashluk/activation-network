//reducer is just a function
//takes two arguments -- the current state and an action

//state={} is setting a default argument. if we call the function if state is undefined then we set the value to an empty object. This will only happen the first time since otherwise state will not be undefined

export default function reducer(state = {}, action) {
    //series of IF statements...
    if (action.type === "UPDATE_STATE_SOMEHOW") {
        //update state here
    }
    //we need multiple IF statments -- examples below
    //IF action.type === unfriend -- change state
    //IF action.type === friends and wannabees --- change stat
    //last thing we do is return state
    return state;
}

//it is REALLY important to not MUTATE state. this means we will need to CLONE
//useful methods for this are filter and map.

//filter -  if we want to get rid of something from an array
//map - always returns a new array of the same length
