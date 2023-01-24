const {Op} = require('sequelize')
const GenericResponseEntity = require("../../share/entities/GenericResponseEntity");
const UserModel = require('../../share/databases/models/UserModel');
const Auth =  require('../../share/libraries/Auth')

class AuthUsecase{
    constructor() {
        this.userModel = UserModel;
        this.auth = new Auth();
    }

    async login(body, res){
        
        const response = new GenericResponseEntity();
        try {
            const isUserExist = await this.userModel.findOne({
                where: {
                    email: body.email,
                    password: body.password
                },
                include: ['role']
            });
           
            if(!isUserExist) return response.errorResponse('User not found', 400, null);

            const payload = {
                original_name: isUserExist?.role?.original_name,
                email: isUserExist?.email
            }
            
            const accessToken = this.auth.generateToken(payload);
            const refreshToken = this.auth.generateRefreshToken(payload);
           
            const data = {
                payload,
                accessToken,
                refreshToken
            };

            if(refreshToken) {
                res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
            };
        
            return response.successResponse('Login success', 200, data);
        } catch (error) {
            return response.errorResponse('Something went wrong', 400, error.message);
        };
    };

    async register(body){
        const response = new GenericResponseEntity();

        try {
            const isUserExist = await this.userModel.findOne({
                where: {
                    [Op.or]: [
                      { email: body.email },
                      { phone: body.phone },
                      { no_ktp: body.no_ktp }
                    ]
                  }
            });
           
            if(isUserExist) return response.errorResponse('User already exist', 400, null);

            const user = await this.userModel.create(body);
            if(user)  return response.successResponse('Registration succeed', 200, user);

        } catch (error) {
            return response.errorResponse('Something went wrong', 400, error.message);
        };
    };

    async refreshToken(req, res) {
        console.log('headers', req.headers)
        const response = new GenericResponseEntity();
        try {
            const cookies = req.cookies;
            if (!cookies?.jwt) {
                return res.sendStatus(401);
            }

            const refreshToken = cookies.jwt;
    
            const decoded = this.auth.verifyRefreshToken(refreshToken)

            if(decoded?.data) {
                const isUserExist = await this.userModel.findOne({where: {email: decoded.data}});
                if(isUserExist) {
                    const accessToken = this.auth.generateToken(decoded.data);
                    return response.successResponse('Generate new access token', 200, accessToken);
                };
            };

        } catch (error) {
            console.log('err', error)
            response.successResponse(error.message, 200, 'Invalid Token');
        }
    }
};

module.exports = AuthUsecase;