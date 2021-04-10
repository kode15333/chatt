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

export interface SnapShotArr extends firebase.database.DataSnapshot{
    content: any;
    uid: any;
    timestamp: number;
}

export interface ChatInfo {
    user: firebase.User | null;
    chats: SnapShotArr[];
    content: string;
    readError: string | null;
    writeError: string | null;
    loadingChats: boolean;
}
