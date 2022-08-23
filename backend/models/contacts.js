module.exports = (sequelize, DataTypes) => {
    const contacts = sequelize.define("contact", {
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        contact_id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        display_name: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
    })
    contacts.associate = (models) => {
        contacts.hasMany(models.groupMember, {
            foreignKey: "contact_id",
        })
    }
    return contacts
}
