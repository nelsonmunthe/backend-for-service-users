const { DataTypes } = require('sequelize');
const db = require('../Database');

const CitiesModel = db.define('cities', 
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        createdAt: {
            field: 'created_at',
            type: DataTypes.DATE,
        },
        updatedAt: {
            field: 'updated_at',
            type: DataTypes.DATE,
        },
    },
    {
        cfreezeTableName: true 
    }

);

module.exports = CitiesModel;