import React from "react"
import { useSelector } from "react-redux"

function messageTime(time_sent) {
    const date = new Date(time_sent)
    const sentTime = date.toLocaleTimeString("en-NG", {
        hour: "2-digit",
        minute: "2-digit",
    })
    return sentTime
}
function dateString(Date_sent) {
    const today = new Date()
    const date = new Date(Date_sent)
    let yesterday = new Date()
    yesterday = yesterday.setDate(yesterday.getDate() - 1)
    yesterday = new Date(yesterday)

    if (today.toLocaleDateString() === date.toLocaleDateString()) {
        return "Today"
    } else if (date.toLocaleDateString() === yesterday) {
        return "Yesterday"
    } else {
        return date.toLocaleDateString()
    }
}

let breakDate = new Date()
function addDateBreak(date) {
    if (date) {
        breakDate = new Date(date)
    } else {
        breakDate = new Date()
    }
}

function Message(props) {
    const yourEmail = useSelector((state) => state.contact.contactEmail)
    const fromYou = yourEmail === props.message.fromEmail ? "fromYou" : ""

    let dateBreak = false
    let messageDate = new Date(props.message.time_sent)
    messageDate = messageDate.toLocaleDateString()
    let dateBreakString
    if (messageDate !== breakDate.toLocaleDateString()) {
        dateBreak = true
        dateBreakString = dateString(breakDate)
        addDateBreak(props.message.time_sent)
    }
    return (
        <>
            {dateBreak && (
                <small className="dateBreak">{dateBreakString}</small>
            )}
            <p className={`messageTile ${fromYou}`}>
                {`${props.message.message_text}   `}
                <small className="messageTime">
                    {messageTime(props.message.time_sent)}
                </small>
            </p>
        </>
    )
}

function MessagesContainer() {
    // get current conversation
    const buttomRef = React.useRef(null)
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
    addDateBreak()

    let messageComponentList = conversation.messages.map((message) => (
        <Message message={message} key={message.message_id} />
    ))
    React.useEffect(() => {
        if (!buttomRef.current) return
        buttomRef.current.scrollIntoView(true)
    }, [conversation.messages])

    return (
        <div className="messagesContainer">
            <div ref={buttomRef}></div>
            {messageComponentList}
        </div>
    )
}
export default MessagesContainer
