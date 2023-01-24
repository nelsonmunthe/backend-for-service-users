const express = require('express');
const AuthController = require('../modules/auth/AuthController')
const route = express.Router();

route.post('/login', async (req, res, next) => {
   try {
    await new AuthController().login(req, res, next);
   } catch (error) {
    next(error)
   }
});

route.post('/register', async (req, res, next) => {
   try {
    await new AuthController().register(req, res, next);
   } catch (error) {
    next(error)
   }
});

route.get('/refresh', async(req, res, next) => {
   try {
      await new AuthController().refreshToken(req, res, next);
   } catch (error) {
      next(error)
   }
})

module.exports = route;