import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function FindFriends() {
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
                axios.get("/findfriends/" + searchTerm).then(({ data }) => {
                    setResultUsers(data.resultUsers);
                });
            }
        },
        [searchTerm]
    );

    return (
        <>
            <div id="infotext">
                <img
                    className="searchby"
                    src="searchbyname.png"
                    alt="searchby"
                />
            </div>
            <div id="find-people">
                <input
                    defaultValue={searchTerm}
                    placeholder="looking for someone..."
                    onChange={({ target }) => setSearchTerm(target.value)}
                />
                <input type="hidden" name="_csrf" value="{{csrfToken}}" />

                {resultUsers &&
                    resultUsers.map(function (user) {
                        return (
                            <div key={user.id} id="found-friends">
                                <Link to={`/user/${user.id}`}>
                                    <img
                                        src={user.imageurl}
                                        id="findimage"
                                        width="300"
                                        height="300"
                                    />
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
