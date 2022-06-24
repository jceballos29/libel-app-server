/** @format */

const { UserService } = require('../services');
const { comparePassword } = require('../utils/password');
const { generate } = require('../utils/token');
const responses = require('../utils/responses');
const uuid = require('uuid');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserService.getByEmail(email);
    if (!user) {
      return responses.error(res, 'Wrong credentials', 404);
    }
    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      return responses.error(res, 'Wrong credentials', 404);
    }
    const token = generate(user);
    user.set('password', undefined, { strict: false });
    return responses.login(res, token, user);
  } catch (error) {
    return responses.error(res, error, 500);
  }
};

const providerLogin = async (req, res) => {
  try {
    const data = req.user.profile;
    const user = await UserService.getByEmail(data.emails[0].value);
    if (user) {
      const token = generate(user);
      user.set('password', undefined, { strict: false });
      return responses.login(res, token, user);
    } else {
      const newUser = await UserService.create({
        avatar: data.photos[0].value,
        email: data.emails[0].value,
        name: data.displayName,
        password: uuid.v4(),
        provider: data.provider,
        providerId: data.id,
      });
      const token = generate(newUser);
      return responses.login(res, token, newUser);
    }
  } catch (error) {
    return responses.error(res, error, 500);
  }
};

const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const validateUser = await UserService.getByEmail(email);
    if (validateUser) {
      return responses.error(res, 'Email already exist', 409);
    }
    const user = await UserService.create({ email, password, name });
    const token = generate(user);
    return responses.login(res, token, user);
  } catch (error) {
    return responses.error(res, error.message, 500);
  }
};

const logout = async (req, res) => {
  try {
    return responses.logout(res);
  } catch (error) {
    return responses.error(res, error, 500);
  }
};

const verify = async (req, res) => {
  try {
    const { id } = req.auth;
    const user = await UserService.getById(id);
    if (!user) {
      return responses.error(res, 'Unauthorized', 401);
    }

    user.set('password', undefined, { strict: false });
    return responses.success(res, user, 'User verified');
  } catch (error) {
    return responses.error(res, error, 500);
  }
};

module.exports = { login, providerLogin, register, logout, verify };
