const Sequelize = require('sequelize');
const { sequelize } = require('../index');

class token extends Sequelize.Model {}

token.init(
    {
        id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.DataTypes.UUIDV4
        },
        user_id: {
            type: Sequelize.DataTypes.UUID,
            allowNull: false
        },
        token: {
            type: Sequelize.STRING,
            defaultValue: '',
            allowNull: false
        }
    },
    { sequelize: sequelize, underscored: true, modelName: 'token' }
    );
    
module.exports = token;
    