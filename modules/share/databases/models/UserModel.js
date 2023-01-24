const { DataTypes } = require('sequelize');
const db = require('../Database');
const CitiesModel = require('../models/CitiesModel');
const RolesModel = require('../models/RolesModel');

const UserModel = db.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    firstname: {
        type: DataTypes.STRING,
    },
    lastname: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    phone: {
        type: DataTypes.STRING,
    },
    no_ktp: {
        type: DataTypes.STRING,
    },
    address: {
        type: DataTypes.STRING,
    },
    dob: {
        type: DataTypes.DATE,
    },
    city_id: {
        type: DataTypes.INTEGER,
    },
    role_id: {
        type: DataTypes.INTEGER,
    },
    createdAt: {
        field: 'created_at',
        type: DataTypes.DATE,
    },
    updatedAt: {
        field: 'updated_at',
        type: DataTypes.DATE,
    },
},{cfreezeTableName: true }

);

UserModel.belongsTo(CitiesModel, {
    foreignKey: 'city_id',
    as: 'city'
});

UserModel.belongsTo(RolesModel, {
    foreignKey: 'role_id',
    as: 'role'
});

module.exports = UserModel;