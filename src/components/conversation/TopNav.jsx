import React from "react"
import Avatar from "@mui/material/Avatar"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
import Options from "./Options"
import { useMediaQuery } from "react-responsive"
import { enterConversation } from "../conversation/conversationSlice"
import { useDispatch, useSelector } from "react-redux"

function TopNav(props) {
    const [showOptions, setShowOptions] = React.useState(false)
    const dispatch = useDispatch()
    const isSmallScreen = useMediaQuery({ query: "(max-width: 700px)" })

    // get current conversation
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
    function toggleOptions() {
        setShowOptions((prevState) => !prevState)
    }
    function noConversation() {
        dispatch(enterConversation(""))
    }

    let chat_name =
        conversation.conversation_type === "single"
            ? conversation.otherGroupMembers[0].display_name
            : conversation.conversation_name
    return (
        <div className="topNav conversationTopNav">
            {isSmallScreen && (
                <div className="chatBackArrow" onClick={noConversation}>
                    <ArrowBackIosIcon />
                </div>
            )}
            <Avatar className="profileAvatar" />
            <h2 className="conversationName">{chat_name}</h2>
            <MoreVertIcon
                className="chatOptionsButton"
                onClick={toggleOptions}
            />
            {showOptions && (
                <>
                    <div
                        className="optionsOverlay"
                        onClick={toggleOptions}
                    ></div>
                    <Options toggleOptions={toggleOptions} />
                </>
            )}
        </div>
    )
}

export default TopNav
