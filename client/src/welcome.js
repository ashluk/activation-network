import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Artistormusician from "./artistormusician";
import Artistregistration from "./artistregistration";
import Login from "./login";
import Reset from "./reset";
import Logo from "./logo";
import Backgroundwelcome from "./backgroundwelcome";

export default function Welcome() {
    return (
        <div>
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
            </HashRouter>

            <div id="logoinwelcome">
                <Logo />
            </div>
        </div>
    );
}
//            <Backgroundwelcome />
