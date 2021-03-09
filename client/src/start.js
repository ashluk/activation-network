//import Registration from "./registration";
import ReactDOM from "react-dom";
import Welcome from "./welcome";

let elem;

if (location.pathname === "/welcome") {
    elem = <Welcome />;
} else {
    elem = <p>my main page of website</p>;
}

//ReactDOM.render(<Registration />, document.querySelector("main"));
ReactDOM.render(elem, document.querySelector("main"));

/*function HelloWorld() {
    const name = "Ash";

    return (
        <div className="spiced">
            Hello,{name}! {20 * 40}
        </div>
    );
}*/
