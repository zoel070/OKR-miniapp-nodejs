require('dotenv').config()
const JWT = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const userService = {
  token: async function (userId) {
    return JWT.sign({
      user_id: userId,
    }, JWT_SECRET, {
      expiresIn: '360d'
    });
  },
}

module.exports = userService;