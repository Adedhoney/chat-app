import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentPage: "login",
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        changePage: (state, action) => {
            state.currentPage = action.payload
        },
    },
})

export const { changePage } = appSlice.actions
export default appSlice.reducer
