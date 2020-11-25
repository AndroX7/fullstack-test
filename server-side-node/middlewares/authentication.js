const jwt = require('jsonwebtoken');
const { User } = require('../models/index.js');
module.exports = async function authentication(req, res, next) {
  try {
    if (!req.headers.access_token) {
      next({ name: 'UnauthorizeAccess', message: 'Unauthorized Access'})
    } else {
      const payload = jwt.verify(req.headers.access_token, process.env.SECRET_KEY)
      const userData = await User.findOne({ where: { id: payload.id } });
      if(userData) {
        req.paramsContent = req.params.contentId
        req.userPayload = payload
        next()
      } else {
        next({ name: 'UnauthorizeAccess', message: 'Unauthorized Access'})
      }
    }
  } catch (err) {
    next(err)
  }
}
