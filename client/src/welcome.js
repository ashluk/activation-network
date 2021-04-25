import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Artistormusician from "./artistormusician";
import Artistregistration from "./artistregistration";
import Login from "./login";
import Reset from "./reset";
import Logo from "./logo";
import Backgroundimage from "./backgroundimage";
import About from "./about";
import { Link } from "react-router-dom";

import Featuredartwork from "./featuredartwork";
import Backgroundwelcome from "./backgroundwelcome";
import Displaycollaborations from "./displaycollaborations";
import OtherProfile from "./otherprofile";

export default function Welcome() {
    return (
        <div>
            <div id="line">
                <img src="newhorizons4.png"></img>
            </div>

            <HashRouter>
                <div>
                    <Route exact path="/" component={Artistormusician} />

                    <Route
                        path="/artistregistration"
                        component={Artistregistration}
                    />
                    <Route path="/registration" component={Registration} />
                    <Route path="/login" component={Login} />
                    <Route path="/about" component={About} />

                    <Route
                        path="/collaborations/:id"
                        render={(props) => (
                            <Displaycollaborations
                                key={props.match.url}
                                match={props.match}
                                history={props.history}
                            />
                        )}
                    />

                    <Route
                        path="/user/:id"
                        render={(props) => (
                            <OtherProfile
                                key={props.match.url}
                                match={props.match}
                                history={props.history}
                            />
                        )}
                    />
                    <footer>
                        <Backgroundimage />
                    </footer>
                    <div id="resetforms">
                        <Route path="/reset" component={Reset} />
                    </div>
                </div>
            </HashRouter>

            <div id="logoinwelcome">
                <a href="/">
                    <Logo />
                </a>
            </div>
        </div>
    );
}
//            <Backgroundwelcome />
/*
 <Route
                        path="/featuredartwork"
                        component={Featuredartwork}
                    />
                    */
