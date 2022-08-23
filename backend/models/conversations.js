module.exports = (sequelize, DataTypes) => {
    const conversations = sequelize.define("conversation", {
        conversation_id: {
            type: DataTypes.STRING(100),
            allowNull: false,
            primaryKey: true,
        },
        conversation_name: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        conversation_type: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
    })
    conversations.associate = (models) => {
        conversations.hasMany(models.message, {
            foreignKey: "conversation_id",
        })
        conversations.hasMany(models.groupMember, {
            foreignKey: "conversation_id",
        })
    }
    return conversations
}
