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
import {loginState} from "./helper/types";

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
   })

    return login.loading ? (
        <div className="spinner-border text-success" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    ) : (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
            </Switch>
        </Router>
    );
}





export default App;
