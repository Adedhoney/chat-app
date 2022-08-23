import React from "react"
import Avatar from "@mui/material/Avatar"
import PersonIcon from "@mui/icons-material/Person"
import InfoIcon from "@mui/icons-material/Info"
import TextField from "@mui/material/TextField"
import EmailIcon from "@mui/icons-material/Email"
import { useSelector, useDispatch } from "react-redux"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
import { changePage } from "../app/appSlice"
import Button from "@mui/material/Button"
import { changeDisplayName } from "../app/dataHandling"

function Profile() {
    const displayName = useSelector((state) => state.contact.displayName)
    const [displayNameText, setDisplayNAmeText] = React.useState(displayName)
    const email = useSelector((state) => state.contact.contactEmail)
    const dispatch = useDispatch()
    const [showChangeDisplayNAmeIcon, setShowChangeDisplayNAmeIcon] =
        React.useState(false)
    const darkTheme = createTheme({
        palette: {
            mode: "dark",
        },
    })

    function backToHome() {
        dispatch(changePage("home"))
    }

    function onChange(event) {
        let { name, value } = event.target
        setDisplayNAmeText(value)
    }

    return (
        <div className="profilePage">
            <ThemeProvider theme={darkTheme}>
                <div className="profileBackArrow" onClick={backToHome}>
                    <ArrowBackIosIcon />
                </div>

                <Avatar
                    className="profileAvatar"
                    sx={{ width: 200, height: 200 }}
                />
                <div className="profileInformation">
                    <PersonIcon />
                    <div className="profileInfoSpace">
                        <TextField
                            className="profileInfoSpace"
                            id="standard-basic"
                            label="Display name"
                            variant="standard"
                            value={displayNameText}
                            onChange={(event) => {
                                onChange(event)
                                setShowChangeDisplayNAmeIcon(true)
                            }}
                        />
                        {showChangeDisplayNAmeIcon && (
                            <Button
                                variant="contained"
                                onClick={() => {
                                    changeDisplayName(email, displayNameText)
                                    setShowChangeDisplayNAmeIcon(false)
                                }}
                            >
                                change
                            </Button>
                        )}
                    </div>
                </div>
                {false && (
                    <div className="profileInformation">
                        <InfoIcon />
                        <div className="profileInfoSpace">
                            <TextField
                                id="standard-basic"
                                label="About"
                                variant="standard"
                                defaultValue=""
                            />
                        </div>
                    </div>
                )}
                <div className="profileInformation">
                    <EmailIcon />
                    <div className="profileInfoSpace">
                        <small>Email</small>
                        <p>{email}</p>
                        <hr />
                    </div>
                </div>
            </ThemeProvider>
        </div>
    )
}

export default Profile
