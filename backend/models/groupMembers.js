module.exports = (sequelize, DataTypes) => {
    const groupMembers = sequelize.define("groupMember", {
        conversation_id: {
            type: DataTypes.STRING(100),
            allowNull: false,
            references: { model: "conversations", Key: "conversation_id" },
        },
        contact_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: { model: "contacts", Key: "contact_id" },
        },
        dateTimeLeft: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    })
    groupMembers.associate = (models) => {
        groupMembers.belongsTo(models.conversation, {
            foreignKey: "conversation_id",
        })
        groupMembers.belongsTo(models.contact, {
            foreignKey: "contact_id",
        })
    }
    return groupMembers
}
