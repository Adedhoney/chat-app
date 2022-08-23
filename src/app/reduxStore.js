import { configureStore } from "@reduxjs/toolkit"
import appReducer from "./appSlice"
import contactReducer from "./contactSlice"
import conversationReducer from "../components/conversation/conversationSlice"

const store = configureStore({
    reducer: {
        app: appReducer,
        contact: contactReducer,
        conversation: conversationReducer,
    },
})

export default store
