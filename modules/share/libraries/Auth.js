const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class Auth {
    constructor() {
        this.token = null;
    };

    /**
     * @param {string} token;
     */
    setToken(token) {
        this.token = token;
    };

    getToken() {
        return this.token;
    };

    generateToken(data) {
        return jwt.sign(
            {
                exp: Math.floor(Date.now() / 1000) + 100000000, // 100 years
                data,
            },
            process.env.TOKEN_SECRET,
        );
    };

    generateRefreshToken(data) {
        return jwt.sign(
            {
                exp: Math.floor(Date.now() / 1000) + 1000, // 8 days
                data
            },
            process.env.TOKEN_SECRET_REFRESH
        )
    };

    verifyToken(token) {
        try {
            return jwt.verify(token, process.env.TOKEN_SECRET);
        } catch (e) {
            console.log(e)
        };
    };

    verifyRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.TOKEN_SECRET_REFRESH);
        } catch (e) {
            console.log(e);
        };
    };


    async generatePassword(plainText) {
        const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS || 10));
        return await bcrypt.hash(plainText.toString(), salt);
    };

    async validatePassword(plainText, hash) {
        return await bcrypt.compare(plainText.toString(), hash.toString());
    };
};

module.exports = Auth;
