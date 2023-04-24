const Service = require('egg').Service;
require('dotenv').config()
const JWT = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;


class UserService extends Service {
    async token(userId) {
        return JWT.sign({
            user_id: userId,
        }, JWT_SECRET, {
            expiresIn: '360d'
        });
    }
}

module.exports = UserService;
