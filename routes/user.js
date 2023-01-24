const express = require('express');
const LoginMiddleware = require('../modules/share/middleware/LoginMiddleware');
const UserController = require('../modules/user/UserController')
const route = express.Router();

route.get('/users', LoginMiddleware, async (req, res, next) => {
   try {
      await new UserController().getUsers(req, res, next);
   } catch (error) {
      next(error)
   }
});

route.get('/users/:id', LoginMiddleware, async (req, res, next) => {
   try {
      await new UserController().detailUser(req, res, next);
   } catch (error) {
      next(error)
   }
});

route.put('/users/:id', LoginMiddleware, async (req, res, next) => {
   try {
      await new UserController().updateUser(req, res, next)
   } catch (error) {
      next(error)
   }
})

route.delete('/users/:id', LoginMiddleware, async (req, res, next) => {
   try {
      await new UserController().deleteUser(req, res, next)
   } catch (error) {
      next(error)
   }
})


module.exports = route;