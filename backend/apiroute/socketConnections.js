const db = require("../models")
function sortAlphabet(text) {
    return text.split("").sort().join("")
}

module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log("User Connected")

        socket.on("send_message", async (message) => {
            if (!message.conversation_id || message.message_text === "") {
                return
            }
            console.log("Message", message)
            await db.message.create({
                conversation_id: message.conversation_id,
                message_id: message.message_id,
                fromEmail: message.fromEmail,
                message_text: message.message_text,
                time_sent: message.time_sent,
            })
            socket.to(message.conversation_id).emit("recieveMessage", message)
        })

        socket.on("join-room", (room) => {
            socket.join(room)
            console.log("room joined")
        })

        socket.on("start_conversation", async (senderEmail, recieverEmail) => {
            let recieverInfo = await db.contact.findAll({
                where: {
                    email: recieverEmail,
                },
            })
            if (!recieverInfo[0]) {
                socket.emit("User_not_found")
                return
            }
            let recieverId = recieverInfo[0].contact_id
            let senderInfo = await db.contact.findAll({
                where: {
                    email: senderEmail,
                },
            })
            let senderId = senderInfo[0].contact_id

            const conversation_id = [senderId, recieverId].sort().join("")
            let converstionExists = await db.conversation.findAll({
                where: {
                    conversation_id: conversation_id,
                },
            })
            if (converstionExists[0]) {
                socket.emit("conversation_already_exists", converstionExists[0])
                return
            }

            await db.conversation.create({
                conversation_id: conversation_id,
                conversation_name: null,
                conversation_type: "single",
            })

            await db.groupMember.create({
                contact_id: senderId,
                conversation_id: conversation_id,
            })
            await db.groupMember.create({
                contact_id: recieverId,
                conversation_id: conversation_id,
            })

            // chat to add to recienver conversation array
            let recieverConversation = await db.sequelize.query(
                `SELECT * FROM conversations INNER JOIN groupmembers ON groupmembers.conversation_id = conversations.conversation_id INNER JOIN contacts ON contacts.contact_id = groupmembers.contact_id WHERE conversations.conversation_id = "${conversation_id}" AND contacts.contact_id = "${recieverId}"
                `,
                { type: db.Sequelize.QueryTypes.SELECT }
            )
            let recieverGroupMembers = await db.sequelize.query(
                `SELECT * FROM groupmembers INNER JOIN contacts ON contacts.contact_id = groupmembers.contact_id WHERE groupmembers.conversation_id = "${conversation_id}" AND groupmembers.contact_id != "${recieverId}"`,
                { type: db.Sequelize.QueryTypes.SELECT }
            )
            recieverConversation[0].otherGroupMembers = recieverGroupMembers
            recieverConversation[0].messages = []

            // chat to add to sender conversation array
            let senderConversation = await db.sequelize.query(
                `SELECT * FROM conversations INNER JOIN groupmembers ON groupmembers.conversation_id = conversations.conversation_id INNER JOIN contacts ON contacts.contact_id = groupmembers.contact_id WHERE conversations.conversation_id = "${conversation_id}" AND contacts.contact_id = "${senderId}"
                `,
                { type: db.Sequelize.QueryTypes.SELECT }
            )
            let senderGroupMembers = await db.sequelize.query(
                `SELECT * FROM groupmembers INNER JOIN contacts ON contacts.contact_id = groupmembers.contact_id WHERE groupmembers.conversation_id = "${conversation_id}" AND groupmembers.contact_id != "${senderId}"`,
                { type: db.Sequelize.QueryTypes.SELECT }
            )
            senderConversation[0].otherGroupMembers = senderGroupMembers
            senderConversation[0].messages = []

            socket
                .to(recieverId)
                .emit(
                    "added_to_conversation",
                    senderEmail,
                    recieverConversation[0]
                )
            socket.emit(
                "successfully_added_to_conversation",
                senderEmail,
                senderConversation[0]
            )
        })

        socket.on("disconnect", () => {
            console.log("User Disconnected")
        })
    })
}
