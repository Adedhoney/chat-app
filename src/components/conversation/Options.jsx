import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { setShowInfo } from "./conversationSlice"

function Options(props) {
    const dispatch = useDispatch()
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
    return (
        <div className="chatOptions">
            {conversation.conversation_type === "single" ? (
                <>
                    <div
                        className="optionsButton"
                        onClick={() => {
                            dispatch(setShowInfo())
                            props.toggleOptions()
                        }}
                    >
                        View info
                    </div>
                    <div className="optionsButton">Clear messages</div>
                    <div className="optionsButton">Delete chat</div>
                </>
            ) : (
                <>
                    <div
                        className="optionsButton"
                        onClick={() => {
                            dispatch(setShowInfo())
                            props.toggleOptions()
                        }}
                    >
                        View info
                    </div>
                    <div className="optionsButton">Clear messages</div>
                    <div className="optionsButton">Exit group</div>
                </>
            )}
        </div>
    )
}

export default Options
