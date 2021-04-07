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

export type SnapShopType = (string | number | boolean)[]

export type Info = {
    error: string | null
    email: string;
    password: string;
};

export interface ChatInfo {
    user: firebase.User | null;
    chats: SnapShopType;
    content: string;
    readError: string | null;
    writeError: string | null;
    loadingChats: boolean;
}
