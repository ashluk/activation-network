import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Artistormusician from "./artistormusician";
import Artistregistration from "./artistregistration";
import Login from "./login";
import Reset from "./reset";
import Logo from "./logo";
import Featuredartwork from "./featuredartwork";
//import Featuredartwork from "./featuredartwork";
import Backgroundwelcome from "./backgroundwelcome";

export default function Welcome() {
    return (
        <div>
            <div id="line">
                <img src="https://static.tumblr.com/rzpvsia/0fan3j19h/site_horizon.png"></img>
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
                    <div id="resetforms">
                        <Route path="/reset" component={Reset} />
                    </div>
                </div>
                <Featuredartwork />
            </HashRouter>

            <div id="logoinwelcome">
                <Logo />
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
