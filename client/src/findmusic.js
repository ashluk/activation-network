import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function FindMusic() {
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
            <div id="find-people">
                <select
                    name="tags"
                    onChange={({ target }) => setSearchTerm(target.value)}
                >
                    <option value="select">select</option>

                    <option value="breakbeat">breakbeat</option>
                    <option value="vocal">vocal</option>
                    <option value="hardcore">hardcore</option>
                    <option value="newbeat">newbeat</option>
                    <option value="doom">doom</option>
                    <option value="house">house</option>

                    <option value="metal">metal</option>
                    <option value="industrial">industrial</option>
                    <option value="ambient">ambient</option>
                    <option value="jungle">jungle</option>
                    <option value="techno">techno</option>
                </select>

                <input type="hidden" name="_csrf" value="{{csrfToken}}" />

                {resultUsers &&
                    resultUsers.map(function (user) {
                        return (
                            <div key={user.id} id="find-music">
                                <Link to={`/user/${user.artist_id}`}>
                                    {user.title}
                                    <audio controls>
                                        <source
                                            src={user.file}
                                            name={user.title}
                                            type="audio/mpeg"
                                        ></source>
                                    </audio>
                                </Link>
                                <div id="findtext">
                                    {" "}
                                    {user.first} {user.last}
                                </div>
                            </div>
                        );
                    })}
            </div>
        </>
    );
}
/*
 <img
                                        src={user.file}
                                        id="findimage"
                                        width="200"
                                        height="200"
                                    />
                                    */
