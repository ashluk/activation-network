import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Featuredartwork() {
    const [searchTerm, setSearchTerm] = useState();
    const [featuredCollab, setFeaturedCollab] = useState();
    const [resultUsers, setResultUsers] = useState();
    console.log("searchterm current", searchTerm);

    useEffect(function () {
        /* if (searchTerm === undefined) {
                axios.get("/users/most-recent").then(({ data }) => {
                    setResultUsers(data.mostRecent);
                    //console.log("setresult", data.mostRecent);
                });
            } else {
            }*/
        axios.get("/featuredartwork").then(({ data }) => {
            setResultUsers(data.revrow);
            console.log("setResultUsers", data.revrow);
        });
    }, []);
    return (
        <>
            <div id="featured-collaborations">
                {resultUsers &&
                    resultUsers.map(function (user) {
                        return (
                            <div key={user.id} id="featured-video">
                                <Link to={`/collaborations/${user.id}`}>
                                    <video
                                        width="1000"
                                        height="1000"
                                        loop
                                        autoPlay="autoplay"
                                        muted
                                    >
                                        <source
                                            src={user.file}
                                            type="video/mp4"
                                        ></source>
                                    </video>
                                </Link>
                            </div>
                        );
                    })}
            </div>
        </>
    );
}
