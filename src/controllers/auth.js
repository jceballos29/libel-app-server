const { UserService } = require('../services')
const { comparePassword } = require('../utils/password');
const { generate } = require('../utils/token');
const responses = require('../utils/responses');


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
}

const logout = async (req, res) => {
  try {
    return responses.logout(res);
  } catch (error) {
    return responses.error(res, error, 500);
  }
}


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
}


module.exports = { login, logout, verify };