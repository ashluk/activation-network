//import Registration from "./registration";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./app";

let elem;
const userLoggedIn = location.pathname != "/welcome";

/*if (location.pathname === "/welcome") {
    elem = <Welcome />;
} else {
    elem = <p>my main page of website</p>;
}*/
if (userLoggedIn) {
    elem = <App />;
} else {
    elem = <Welcome />;
}

//ReactDOM.render(<Registration />, document.querySelector("main"));
ReactDOM.render(elem, document.querySelector("main"));
