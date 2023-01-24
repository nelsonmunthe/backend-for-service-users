const express = require('express');
const CitiesController = require('../modules/cities/CitiesController')
const route = express.Router();
const LoginMiddleware =  require('../modules/share/middleware/LoginMiddleware');

route.get('/cities', async (req, res, next) => {
   try {
      await new CitiesController().getCities(req, res, next);
   } catch (error) {
      next(error)
   }
});

route.post('/city', LoginMiddleware, async(req, res, next) => {
   try {
      await new CitiesController().createCity(req, res, next)
   } catch (error) {
      next(error)
   }
})

route.get('/city/:idCity', LoginMiddleware, async(req, res, next) => {
   try {
      await new CitiesController().cityDetail(req, res, next)
   } catch (error) {
      next(error)
   }
})

route.put('/city/:idCity', LoginMiddleware, async(req, res, next) => {
   try {
      await new CitiesController().updateCity(req, res, next)
   } catch (error) {
      next(error)
   }
})

route.delete('/city/:idCity', LoginMiddleware, async(req, res, next) => {
   try {
      await new CitiesController().deleteCity(req, res, next)
   } catch (error) {
      next(error)
   }
})


module.exports = route;