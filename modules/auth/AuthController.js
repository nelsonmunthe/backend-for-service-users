const { httpResponse } = require('../share/helpers/response');
const AuthUsecase = require('./useCase/AuthUsecase');

class AuthController {
    constructor() {
        this.authUsecase = new AuthUsecase();
    };

    async login(req, res, next) {
        httpResponse(await this.authUsecase.login(req.body, res), res);
    };

    async register(req, res, next) {
        httpResponse(await this.authUsecase.register(req.body), res);
    };

    async refreshToken(req, res, next) {
        httpResponse(await this.authUsecase.refreshToken(req, res), res);
    };
};

module.exports = AuthController;