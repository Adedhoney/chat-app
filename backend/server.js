const express = require("express")
const app = express()
const http = require("http").Server(app)
const io = require("socket.io")(http, { cors: { origin: "*" } })
const socketConnetions = require("./apiroute/socketConnections")(io)

const db = require("./models")
const PORT = 4000
const cors = require("cors")
const routes = require("./apiroute/chatRoutes")

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.get("/", (req, res) => res.json("Testing the endpoint"))
app.use("/", routes)

db.sequelize.sync().then(() => {
    http.listen(PORT, () => console.log(`This server is on port ${PORT}`))
})
