import firebase from "firebase/app";

export interface loginState {
    authenticated: boolean;
    loading: boolean
}

export interface MessageInfo {
    content: string;
    timestamp: string;
    uid: string;
}

export type SnapShopType =  (string | number | boolean)[]

export type Info = {
    error: string | null
    email: string;
    password: string; };
