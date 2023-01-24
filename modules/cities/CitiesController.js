const CitiesUsecase = require('./usecase/CitiesUsecase');
const {httpResponse} = require('../share/helpers/response');

class CitiesController {
    constructor() {
        this.citiesUsecase = new CitiesUsecase();
    };

    async getCities(req, res, next) {
        httpResponse(await this.citiesUsecase.getCities(req.query), res);
    };

    async createCity(req, res, next) {
        httpResponse(await this.citiesUsecase.createCity(req.body, req.user), res)
    }

    async cityDetail(req, res, next){
        httpResponse(await this.citiesUsecase.cityDetail(req.params), res)
    }

    async updateCity(req, res, next){
        httpResponse(await this.citiesUsecase.updateCity(req.params, req.body, req.user), res)
    }

    async deleteCity(req, res, next){
        httpResponse(await this.citiesUsecase.deleteCity(req.params, req.user), res)
    }
};

module.exports = CitiesController;