import Profilepic from "./profilepic";
import Bioeditor from "./bioeditor";

export default function Profile(props) {
    console.log("props in profile", props);
    return (
        <div id="profile-in-profile">
            <Profilepic
                className="profile-main"
                imageUrl={props.imageUrl}
                first={props.first}
                last={props.last}
                width="300"
                height="300"
            />
            <Bioeditor
                bio={props.bio}
                bioInApp={(bio) => props.bioInApp(bio)}
            />
        </div>
    );
}
//<Logout />
//                toggleUploader={() => props.toggleUploader()}
