import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default function About() {
    return (
        <div id="about">
            <div id="abouttext">
                <img
                    className="theconcept"
                    src="theconcept.png"
                    alt="theconcept"
                />
            </div>
            <div id="dreamtext">
                <img
                    className="dreamcollab"
                    src="dreamcollab1.png"
                    alt="dreamcollab"
                />
            </div>
            <div id="work">
                <img className="work" src="dreamcollabwork.png" alt="work" />
            </div>
        </div>
    );
}
