import React, {useState} from 'react';
import Header from "../components/Header";
import {ChatInfo} from "../helper/types";
import {auth} from "../services/firebase";

const Chat = () => {
    const [chatInfo, setChatInfo] = useState<ChatInfo>({
        user: auth().currentUser,
        chats: [],
        content: '',
        readError: null,
        writeError: null,
        loadingChats: false
    })
    return (
        <div>
        </div>
    );
};

export default Chat;
