import React from "react"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { startConversation } from "../../app/dataHandling"
import { changePage } from "../../app/appSlice"
import { useDispatch } from "react-redux"

function Options() {
    const dispatch = useDispatch()
    const NewConvoDiv = () => {
        const [emailInput, setEmailInput] = React.useState("")
        function onChange(event) {
            setEmailInput(event.target.value.toLowerCase())
        }
        return (
            <form className="newConversationForm">
                <TextField
                    required
                    id="outlined-required"
                    label="Username"
                    onChange={onChange}
                    name="email"
                    type="email"
                    value={emailInput}
                />
                <Button
                    variant="contained"
                    onClick={() => startConversation(emailInput)}
                >
                    Start
                </Button>
            </form>
        )
    }
    return (
        <div className="homeOptions">
            <div>New Conversation</div>
            <NewConvoDiv />
            <div
                className="optionsButton"
                onClick={() => dispatch(changePage("profile"))}
            >
                Profile
            </div>
            <div
                className="optionsButton"
                onClick={() => {
                    localStorage.clear()
                    window.location.reload()
                }}
            >
                Log out
            </div>
        </div>
    )
}

export default Options
