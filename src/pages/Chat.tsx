import React, {useEffect, useRef, useState} from 'react';
import Header from "../components/Header";
import {ChatInfo, SnapShotArr} from "../helper/types";
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
                let chats: SnapShotArr[] = [];
                snapshot.forEach((snap) => {
                    chats.push(snap.val());
                });
                chats.sort((a, b) => a.timestamp - b.timestamp)
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
    }, []);


    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setChatInfo({
            ...chatInfo,
            [name]: value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setChatInfo({
            ...chatInfo,
            writeError: null
        })
        const chatArea = myRef.current;
        try {
            await db.ref('chats').push(
                {
                    content: chatInfo.content,
                    timestamp: Date.now(),
                    uid: chatInfo.user && chatInfo.user.uid
                }
            )
            setChatInfo({
                ...chatInfo,
                content: ''
            })
            chatArea?.scrollBy(0, chatArea.scrollHeight)

        } catch (error) {
            setChatInfo({
                ...chatInfo,
                writeError: error.message
            })

        }

    }

    const formatTime = (timestamp: string | number | Date) => {
        const d = new Date(timestamp);
        return `${d.getDate()}/${(d.getMonth() + 1)}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
    }
    return (
        <div>
            <Header/>

            <div className="chat-area" ref={myRef}>
                {chatInfo.loadingChats ? <div className="spinner-border text-success" role="status">
                    <span className="sr-only">Loading...</span>
                </div> : ""}
                {chatInfo.chats.map(chat => {
                    return <p key={chat.timestamp}
                              className={"chat-bubble " + (chatInfo.user && chatInfo.user.uid === chat.uid ? "current-user" : "")}>
                        {chat.content}
                        <br/>
                        <span className="chat-time float-right">{formatTime(chat.timestamp)}</span>
                    </p>
                })}
            </div>
            <form onSubmit={handleSubmit} className="mx-3">
                <textarea className="form-control" name="content" onChange={handleChange}
                          value={chatInfo.content}/>
                {chatInfo.readError ? <p className="text-danger">{chatInfo.readError}</p> : null}
                <button type="submit" className="btn btn-submit px-5 mt-4">Send</button>
            </form>
            <div className="py-5 mx-3">
                Login in as: <strong className="text-info">{chatInfo.user && chatInfo.user.email}</strong>
            </div>
        </div>
    );
};

export default Chat;
