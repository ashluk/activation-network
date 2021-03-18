import { useState, useEffect } from "react";

export function FriendshipButton(props) {
    console.log("props in friendship", props);
    const [buttonText, setButtonText] = useState();
    axios
        .get(`/friendshipstatus`)

        .then(({ data }) => {
            console.log("what is data in axios friendshipStatus", data);

            this.setState({ otherUser: data[0] });
        })
        .catch((err) => {
            console.log("error in axios user:id", err);
        });
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
            <button>BUTTON TEXT!!</button>
        </div>
    );
}
