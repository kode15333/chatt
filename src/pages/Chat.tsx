import React, {useEffect, useRef, useState} from 'react';
import Header from "../components/Header";
import {ChatInfo, SnapShopType} from "../helper/types";
import {auth, db} from "../services/firebase";

const Chat = () => {
    const [chatInfo, setChatInfo] = useState<ChatInfo>({
        user: auth().currentUser,
        chats: [],
        content: '',
        readError: null,
        writeError: null,
        loadingChats: false
    })

    const myRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setChatInfo({
            ...chatInfo,
            readError: null,
            loadingChats: true
        })
        const chatArea = myRef.current;
        try {
            db.ref("chats").on("value", snapshot => {
                let chats :  any = [];
                snapshot.forEach((snap) => {
                    chats.push(snap.val());
                });
                chats.sort(function (a, b) { return a.timestamp - b.timestamp })
                chatArea && chatArea.scrollBy(0, chatArea.scrollHeight);
                setChatInfo({
                    ...chatInfo,
                    chats,
                    readError: null,
                    loadingChats: false
                })
            });
        } catch (error) {
            setChatInfo({
                ...chatInfo,
                readError: error.message,
                loadingChats: false
            })
        }
        return () => {

        };
    }, []);


    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setChatInfo({
            ...chatInfo,
            [name]: value
        })
    }
    return (
        <div>
            <Header/>

            <div className="chat-area" ref={myRef}>
                {/* loading indicator */}
                {chatInfo.loadingChats ? <div className="spinner-border text-success" role="status">
                    <span className="sr-only">Loading...</span>
                </div> : ""}
        </div>
    );
};

export default Chat;
