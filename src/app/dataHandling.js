import axios from "axios"
import { io } from "socket.io-client"
import { changePage } from "./appSlice"
import {
    setUserInfo,
    addConversation,
    addmessage,
    clearConversations,
    changeDisplayNameState,
} from "./contactSlice"

import { enterConversation } from "../components/conversation/conversationSlice"
import store from "./reduxStore"

const HOST = "https://quick-text.herokuapp.com"
let socket

async function createConnection() {
    const contactId = localStorage.getItem("contactId")
    if (contactId) {
        socket = io(HOST)
        try {
            socket.on("connect", async () => {
                console.log("You connected with id " + socket.id)
                socketFunctions()
                let data = await axios.get(`${HOST}/checkaccess`, {
                    params: contactId,
                })
                if (!data.data[0]) {
                    return
                }
                let userConversations = await axios.get(
                    `${HOST}/get_conversations`,
                    {
                        params: { email: data.data[0].email },
                    }
                )

                socket.emit("join-room", contactId)
                for (let conversation of userConversations.data) {
                    socket.emit("join-room", conversation.conversation_id)
                }
                store.dispatch(
                    setUserInfo({
                        email: data.data[0].email,
                        contactId: data.data[0].contact_id,
                        displayName: data.data[0].display_name,
                    })
                )
                store.dispatch(clearConversations())
                userConversations.data.map((conversation) => {
                    store.dispatch(addConversation(conversation))
                })
                store.dispatch(changePage("home"))
            })
        } catch {
            alert("Cannot Connect")
        }
    }
}
createConnection()

async function register(information) {
    try {
        const registerUrl = `${HOST}/register`
        let body = information
        let response = await axios.post(registerUrl, body)
        alert(response.data)
        login(information)
    } catch (error) {
        return
    }
}

async function login(information) {
    try {
        const loginUrl = `${HOST}/logIn`
        let response = await axios.get(loginUrl, { params: information })
        localStorage.setItem("email", response.data.userInfo[0].email)
        localStorage.setItem("contactId", response.data.userInfo[0].contact_id)
        createConnection()
    } catch (error) {
        alert(error.response.data)
    }
}

async function changeDisplayName(email, newDisplayName) {
    try {
        let response = await axios.post(`${HOST}/change_name`, {
            email,
            display_name: newDisplayName,
        })
        store.dispatch(changeDisplayNameState(newDisplayName))
    } catch (error) {
        alert(error.response.data)
    }
}

export { register }
export { login }
export { changeDisplayName }

// SOCKET FUNCTIONS

function sendMessage(message) {
    socket.emit("send_message", message)
    store.dispatch(addmessage(message))
}
export { sendMessage }

function startConversation(recipientEmail) {
    const myEmail = localStorage.getItem("email")
    if (myEmail === recipientEmail) {
        return
    }
    socket.emit("start_conversation", myEmail, recipientEmail)
}
export { startConversation }

function socketFunctions() {
    socket.on("recieveMessage", (message) => {
        store.dispatch(addmessage(message))
    })
    socket.on("added_to_conversation", (senderEmail, conversation) => {
        socket.emit("join-room", conversation.conversation_id)
        store.dispatch(addConversation(conversation))
    })
    socket.on(
        "successfully_added_to_conversation",
        (senderEmail, conversation) => {
            socket.emit("join-room", conversation.conversation_id)
            store.dispatch(addConversation(conversation))
            store.dispatch(enterConversation(conversation.conversation_id))
        }
    )
    socket.on("conversation_already_exists", (conversation) => {
        store.dispatch(enterConversation(conversation.conversation_id))
    })
    socket.on("User_not_found", () => {
        alert("User not found")
    })
}
