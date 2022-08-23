module.exports = (sequelize, DataTypes) => {
    const messages = sequelize.define("message", {
        message_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        fromEmail: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        conversation_id: {
            type: DataTypes.STRING(100),
            allowNull: false,
            // references: { model: "conversations", Key: "conversation_id" },
        },
        message_text: {
            type: DataTypes.STRING(2000),
            allowNull: false,
        },
        time_sent: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    })
    messages.associate = (models) => {
        messages.belongsTo(models.conversation, {
            foreignKey: "conversation_id",
        })
    }
    return messages
}
