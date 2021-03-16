///replacing submit function
import axios from "axios";
import { useState } from "react";
/////////WE NEED TO USE REQUIRE OUT OWN AXIOS BECAUSE OF CSRF (LOOK INTO HOW TO DO THIS)
export function useAuthSubmit(url, values) {
    const [error, setError] = useState();
    //to set an error we need to use state
    const handleSubmit = (e) => {
        e.preventDefault();
        //this is preventing the auto reload
        axios
            .post(url, vals)
            .then(({ data }) => {
                data.success ? location.replace("/") : setError(true);
            })
            .catch((err) => {
                console.log("error in axios post", err);
            });
    };
    //because handle submit is a button that need a click event we have to have the (e)
}

///we need to import these hooks in the files we need them like this
/*import {useAuthSubmit} from './hooks/useAuthSubmit';

const  [error, handleSubmit] = useAuthSubmit('./login', values)*/
