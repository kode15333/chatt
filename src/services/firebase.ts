import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
const apiKey = process.env.REACT_APP_API_KEY;

const config = {
    apiKey,
    authDomain: "pushapi-4df3b.firebaseapp.com",
    databaseURL: "https://pushapi-4df3b.firebaseio.com",
};
firebase.initializeApp(config);
export const auth = firebase.auth;
export const db = firebase.database();
