import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";
import MainNavBar from "./components/MainNavBar";
import Home from "./components/pages/Home";
import { history } from "./history";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// import React from "react";
// import ReactDOM from "react-dom";
// import { Router, Route, browserHistory } from "react-router";
// import App from "./components/App";
// import Home from "./components/Home";

// ReactDOM.render(
//   <Router history={browserHistory}>
//     <Route path="/" exact component={App} />
//     <Route path="/home" component={Home} />
//   </Router>,
//   document.getElementById("root"),
// );

// {
//   "name": "GoMore_frontend",
//   "version": "0.1.0",
//   "dependencies": {
//     "axios": "^0.15.3",
//     "react": "^15.4.2",
//     "react-bootstrap": "^0.30.7",
//     "react-dom": "^15.4.2",
//     "react-router": "^3.0.2",
//     "react-scripts": "0.9.0"
//   },
//   "scripts": {
//     "start": "react-scripts start",
//     "build": "react-scripts build",
//     "test": "react-scripts test --env=jsdom",
//     "eject": "react-scripts eject"
//   }
// }
