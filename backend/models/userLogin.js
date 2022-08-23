module.exports = (sequelize, DataTypes) => {
    const userLogin = sequelize.define("userlogin", {
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        contact_id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
    })
    return userLogin
}
