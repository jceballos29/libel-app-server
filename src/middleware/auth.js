/** @format */

const { verify } = require('../utils/token');
const { error } = require('../utils/responses');

const checkAuth = (req, res, next) => {
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


const checkRole = (roles) => (req, res, next) => {
  try {
    const { role } = req.auth;
    if (!roles.includes(role)) {
      return error(res, 'Unauthorized', 401);
    }
    next();
  } catch (error) {
    return error(res, error, 500);
  }
}


const checkOwner = (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: userId, role } = req.auth;
    if (role === 'admin' || id === userId) {
      next();
    } else {
      return error(res, 'Unauthorized', 401);
    }
  } catch (error) {
    return error(res, error, 500);
  }
}

module.exports = { checkAuth, checkRole, checkOwner };
