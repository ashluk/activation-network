import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Artistormusician from "./artistormusician";
import Artistregistration from "./artistregistration";
import Login from "./login";
import Reset from "./reset";
import Logo from "./logo";
import Featuredartwork from "./featuredartwork";
import Backgroundwelcome from "./backgroundwelcome";
import Displaycollaborations from "./displaycollaborations";

export default function Welcome() {
    return (
        <div>
            <div id="line">
                <img src="new_horizon.png"></img>
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

                    <Featuredartwork />

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
                    <div id="resetforms">
                        <Route path="/reset" component={Reset} />
                    </div>
                </div>
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
