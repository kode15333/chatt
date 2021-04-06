import {db} from "../services/firebase";
import {SnapShopType, MessageInfo} from "./types";


export function readChats() {
    let abc : SnapShopType  = [];
    db.ref('chats').on("value", (snapshot) : SnapShopType=> {
        snapshot.forEach(snap => {
            abc.push(snap.val())
        })
        return abc;
    })
}

export function writeChats(message : MessageInfo) {
    return db.ref("chats").push().set({
        content: message.content,
        timestamp: message.timestamp,
        uid: message.uid
    })
}
