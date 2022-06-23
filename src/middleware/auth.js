/** @format */

const { verify } = require('../utils/token');
const { error } = require('../utils/responses');

const validate = (req, res, next) => {
  try {
    const token = req.cookies.libelAcademyToken;
    if (!token) {
      return error(res, 'No token provided', 401);
    }
    const decoded = verify(token);
    if (!decoded) {
      return error(res, 'Invalid token', 401);
    }
    req.auth = decoded;
    next();
  } catch (error) {
    return error(res, error, 500);
  }
};

module.exports = { validate };
