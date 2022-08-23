import React from "react"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { register } from "../app/dataHandling"
import { login } from "../app/dataHandling"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import "./remainingComponentsStyle.css"

function Register_login() {
    const [loginInfo, setLoginInfo] = React.useState({
        email: "",
        password: "",
    })
    const [emailError, setEmailError] = React.useState("Invalid Email")
    const [passwordError, setPasswordError] = React.useState(
        "Must contain at least 7 characters"
    )

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email)
    }
    function isValidPassword(password) {
        return password.length >= 7
    }

    function onChange(event) {
        let { name, value } = event.target
        if (name === "email" && !isValidEmail(value)) {
            setEmailError("Invalid Email")
        } else if (name === "email" && isValidEmail(value)) {
            setEmailError(null)
        }
        if (name === "password" && !isValidPassword(value)) {
            setPasswordError("Must contain at least 7 characters")
        } else if (name === "password" && isValidPassword(value)) {
            setPasswordError(null)
        }

        setLoginInfo((previousState) => ({
            ...previousState,
            [name]: value.toLowerCase(),
        }))
    }
    const darkTheme = createTheme({
        palette: {
            mode: "dark",
        },
    })
    return (
        <div className="loginRegisterPage">
            <ThemeProvider theme={darkTheme}>
                <TextField
                    required
                    id="outlined-required"
                    label="Username"
                    onChange={onChange}
                    name="email"
                    error={emailError ? true : false}
                    helperText={emailError && emailError}
                    value={loginInfo.email}
                />
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    onChange={onChange}
                    name="password"
                    error={passwordError ? true : false}
                    helperText={passwordError && passwordError}
                    value={loginInfo.password}
                />
            </ThemeProvider>
            <div className="loginRegisterPageButtons">
                <Button
                    variant="contained"
                    onClick={() => {
                        if (!emailError && !passwordError) {
                            register(loginInfo)
                        }
                    }}
                >
                    Register
                </Button>
                <Button
                    variant="contained"
                    onClick={() => {
                        if (!emailError && !passwordError) {
                            login(loginInfo)
                        }
                    }}
                >
                    Login
                </Button>
            </div>
        </div>
    )
}

export default Register_login
