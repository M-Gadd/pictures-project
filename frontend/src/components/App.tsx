import React from "react";
import { Switch, Route } from "react-router-dom";
import MainNavBar from "./MainNavBar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Users from "./pages/Users";
import User from "./pages/User";
import MyUploads from "./pages/MyUploads";
import AllStreetArt from "./pages/AllStreetArt";

export interface AppProps {}

const App: React.SFC<AppProps> = () => {
  return (
    <div>
      <MainNavBar />
      <h2 style={{ color: "white" }}>Hello from whatever branch</h2>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />/{/*  */}
        <Route path="/streetart" component={MyUploads} />
        <Route path="/streetarts" component={AllStreetArt} />
        <Route path="/users" component={Users} />
        <Route path="/user" component={User} />
        {/* <Route render={() => <h2>404</h2>} /> */}
      </Switch>
    </div>
  );
};

export default App;

// /* tslint:disable */
// {/* @ts-ignore */}
