import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Featuredartwork() {
    const [searchTerm, setSearchTerm] = useState();
    const [resultUsers, setResultUsers] = useState();
    console.log("searchterm current", searchTerm);

    useEffect(
        function () {
            /* if (searchTerm === undefined) {
                axios.get("/users/most-recent").then(({ data }) => {
                    setResultUsers(data.mostRecent);
                    //console.log("setresult", data.mostRecent);
                });
            } else {
            }*/
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
                <h1>looking to collaborate?</h1>

                {resultUsers &&
                    resultUsers.map(function (user) {
                        return (
                            <div key={user.id} id="found-people">
                                <Link to={`/user/${user.artist_id}`}>
                                    {user.title}
                                    <video width="500" height="500" controls>
                                        <source
                                            src={user.file}
                                            type="video/mp4"
                                        ></source>
                                    </video>
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
