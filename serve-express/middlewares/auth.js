const JWT = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
  token: function (req, res, next) {
    const token = req.headers.authorization
      ? req.headers.authorization
      : '';
    if (token) {
      JWT.verify(token, JWT_SECRET, function (err, decoded) {
        if (!err) {
          res.locals.user_id = decoded.user_id;
          next();
        } else {
          return res.status(401).json({
            error_code: 401,
            message: 'Auth Token Expired'
          })
        }
      });
    } else {
      return res.status(401).json({
        error_code: 401,
        message: 'Auth Token Empty'
      })
    }
  },
}

//每次有网络请求进来都先确认下请求里是否有token，token用自己的密钥是否能成功解密，解密成功后再带着正确的user_id进行下一步