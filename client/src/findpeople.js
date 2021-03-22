import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function FindPeople() {
    const [searchTerm, setSearchTerm] = useState();
    const [resultUsers, setResultUsers] = useState();
    console.log("searchterm current", searchTerm);

    useEffect(
        function () {
            if (searchTerm === undefined) {
                axios.get("/users/most-recent").then(({ data }) => {
                    setResultUsers(data.mostRecent);
                    //console.log("setresult", data.mostRecent);
                });
            } else {
                axios.get("/users/" + searchTerm).then(({ data }) => {
                    setResultUsers(data.resultUsers);
                });
            }
        },
        [searchTerm]
    );

    return (
        <>
            <div id="find-people">
                <input
                    defaultValue={searchTerm}
                    onChange={({ target }) => setSearchTerm(target.value)}
                />
                {resultUsers &&
                    resultUsers.map(function (user) {
                        return (
                            <div key={user.id}>
                                <Link to={`/user/${user.id}`}>
                                    <img
                                        src={user.imageurl}
                                        id="findimage"
                                        width="200"
                                        height="200"
                                    />
                                </Link>
                                {user.first} {user.last}
                            </div>
                        );
                    })}
            </div>
        </>
    );
}
