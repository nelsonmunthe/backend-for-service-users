const GenericResponseEntity = require("../../share/entities/GenericResponseEntity");
const UserModel = require('../../share/databases/models/UserModel');
const paginate = require('../../share/helpers/paginate');
const {Op} = require('sequelize');
const { ADMIN } = require('../../share/constants/role');

class UserUsecase{
    constructor(){
        this.userModel = UserModel;
    };

    async getUsers(query){
        const response = new GenericResponseEntity();
       
        try {
            let { role_id, city_id, page, per_page, search} = query;
            const where = [];
            if(role_id) where.push({role_id});
            if(city_id) where.push({city_id});

            if(search){
                where.push(
                    {
                        [Op.or]: {
                            '$city.name$': {
                                [Op.like]: `%${search}%`,
                            },
                            '$role.description$': {
                                [Op.like]: `%${search}%`,
                            },
                            firstname: {
                                [Op.like]: `%${search}%`,
                            },
                            lastname: {
                            [Op.like]: `%${search}%`,
                            },
                            phone: {
                                [Op.like]: `%${search}%`,
                            },
                        }
                    }
               )
            }

            page = parseInt(page ? page : 1);
            per_page = parseInt(per_page ? per_page : 10);
            const offset = (page * per_page) - per_page;

            const users = await this.userModel.findAndCountAll({
                where,
                include : ['city', 'role'],
                offset,
                limit: per_page
            });

            const data = await paginate(users, page, per_page);

            if(users) return response.successResponse('Success get users', 200, data);
            return response.errorResponse('Failed get users', 400, null);
        } catch (error) {
            return response.errorResponse(error.message, 400, null);
        };
    };

    async detailUser(params) {
        const response = new GenericResponseEntity();
        try {
            const user = await this.userModel.findOne(
                {
                    where: {
                        id: params.id
                    },
                    include: ['city', 'role']
                }
            );
            if(!user) return response.errorResponse('Failed fetch detail user', 400, null);
            return response.successResponse('Success fetch detail user', 200, user);
        } catch (error) {
            return response.errorResponse(error.message, 400, null);
        };
    };

    async updateUser(params, body, userAuth) {
        const response = new GenericResponseEntity();
        try {
            if(userAuth?.role?.original_name !== ADMIN) return response.errorResponse(`You don't have Authorization`, 400, null);
            const user = await this.userModel.findOne(
                {
                    where: {
                        id: params.id
                    },
                    include: ['city', 'role']
                }
            );

            if(!user) return response.errorResponse('User not found', 400, null);
            const userUpdate = await user.update(body);
            return response.successResponse('Success update user', 200, userUpdate);
        } catch (error) {
            return response.errorResponse(error.message, 400, null);
        };
    };

    async deleteUser(params, userAuth) {
        
        const response = new GenericResponseEntity();
        try {
            if(userAuth?.role?.original_name !== ADMIN) return response.errorResponse(`You don't have Authorization`, 400, null);
            const user = await this.userModel.findOne(
                {
                    where: {
                        id: params.id
                    }
                }
            );
            if(!user) return response.errorResponse('User not found', 400, null);
             await user.destroy();
            return response.successResponse('Success deleted user', 200, null);
        } catch (error) {
            return response.errorResponse(error.message, 400, null);
        }
    };
};

module.exports = UserUsecase;