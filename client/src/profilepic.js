export default function Profilepic({ first, last, imageUrl, toggleUploader }) {
    //this is rendering a default image if there is no imageUrl provided
    imageUrl = imageUrl || "computercat.png"; //we need to add a default.png into the public folder
    /*console.log(
        "props being passed down from app (props is always an object)",
        props
    );*/

    return (
        <div>
            <h2>this is where the profile pic would go </h2>;
            <h1>
                my name is {first} {last}
            </h1>
            <img
                onClick={toggleUploader}
                className="profile-pic"
                src={imageUrl}
                id="profilepic"
                alt={first}
                width="200"
                height="200"
            />
        </div>
    );
}
//we could also destructure at the top so we dont have to ender props.first and can just put {first}
// export default function Profilepic({first, last, imageUrl})
//add onclick to imageUrl to make uploader appear
