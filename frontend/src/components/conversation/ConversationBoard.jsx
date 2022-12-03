import React from "react"
import MessagesContainer from "./MessagesContainer"
import TopNav from "./TopNav"
import TextField from "@mui/material/TextField"
import SendIcon from "@mui/icons-material/Send"
import ConversationInfo from "./ConversationInfo"
import { sendMessage } from "../../app/dataHandling"
import { useSelector, useDispatch } from "react-redux"
import { setShowInfo } from "./conversationSlice"
import "./conversationBoardStyle.css"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { v4 as uuid } from "uuid"

function ConverssationBoard() {
    let dispatch = useDispatch()

    const myEmail = useSelector((state) => state.contact.contactEmail)
    const showInfo = useSelector(
        (state) => state.conversation.showConversationInfo
    )

    const [messageText, setMessageText] = React.useState({
        messageText: "",
    })
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
    function onChange(event) {
        let { name, value } = event.target
        setMessageText((previousState) => ({
            ...previousState,
            [name]: value,
        }))
    }

    function handleClick() {
        sendMessage({
            message_text: messageText.messageText,
            fromEmail: myEmail,
            conversation_id: conversationId,
            message_id: uuid(),
            time_sent: new Date().toISOString(),
        })
        setMessageText({ messageText: "" })
    }
    function clickedEnter(event) {
        if (event.which === 13 && !event.shiftKey) {
            handleClick()
            event.preventDefault()
        }
    }

    // Theme for message typing
    const darkTheme = createTheme({
        palette: {
            mode: "dark",
        },
    })

    return (
        <div className="conversationBoard">
            {!conversation.conversation_id ? (
                <div className="selectChat">
                    select a chat to start messaging
                </div>
            ) : (
                <>
                    <TopNav />
                    <div className="outerMessageDiv">
                        <MessagesContainer />
                    </div>
                    <div className="sendMessageDiv">
                        <ThemeProvider theme={darkTheme}>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Type a message"
                                multiline
                                maxRows={5}
                                value={messageText.messageText}
                                onChange={onChange}
                                name="messageText"
                                className="textField"
                                onKeyDown={clickedEnter}
                            />
                            <SendIcon
                                onClick={handleClick}
                                fontSize="large"
                                className="sendIcon"
                            />
                        </ThemeProvider>
                    </div>
                    {showInfo && (
                        <>
                            <div
                                className="conversationInfoOverlay"
                                onClick={() => dispatch(setShowInfo())}
                            ></div>
                            <ConversationInfo />
                        </>
                    )}
                </>
            )}
        </div>
    )
}

export default ConverssationBoard
