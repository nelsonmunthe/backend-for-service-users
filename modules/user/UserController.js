const { httpResponse } = require('../share/helpers/response');
const UserUsecase =  require('./usecase/UserUsecase');

class UserController {
    constructor() {
        this.userUsecase = new UserUsecase();
    };

    async getUsers(req, res, next) {
        httpResponse(await this.userUsecase.getUsers(req.query), res);
    };

    async detailUser(req, res, next) {
        httpResponse(await this.userUsecase.detailUser(req.params), res);
    };

    async updateUser(req, res, next) {
        httpResponse(await this.userUsecase.updateUser(req.params, req.body, req.user), res);
    };

    async deleteUser(req, res, next) {
        httpResponse(await this.userUsecase.deleteUser(req.params, req.user), res);
    };
};

module.exports = UserController;