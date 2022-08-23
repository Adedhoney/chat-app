import React from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import { useSelector, useDispatch } from "react-redux"
import { setShowInfo } from "./conversationSlice"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"

function GroupInfo(props) {
    const dispatch = useDispatch()
    return (
        <div className="InfoPage">
            <ArrowBackIosIcon
                className="infoPageBackButton"
                onClick={() => dispatch(setShowInfo())}
            />
            <div>
                <Avatar />
                <div>
                    <h1>{props.chat_name}</h1>
                    <p>Number of Members</p>
                    <p>Group discription</p>
                </div>
            </div>
            <div>
                Number of Group Members A list of group nembers mapped over a
                component
            </div>
            <Button variant="contained">Exit Group</Button>
        </div>
    )
}

function UserInfo(props) {
    const dispatch = useDispatch()
    return (
        <div className="InfoPage">
            <ArrowBackIosIcon
                className="infoPageBackButton"
                onClick={() => dispatch(setShowInfo())}
            />
            <Avatar
                className="conversationAvatar"
                sx={{ width: 200, height: 200 }}
            />
            <div>
                <small>display name</small>
                <h1>{props.chat_name}</h1>
                <small>email</small>
                <p>{props.conversation.otherGroupMembers[0].email}</p>
            </div>
            <Button variant="contained">Block User</Button>
        </div>
    )
}

function ConversationInfo() {
    const allConversations = useSelector((state) => state.contact.conversations)
    const conversationId = useSelector(
        (state) => state.conversation.currentConversation
    )

    let conversation = {}
    for (let convo of allConversations) {
        if (convo.conversation_id === conversationId) {
            conversation = convo
        }
    }
    let chat_name =
        conversation.conversation_type === "single"
            ? conversation.otherGroupMembers[0].display_name
            : conversation.conversation_name

    return (
        <>
            {conversation.conversation_type === "single" ? (
                <UserInfo chat_name={chat_name} conversation={conversation} />
            ) : (
                <GroupInfo conversation={conversation} />
            )}
        </>
    )
}

export default ConversationInfo
