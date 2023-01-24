const GenericResponseEntity = require("../../share/entities/GenericResponseEntity");
const RolesModel = require('../../share/databases/models/RolesModel');
const { Op } = require('sequelize');
const { ADMIN } = require('../../share/constants/role');

class RoleUsecase{
    constructor() {
        this.roleModel = RolesModel;
    };

    async getRoles(query) {
        const response = new GenericResponseEntity();
        try {
            const where = [];
            if(query.search){
                where.push({
                    original_name: {
                        [Op.like]: `%${query.search}%`,
                    },
                })
            };

            const roles = await this.roleModel.findAndCountAll({
                where
            });

            if(roles) return response.successResponse('Success get roles', 200, roles);
            return response.errorResponse('Failed get roles', 400, null);
        } catch (error) {
            return response.errorResponse(error.message, 400, null);
        };
    };

    async createRole(body, user){
        const response = new GenericResponseEntity();
        try {
            if(user?.role?.original_name !== ADMIN) return response.errorResponse(`You don't have Authorization`, 400, null);
            const isRoleExist = await this.roleModel.findOne({where: {original_name: body.original_name}});
            if(isRoleExist) return response.errorResponse('Role Already Exist', 400, null);
            const role = await this.roleModel.create(body);
            if(role) return response.successResponse('Success create new role', 200, role);
            return response.errorResponse('Failed create role', 400, null);
        } catch (error) {
            return response.errorResponse(error.message, 400, null);
        };
    };

    async detailRole(params) {
        const response = new GenericResponseEntity();
        try {
            const role = await this.roleModel.findByPk(params.roleId);
            if(!role) return response.errorResponse('Role not found', 404, null);
            return response.successResponse('Success get detail role', 200, role);
        } catch (error) {
            return response.errorResponse(error.message, 400, null);
        };
    }

    async updateRole(params, body, user) {
        const response = new GenericResponseEntity();
        try {
            if(user?.role?.original_name !== ADMIN) return response.errorResponse(`You don't have Authorization`, 400, null);
            const role = await this.roleModel.findOne({where: {id: params.roleId}});
            if(!role) return response.errorResponse('Role not found', 404, null);
            if(role.original_name === body.original_name) response.errorResponse('Original name role already exist', 400, null);
            await role.update(body);
            return response.successResponse('Success update role', 200, role);
        } catch (error) {
            return response.errorResponse(error.message, 400, null);
        };
    }

    async deleteRole(params, user) {
        const response = new GenericResponseEntity();
        try {
            if(user?.role?.original_name !== ADMIN) return response.errorResponse(`You don't have Authorization`, 400, null);
            const role = await this.roleModel.findOne({where: {id: params.roleId}});
            if(!role) return response.errorResponse('Role not found', 404, null);
            await role.destroy();
            return response.successResponse('Success delete role', 200, null);
        } catch (error) {
            return response.errorResponse(error.message, 400, null);
        };
    }
};

module.exports = RoleUsecase;