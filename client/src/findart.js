import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function FindArt() {
    const [searchTerm, setSearchTerm] = useState();
    const [resultUsers, setResultUsers] = useState();
    console.log("searchterm current", searchTerm);

    useEffect(
        function () {
            axios.get("/users/" + searchTerm).then(({ data }) => {
                setResultUsers(data.resultUsers);
                console.log("setResultUsers", data.resultUsers);
            });
        },
        [searchTerm]
    );
    /* <input
                    defaultValue={searchTerm}
                    placeholder="looking for someone..."
                    onChange={({ target }) => setSearchTerm(target.value)}
                />*/
    return (
        <>
            <div id="infotext">
                <img
                    className="artistcollab"
                    src="artistcollab.png"
                    alt="artistcollab"
                />
            </div>
            <div id="find-people">
                <select
                    name="tags"
                    onChange={({ target }) => setSearchTerm(target.value)}
                >
                    <option value="select">select</option>

                    <option value="3d">3d</option>
                    <option value="vhs">vhs</option>
                    <option value="cyberpunk">cyberpunk</option>

                    <option value="animation">animation</option>
                    <option value="drawing">drawing</option>
                    <option value="gan">gan</option>
                    <option value="fashion">fashion</option>
                    <option value="responsive">responsive</option>
                </select>

                <input type="hidden" name="_csrf" value="{{csrfToken}}" />

                {resultUsers &&
                    resultUsers.map(function (user) {
                        return (
                            <div key={user.id} id="found-people">
                                <Link to={`/user/${user.artist_id}`}>
                                    {user.title}
                                    <video
                                        width="500"
                                        height="500"
                                        loop
                                        autoPlay="autoplay"
                                        muted
                                    >
                                        <source
                                            src={user.file}
                                            type="video/mp4"
                                        ></source>
                                        ;
                                    </video>
                                </Link>

                                <div id="findtext">
                                    {user.first} {user.last}
                                </div>
                            </div>
                        );
                    })}
            </div>
        </>
    );
}
