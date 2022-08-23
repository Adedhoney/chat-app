const express = require("express")
const router = express.Router()
const db = require("../models")
const bcrypt = require("bcrypt")
const crypto = require("crypto")

// CHECKING ACCESS/ GETTING INFO
router.get("/checkaccess", (req, res) => {
    let userData = async () => {
        data = await db.contact.findAll({
            where: {
                contact_id: req.query["0"],
            },
        })
        res.json(data)
    }
    userData()
})
router.get("/get_conversations", async (req, res) => {
    // get conversations
    const userConversations = await db.sequelize.query(
        `SELECT * FROM contacts 
        INNER JOIN groupmembers ON groupmembers.contact_id = contacts.contact_id 
        INNER JOIN conversations ON conversations.conversation_id = groupmembers.conversation_id 
        WHERE contacts.email = "${req.query.email}"
    `,
        { type: db.Sequelize.QueryTypes.SELECT }
    )

    if (!userConversations[0]) {
        res.json(userConversations)
        return
    }

    // get other group members AND MESSAGES in a conversation
    let groupMemberQueryString = ""
    let messagesQueryString = ""
    if (userConversations[0]) {
        groupMemberQueryString += `SELECT * FROM groupmembers INNER JOIN contacts ON contacts.contact_id = groupmembers.contact_id WHERE (`
        messagesQueryString += "SELECT * FROM messages WHERE ("
        for (let item of userConversations) {
            groupMemberQueryString += `groupmembers.conversation_id = "${item.conversation_id}" OR `
            messagesQueryString += `messages.conversation_id = "${item.conversation_id}" OR `
        }
        groupMemberQueryString += `groupmembers.conversation_id = "${userConversations[0].conversation_id}") AND groupmembers.contact_id != "${userConversations[0].contact_id}"`
        messagesQueryString += `messages.conversation_id = "${userConversations[0].conversation_id}") ORDER BY time_sent DESC`
    }
    let chatMembers = await db.sequelize.query(groupMemberQueryString, {
        type: db.Sequelize.QueryTypes.SELECT,
    })
    let userMessages = await db.sequelize.query(messagesQueryString, {
        type: db.Sequelize.QueryTypes.SELECT,
    })

    // add group member and messages to conversations list
    for (let conversation of userConversations) {
        conversation.otherGroupMembers = []
        conversation.messages = []
        for (groupMember of chatMembers) {
            if (groupMember.conversation_id === conversation.conversation_id) {
                conversation.otherGroupMembers.push(groupMember)
            }
        }
        for (message of userMessages) {
            if (message.conversation_id === conversation.conversation_id) {
                conversation.messages.push(message)
            }
        }
    }

    res.json(userConversations)
})

// LOG IN
router.get("/logIn", async (req, res) => {
    // AUTHENTICATION

    const loginDetails = await db.userlogin.findAll({
        where: {
            email: req.query.email,
        },
    })
    if (!loginDetails[0]) {
        res.status(400).send("Account not found")
        return
    }
    try {
        let correct_password = await bcrypt.compare(
            req.query.password,
            loginDetails[0].password
        )

        if (correct_password) {
            // CREATING JSON WEB TOKEN
            let contact = await db.contact.findAll({
                where: {
                    email: req.query.email,
                },
            })
            console.log(contact)
            res.json({ userInfo: contact })
        } else {
            res.status(400).send("Incorrect Password")
        }
    } catch {
        res.status(500).send("error")
    }
})

// REGISTER NEW USER
router.post("/register", async (req, res) => {
    try {
        const checkEmail = await db.userlogin.findAll({
            where: {
                email: req.body.email,
            },
        })
        console.log(checkEmail)
        if (checkEmail[0] == null) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const uniqueId = crypto.randomUUID()
            db.userlogin.create({
                email: req.body.email,
                password: hashedPassword,
                contact_id: uniqueId,
            })
            db.contact.create({
                email: req.body.email,
                contact_id: uniqueId,
                display_name: req.body.email,
            })
            res.send("user created successfully")
        } else {
            res.send("User already exists")
        }
    } catch (error) {
        res.send(error.message)
    }
})

router.post("/change_name", async (req, res) => {
    await db.contact.update(
        { display_name: req.body.display_name },
        {
            where: {
                email: req.body.email,
            },
        }
    )
    res.send("Changed successfully")
})
module.exports = router
