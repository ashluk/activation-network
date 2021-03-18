//import Registration from "./registration";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./app";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";

import reducer from "./reducer";

//store created here with two arguments, first is reducer, second is the requirement from devtools which is wrapped in the compose with dev tools
const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

/////////this is how we would import hooks
/*import {useStatefulFields} from "./hooks/useStatefulFields";
const [values, handleChange] = useStatefulFields();*/

let elem;
const userLoggedIn = location.pathname != "/welcome";

if (userLoggedIn) {
    elem = (
        //provider is a component
        //we are creating a prop called store with the value of store
        <Provider store={store}>
            <App />;
        </Provider>
    );
} else {
    elem = <Welcome />;
}

//ReactDOM.render(<Registration />, document.querySelector("main"));
ReactDOM.render(elem, document.querySelector("main"));
