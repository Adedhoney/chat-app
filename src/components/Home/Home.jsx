import React from "react"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import Options from "./Options"
import Home_ChatList from "./ChatList"
import "./homeStyle.css"

function Home() {
    const [showOptions, setShowOptions] = React.useState(false)
    return (
        <div className="homeDiv">
            <nav className="topNav">
                <h1 className="appName">QuickText</h1>
                <MoreVertIcon
                    className="homeOptionsButton"
                    onClick={() => {
                        setShowOptions((state) => !state)
                    }}
                />
                {showOptions && (
                    <>
                        <div
                            className="homeOptionsOverlay"
                            onClick={() => {
                                setShowOptions((state) => !state)
                            }}
                        ></div>
                        <Options />
                    </>
                )}
            </nav>
            <Home_ChatList />
        </div>
    )
}

export default Home
