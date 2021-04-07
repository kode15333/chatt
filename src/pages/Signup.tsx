import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {Info} from "../helper/types";
import {signInWithGitHub, signInWithGoogle, signup} from '../helper/auth'

const SignUp = () => {


    const [signUpInfo, setSignUpInfo] = useState<Info>({
        error: null,
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setSignUpInfo({
            ...signUpInfo,
            [name]: value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSignUpInfo({
            ...signUpInfo,
            error: '',
        })
        try {
            await signup(signUpInfo.email, signUpInfo.password);
        } catch (error) {
            setSignUpInfo({
                ...signUpInfo,
                error: error.message,
            })
        }
    }


    const googleSignIn = async () => {
        try {
            await signInWithGoogle();
        } catch (error) {
            setSignUpInfo({
                ...signUpInfo,
                error: error.message,
            })
        }
    }

    const githubSignIn = async () => {
        try {
            await signInWithGitHub();
        } catch (error) {
            console.log(error)
            setSignUpInfo({
                ...signUpInfo,
                error: error.message,
            })
        }
    }

    return (
        <div className="container">
            <form className="mt-5 py-5 px-5" onSubmit={handleSubmit}>
                <h1>
                    Sign Up to
                    <Link className="title ml-2" to="/">Chatty</Link>
                </h1>
                <p className="lead">Fill in the form below to create an account.</p>
                <div className="form-group">
                    <input className="form-control" placeholder="Email" name="email" type="email"
                           onChange={handleChange} value={signUpInfo.email}/>
                </div>
                <div className="form-group">
                    <input className="form-control" placeholder="Password" name="password" onChange={handleChange}
                           value={signUpInfo.password} type="password"/>
                </div>
                <div className="form-group">
                    {signUpInfo.error ? <p className="text-danger">{signUpInfo.error}</p> : null}
                    <button className="btn btn-primary px-5" type="submit">Sign up</button>
                </div>
                <p>You can also sign up with any of these services</p>
                <button className="btn btn-danger mr-2" type="button" onClick={googleSignIn}>
                    Sign up with Google
                </button>
                <button className="btn btn-secondary" type="button" onClick={githubSignIn}>
                    Sign up with GitHub
                </button>
                <hr/>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </form>
        </div>
    );
};

export default SignUp;
