import React, {useEffect, useState} from "react";
import {
    Route,
    BrowserRouter as Router,
    Switch,
} from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
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
   }, [])
    return login.loading ? (
        <div className="spinner-border text-success" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    ) : (
    <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/signup" component={Signup} />
            </Switch>
        </Router>
    );
}





export default App;
