const { DataTypes } = require('sequelize');
const db = require('../Database');

const RolesModel = db.define('roles', 
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        original_name: {
            type: DataTypes.STRING,
        },
        description: {
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

module.exports = RolesModel;