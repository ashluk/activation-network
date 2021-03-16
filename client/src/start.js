//import Registration from "./registration";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./app";

/////////this is how we would import hooks
/*import {useStatefulFields} from "./hooks/useStatefulFields";
const [values, handleChange] = useStatefulFields();*/

let elem;
const userLoggedIn = location.pathname != "/welcome";

if (userLoggedIn) {
    elem = <App />;
} else {
    elem = <Welcome />;
}

//ReactDOM.render(<Registration />, document.querySelector("main"));
ReactDOM.render(elem, document.querySelector("main"));
