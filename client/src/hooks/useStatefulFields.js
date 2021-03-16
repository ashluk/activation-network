import { useState } from "react";

export function useStatefulFields() {
    const [values, setValues] = useState({});
    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
        console.log("from use stateful fields updated");
    };
    return [values, handleChange];
}
