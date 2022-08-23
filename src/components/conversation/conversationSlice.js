import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentConversation: "",
    showConversationInfo: false,
}

const conversationSlice = createSlice({
    name: "conversation",
    initialState,
    reducers: {
        enterConversation: (state, action) => {
            state.currentConversation = action.payload
        },
        setShowInfo: (state) => {
            state.showConversationInfo = !state.showConversationInfo
        },
    },
})

export const { enterConversation, setShowInfo } = conversationSlice.actions
export default conversationSlice.reducer
