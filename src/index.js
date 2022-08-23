import ReactDom from "react-dom/client"
import App from "./app/App"
import "./Style.css"
import "./app/dataHandling"
import { Provider } from "react-redux"
import store from "./app/reduxStore"

const root = ReactDom.createRoot(document.getElementById("container"))

root.render(
    <div>
        <Provider store={store}>
            <App />
        </Provider>
    </div>
)
