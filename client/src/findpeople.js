import axios from "axios";
import { useState, useEffect } from "react";

export default function FindPeople() {
    const [searchTerm, setSearchTerm] = useState();
    const [resultUsers, setResultUsers] = useState();
    useEffect(function () {
        axios.get("/users/most-recent").then(({ data }) => {
            setResultUsers(data.users);
        });
    }, []);
    useEffect(
        function () {
            axios.get("/user/" + searchTerm).then(({ data }) => {
                setResultUsers(data.users);
            });
        },
        [searchTerm]
    );
    return (
        <>
            {resultUsers &&
                resultUsers.map(function (user) {
                    return <div key={user.id}>{user.first}</div>;
                })}
            <input
                defaultValue={searchTerm}
                onChange={({ target }) => setSearchTerm(target.value)}
            />
        </>
    );
}
