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
        mail: {
            type: Sequelize.STRING,
            defaultValue: '',
        },
        password:{
            type: Sequelize.STRING,
            defaultValue: ''
        }
    },
    { sequelize: sequelize, underscored: true, modelName: 'user' }
    );
    
module.exports = users;
    