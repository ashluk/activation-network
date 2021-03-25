export default function Profilepic({
    first,
    last,
    imageUrl,
    bio,
    toggleUploader,
}) {
    //this is rendering a default image if there is no imageUrl provided
    imageUrl = imageUrl || "omni1.jpg"; //we need to add a default.png into the public folder

    return (
        <div id="pic-in-profilepic">
            <h1 className="profile-name">
                {first} {last}
            </h1>
            <img
                onClick={toggleUploader}
                className="profile-pic"
                src={imageUrl}
                // id="profilepic"
                alt={first}
                bio={bio}
                width="200"
                height="200"
            />
        </div>
    );
}
//we could also destructure at the top so we dont have to ender props.first and can just put {first}
// export default function Profilepic({first, last, imageUrl})
//add onclick to imageUrl to make uploader appear
