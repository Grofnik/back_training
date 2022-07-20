const Sequelize = require('sequelize');
const { sequelize } = require('../index');

class users extends Sequelize.Model {}

users.init(
    {
        id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.DataTypes.UUIDV4
        },
        login: {
            type: Sequelize.STRING,
            defaultValue: '',
            allowNull: false
        },
        mail: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: ''
        },
        password:{
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: ''
        }
    },
    { sequelize: sequelize, underscored: true, modelName: 'user' }
    );
    
module.exports = users;
    