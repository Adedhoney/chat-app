import React from "react"
import { useDispatch, useSelector } from "react-redux"

import ConversationBoard from "../components/conversation/ConversationBoard"
import Home from "../components/Home/Home"
import Profile from "../components/Profile"
import Register_login from "../components/register-loginPage"
import { useMediaQuery } from "react-responsive"

function App() {
    const currentPage = useSelector((state) => state.app.currentPage)
    const currentConversation = useSelector(
        (state) => state.conversation.currentConversation
    )
    const isSmallScreen = useMediaQuery({ query: "(max-width: 700px)" })
    return (
        <div className="screen">
            {(() => {
                if (currentConversation && isSmallScreen) {
                    return
                } else {
                    return (
                        <div className="screenLeftSide">
                            {currentPage === "home" && <Home />}
                            {currentPage === "login" && <Register_login />}
                            {currentPage === "profile" && <Profile />}
                        </div>
                    )
                }
            })()}

            <ConversationBoard />
        </div>
    )
}

export default App
