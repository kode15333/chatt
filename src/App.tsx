import React, {Component, createElement, useEffect, useState} from "react";
import {
    Route,
    BrowserRouter as Router,
    Switch,
    Redirect,
} from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import { auth } from "./services/firebase";
import {loginState} from "./helper/types";
import { RouteProps} from "react-router";


interface PublicRouteProps extends RouteProps  {
    authenticated: boolean;
}

const PublicRoute = (props: PublicRouteProps) => {
    let { component: Component, authenticated, ...rest } = props;
    return (
        <Route
            {...rest}
            render={(props) => {
                return authenticated ? Component && <Component {...props}/> : <Redirect to="/chat" />;
            }}
        />
    );
};


const App = () => {
    const [login, setLogin] = useState<loginState>({
        authenticated : false,
        loading: true
    });

    useEffect(() => {
        auth().onAuthStateChanged(user => {
            if (user) {
                setLogin({
                    ...login,
                    authenticated : true,
                    loading: false
                })
            } else {
                setLogin({
                    ...login,
                    authenticated : false,
                    loading: false
                })
            }
        });
   }, [])
    return login.loading ? (
        <div className="spinner-border text-success" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    ) : (
    <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <PublicRoute
                    path="/signup"
                    authenticated={login.authenticated}
                    component={Signup}
                />
            </Switch>
        </Router>
    );
}





export default App;
