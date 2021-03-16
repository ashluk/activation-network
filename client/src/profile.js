import Profilepic from "./profilepic";
import Bioeditor from "./bioeditor";

export default function Profile(props) {
    console.log("props in profile", props);
    return (
        <div>
            <Profilepic
                imageUrl={props.imageUrl}
                first={props.first}
                toggleUploader={() => props.toggleUploader()}
            />
            <Bioeditor
                bioInApp={(bio) => props.bioInApp(bio)}
                bio={props.bio}
            />
            <button>LOGOUT</button>
        </div>
    );
}
