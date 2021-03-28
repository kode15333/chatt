import React, {Component, ReactNode, useEffect, useState} from "react";
import {
    Route,
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { auth } from "./services/firebase";

interface PrivateProps {
    path?: string;
    component?: ReactNode;
    authenticated?: boolean;
}

function PrivateRoute({ component: Component, authenticated, ...rest } : PrivateProps) {
    return (
        <Route
            {...rest}
            render={props =>
                authenticated === true ? (
                    // <Component {...props} />
                    <Home/>
                ) : (
                    <Redirect
                        to={{ pathname: "/login", state: { from: props.location } }}
                    />
                )
            }
        />
    );
}

function PublicRoute({ component: Component, authenticated, ...rest } : PrivateProps) {
    return (
        <Route
            {...rest}
            render={props =>
                authenticated === false ? (
                    // <Component  />
                    <Home/>
                ) : (
                    <Redirect to="/chat" />
                )
            }
        />
    );
}

const App = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        auth().onAuthStateChanged(user => {
            if (user) {
                setAuthenticated(true);
                setLoading(false);
            } else {
                setAuthenticated(false);
                setLoading(false);
            }
        });
    })

    return loading ? (
        <div className="spinner-border text-success" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    ) : (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <PrivateRoute
                    path="/chat"
                    authenticated={authenticated}
                    component={Chat}
                />
                <PublicRoute
                    path="/signup"
                    authenticated={authenticated}
                    component={Signup}
                />
                <PublicRoute
                    path="/login"
                    authenticated={authenticated}
                    component={Login}
                />
            </Switch>
        </Router>
    );
}





export default App;
