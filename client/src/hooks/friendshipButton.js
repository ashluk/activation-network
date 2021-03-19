import { useState, useEffect } from "react";
import axios from "../axios";

export function FriendshipButton(props) {
    const [buttonText, setButtonText] = useState();
    // console.log("props in friendship", props);
    //console.log("button text", buttonText);

    useEffect(function () {
        axios
            .get(`/friendshipstatus/${props.otherUserId}`)
            .then(({ data }) => {
                console.log("what is data in axios friendshipStatus", data);
                setButtonText(data);
            })
            .catch((err) => {
                console.log("error in axios friendshipstatyus", err);
            });
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("i was clicked@@@@@@!!!!!");
        //this is preventing the auto reload
        if (buttonText === "REQUEST FRIENDSHIP") {
            axios
                .post(`/requestfriendship/${props.otherUserId}`)
                .then(({ data }) => {
                    console.log("data in requestfriendship AXIOS", data);

                    setButtonText("CANCEL REQUEST");
                })
                .catch((err) => {
                    console.log("error in requestfriendship post", err);
                });
        } else if (buttonText === "END FRIENDSHIP") {
            axios
                .post(`/endfriendship/${props.otherUserId}`)
                .then(({ data }) => {
                    setButtonText("REQUEST FRIENDSHIP");
                })
                .catch((err) => {
                    console.log("error in endfriendship post", err);
                });
        } else if (buttonText === "CANCEL REQUEST") {
            axios
                .post(`/cancelrequest/${props.otherUserId}`)
                .then(({ data }) => {
                    setButtonText("REQUEST FRIENDSHIP");
                })
                .catch((err) => {
                    console.log("error in cancelrequest post", err);
                });
        } else if (buttonText === "ACCEPT REQUEST") {
            axios
                .post(`/acceptrequest/${props.otherUserId}`)
                .then(({ data }) => {
                    setButtonText("END FRIENDSHIP");
                })
                .catch((err) => {
                    console.log("error in acceptrequest post", err);
                });
        }
    };

    //we want a useeffect that will act as componont did mount and we can do this by passing to use effect a second arg that is an empty array
    //our axios request will go inside of this.

    ///second data flow is what happens when we click on the button, this goes in handleclick

    /*will need to receive some props ;), cause props are great and we need to know whose 
    profile this button is being rendered on, the parent component otherUserProfile or 
    whatever you called it KNOWS which user is being viewed, we need to pass this info 
    to friendship button, so that friendship button can pass this info along to the server

    use a useEffect to figure out what is the relationship between the otherProfile we 
    are viewing and us the person looking at the profile
    based on that we'll set the button text upon the initial mount of the component

    on submit of button click we want to make a request to the server changing the users relationship*/

    return (
        <div>
            <button onClick={(e) => handleSubmit(e)}>
                {" "}
                {buttonText?.buttonText}{" "}
            </button>
        </div>
    );
}
//if button text render that if not blank
