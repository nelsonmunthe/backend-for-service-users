const { httpResponse } = require("../share/helpers/response");
const RoleUsecase = require("./usecase/RoleUsecase");

class RoleController{
    constructor() {
        this.roleUsecase = new RoleUsecase();
    };

    async getRoles(req, res, next) {
        httpResponse(await this.roleUsecase.getRoles(req.query), res)
    };

    async createRole(req, res, next) {
        httpResponse(await this.roleUsecase.createRole(req.body, req.user), res);
    };

    async detailRole(req, res, next) {
        httpResponse(await this.roleUsecase.detailRole(req.params), res);
    };

    async updateRole(req, res, next) {
        httpResponse(await this.roleUsecase.updateRole(req.params, req.body, req.user), res);
    }

    async deleteRole(req, res, next) {
        httpResponse(await this.roleUsecase.deleteRole(req.params, req.user), res);
    }
};

module.exports = RoleController;