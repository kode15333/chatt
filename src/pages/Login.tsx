import React, {useState} from 'react';
import {Info} from "../helper/types";
import {signin, signInWithGitHub, signInWithGoogle} from "../helper/auth";
import { Link } from 'react-router-dom';

const Login = () => {
    const [loginInfo, setLogininfo] = useState<Info>({
        error: null,
        email: '',
        password: ''
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setLogininfo({
            ...loginInfo,
            [name]: value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLogininfo({
            ...loginInfo,
            error: ''
        })
        try {
            await signin(loginInfo.email, loginInfo.password);
        } catch (error) {
            setLogininfo({
                ...loginInfo,
                error: error.message
            })
        }
    }

    const googleSignIn = async () => {
        try {
            await signInWithGoogle();
        } catch (error) {
            setLogininfo({
                ...loginInfo,
                error: error.message
            })
        }
    }

    const githubSignIn = async () => {
        try {
            await signInWithGitHub();
        } catch (error) {
            setLogininfo({
                ...loginInfo,
                error: error.message
            })
        }
    }


    return (
        <div className="container">
            <form
                className="mt-5 py-5 px-5"
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <h1>
                    Login to
                    <Link className="title ml-2" to="/">
                        Chatty
                    </Link>
                </h1>
                <p className="lead">
                    Fill in the form below to login to your account.
                </p>
                <div className="form-group">
                    <input
                        className="form-control"
                        placeholder="Email"
                        name="email"
                        type="email"
                        onChange={handleChange}
                        value={loginInfo.email}
                    />
                </div>
                <div className="form-group">
                    <input
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        onChange={handleChange}
                        value={loginInfo.password}
                        type="password"
                    />
                </div>
                <div className="form-group">
                    {loginInfo.error ? (
                        <p className="text-danger">{loginInfo.error}</p>
                    ) : null}
                    <button className="btn btn-primary px-5" type="submit">Login</button>
                </div>
                <p>You can also log in with any of these services</p>
                <button className="btn btn-danger mr-2" type="button" onClick={googleSignIn}>
                    Sign in with Google
                </button>
                <button className="btn btn-secondary" type="button" onClick={githubSignIn}>
                    Sign in with GitHub
                </button>
                <hr/>
                <p>
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
