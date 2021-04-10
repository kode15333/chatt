import React, {Component, useEffect, useState} from "react";
import {BrowserRouter as Router, Redirect, Route, Switch,} from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import {auth} from "./services/firebase";
import {loginState} from "./helper/types";
import {RouteProps} from "react-router";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import './style.css'
interface CustomRouteProps extends RouteProps {
    authenticated: boolean;
}

const PrivateRoute = ({component: Component, authenticated, ...rest}: CustomRouteProps) => {
    return (
        <Route
            {...rest}
            render={props =>
                authenticated ? (
                    Component && <Component {...props}/>
                ) : (
                    <Redirect
                        to={{pathname: "/login", state: {from: props.location}}}
                    />
                )
            }/>
    )
}

const PublicRoute = ({component: Component, authenticated, ...rest}: CustomRouteProps) => {
    return (
        <Route
            {...rest}
            render={props =>
                !authenticated ? (
                    Component && <Component {...props}/>
                ) : <Redirect to="/chat"/>}
        />
    )
};


const App = () => {
    const [login, setLogin] = useState<loginState>({
        authenticated: false,
        loading: true
    });

    useEffect(() => {
        auth().onAuthStateChanged(user => {
            if (user) {
                setLogin({
                    ...login,
                    authenticated: true,
                    loading: false
                })
            } else {
                setLogin({
                    ...login,
                    authenticated: false,
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
                <Route exact path="/" component={Home}/>
                <PrivateRoute
                    path="/chat"
                    authenticated={login.authenticated}
                    component={Chat}
                />
                <PublicRoute
                    path="/signup"
                    authenticated={login.authenticated}
                    component={Signup}
                />
                <PublicRoute
                    path="/login"
                    authenticated={login.authenticated}
                    component={Login}
                />
            </Switch>
        </Router>
    );
}


export default App;
