const express = require('express');
const RoleController = require('../modules/role/RoleController');
const LoginMiddleware = require('../modules/share/middleware/LoginMiddleware');
const route = express.Router();

route.get('/roles', LoginMiddleware, async(req, res, next) => {
    try {
        await new RoleController().getRoles(req, res, next)
    } catch (error) {
        next(error)
    }
})

route.post('/role', LoginMiddleware, async(req, res, next) => {
    try {
        await new RoleController().createRole(req, res, next)
    } catch (error) {
        next(error)
    }
})

route.get('/role/:roleId', LoginMiddleware, async(req, res, next) => {
    try {
        await new RoleController().detailRole(req, res, next)
    } catch (error) {
        next(error)
    }
})

route.put('/role/:roleId', LoginMiddleware, async(req, res, next) => {
    try {
        await new RoleController().updateRole(req, res, next)
    } catch (error) {
        next(error)  
    }
})

route.delete('/role/:roleId', LoginMiddleware, async(req, res, next) => {
    try {
        await new RoleController().deleteRole(req, res, next)
    } catch (error) {
        next(error)  
    }
})

module.exports = route;