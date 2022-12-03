import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    contactEmail: "",
    contactId: "",
    displayName: "",
    conversations: [],
}

const contactSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.contactEmail = action.payload.email
            state.contactId = action.payload.contactId
            state.displayName = action.payload.displayName
        },
        addConversation: (state, action) => {
            state.conversations.push(action.payload)
        },
        addmessage: (state, action) => {
            for (let conversation of state.conversations) {
                if (
                    action.payload.conversation_id ===
                    conversation.conversation_id
                ) {
                    conversation.messages.unshift(action.payload)
                }
            }
        },
        clearConversations: (state) => {
            state.conversations = []
        },
        changeDisplayNameState: (state, action) => {
            state.displayName = action.payload
        },
    },
})

export const {
    setUserInfo,
    addConversation,
    addmessage,
    clearConversations,
    changeDisplayNameState,
} = contactSlice.actions
export default contactSlice.reducer
