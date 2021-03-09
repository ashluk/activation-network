import React from "react";
import axios from "./axios";

export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
        };
    }
    render() {
        const { step } = this.state;
        if (step == 1) {
            return (
                <div>
                    <input name="email" />
                </div>
            );
        }
        if (step == 2) {
            return (
                <div>
                    <input name="code" />
                </div>
            );
        }
        if (step == 3) {
            return <div>it worked!!</div>;
        }
    }
}
