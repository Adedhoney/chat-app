import React from "react"
import Avatar from "@mui/material/Avatar"
import { enterConversation } from "../conversation/conversationSlice"
import { useDispatch, useSelector } from "react-redux"

function ChatComponent(props) {
    const dispatch = useDispatch()
    const hasMessage = props.chat.messages[0]

    function lastMessageTime(time_sent) {
        const today = new Date()
        const date = new Date(time_sent)
        let yesterday = new Date()
        yesterday = yesterday.setDate(yesterday.getDate() - 1)
        yesterday = new Date(yesterday)

        if (today.toLocaleDateString() === date.toLocaleDateString()) {
            const sentTime = date.toLocaleTimeString("en-NG", {
                hour: "2-digit",
                minute: "2-digit",
            })
            return sentTime
        } else if (date.toLocaleDateString() === yesterday) {
            return "yesterday"
        } else {
            return date.toLocaleDateString()
        }
    }
    return (
        <div
            className="chatDIv"
            onClick={() =>
                dispatch(enterConversation(props.chat.conversation_id))
            }
        >
            <Avatar
                className="chatAvatar"
                onClick={(event) => {
                    event.stopPropagation()
                    console.log("viewed avatar")
                }}
            />
            <div className="chatInfo">
                <div className="flex">
                    <h3>
                        {props.chat.conversation_type === "single"
                            ? props.chat.otherGroupMembers[0].display_name
                            : props.chat.conversation_name}
                    </h3>
                    <span className="lastMessageTimeSpan">
                        {hasMessage &&
                            lastMessageTime(props.chat.messages[0].time_sent)}
                    </span>
                </div>

                <div className="flex">
                    <small>
                        {hasMessage && `${props.chat.messages[0].message_text}`}
                    </small>{" "}
                    <span className="unreadMessageNumber"></span>
                </div>
            </div>
        </div>
    )
}

function Home_ChatList() {
    let conversationList = useSelector((state) => state.contact.conversations)

    if (conversationList[0]) {
        conversationList = conversationList.slice().sort((a, b) => {
            if (a.messages[0] && b.messages[0]) {
                let timeA = new Date(a.messages[0].time_sent)
                let timeB = new Date(b.messages[0].time_sent)

                if (timeA < timeB) {
                    return 1
                }
                if (timeA > timeB) {
                    return -1
                }
                return 0
            }
        })
    }
    const chatComponents = conversationList.map((chat) => (
        <div key={chat.conversation_id}>
            <ChatComponent chat={chat} key={chat.conversation_id} />
            <hr />
        </div>
    ))
    return <div className="chatList">{chatComponents}</div>
}

export default Home_ChatList
