const GenericResponseEntity = require("../entities/GenericResponseEntity");
const { httpResponse } = require("../helpers/response");
const UserModel = require("../databases/models/UserModel");
const Auth = require('../libraries/Auth');

module.exports = async (req, res, next) => {
    try {
        const response = new GenericResponseEntity();
        response.statusCode = 401
        response.message = "Auth Failed";

        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = new Auth().verifyToken(token);
            console.log('decode', token)
            if (decoded) {
                
                let email = decoded.data.email;
                const user = await UserModel.findOne(
                    {
                        where: { email },
                        include : ['role', 'city'],
                        attributes: {
                            exclude : ['password']
                        }
                    },
                );

                if (!user) return httpResponse(response, res);

                req.user = user;
                next();
            } else {
                return httpResponse(response, res);
            }
        } else {
            return httpResponse(response, res);
        }
    } catch (e) {
        next(e)
    }
};
