const CitiesModel = require('../../share/databases/models/CitiesModel');
const GenericResponseEntity = require('../../share/entities/GenericResponseEntity');
const { Op } = require('sequelize');
const { ADMIN } = require('../../share/constants/role');
class CitiesUsecase {
    constructor() {
        this.citiesModel = CitiesModel;
    };

    async getCities(query) {
        const response = new GenericResponseEntity();
        try {
            const where = [];
            if(query.search) {
                where.push({
                    name: {
                        [Op.like]: `%${query.search}%`,
                    },
                })
            };
           
            const cities = await this.citiesModel.findAll({
                where
            });
            if(cities) return response.successResponse('Success fetch cities', 200, cities );
            return response.errorResponse('Failed to fetch cities', 400, null);
        } catch (error) {
            return response.errorResponse(error.message, 400, null);
        };
    };

    async createCity(body, user){
        const response = new GenericResponseEntity();
        try {
            if(user?.role?.original_name !== ADMIN) return response.errorResponse(`You don't have Authorization`, 400, null);
            const isCityExist = await this.citiesModel.findOne({where: {name: body.name}});
            if(isCityExist) return response.errorResponse('City already exist', 400, null);
            const city = await this.citiesModel.create(body);
            if(city) return response.successResponse('Success create city', 200, city );
            return response.errorResponse('Failed to create city', 400, null);
        } catch (error) {
            return response.errorResponse(error.message, 400, null);
        }
    }

    async cityDetail(params){
        const response = new GenericResponseEntity();
        try {
            const city = await this.citiesModel.findByPk(params.idCity);
            if(!city) return response.errorResponse('City not found', 400, null );
            return response.successResponse('Succeded to get city', 400, city);
        } catch (error) {
            return response.errorResponse(error.message, 400, null);
        }
    }

    async updateCity(params, body, user){
        const response = new GenericResponseEntity();
        try {
            if(user?.role?.original_name !== ADMIN) return response.errorResponse(`You don't have Authorization`, 400, null);
            const city = await this.citiesModel.findByPk(params.idCity);
            if(!city) return response.errorResponse('City not found', 400, null );
            await city.update(body)
            return response.successResponse('Succeded to update city', 400, city);
        } catch (error) {
            return response.errorResponse(error.message, 400, null);
        }
    }

    async deleteCity(params, user){
        const response = new GenericResponseEntity();
        try {
            console.log('userAuth', user)
            if(user?.role?.original_name !== ADMIN) return response.errorResponse(`You don't have Authorization`, 400, null);
            const city = await this.citiesModel.findByPk(params.idCity);
            if(!city) return response.errorResponse('City not found', 400, null );
            await city.destroy()
            return response.successResponse('Succeded to delete city', 400, null);
        } catch (error) {
            return response.errorResponse(error.message, 400, null);
        }
    }
};

module.exports = CitiesUsecase;