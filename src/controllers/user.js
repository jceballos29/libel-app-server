/** @format */

const { UserService } = require('../services');
const responses = require('../utils/responses');

const getAllUsers = async (req, res) => {
  try {
    const users = await UserService.getAll();
    if (users) {
      return responses.success(res, users, 'Users found');
    }
    return responses.error(res, 'No users found', 404);
  } catch (error) {
    return responses.error(res, error, 500);
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await UserService.getById(req.params.id);
    if (user) {
      return responses.success(res, user, 'User found');
    }
    return responses.error(res, 'User not found', 404);
  } catch (error) {
    return responses.error(res, error, 500);
  }
};

const getUserByUsername = async (req, res) => {
  try {
    const user = await UserService.getByUsername(req.params.username);
    if (user) {
      return responses.success(res, user, 'User found');
    }
    return responses.error(res, 'User not found', 404);
  } catch (error) {
    return responses.error(res, error, 500);
  }
};

const createUser = async (req, res) => {
  try {
    const user = await UserService.create(req.body);
    return responses.success(res, user, 'User created');
  } catch (error) {
    return responses.error(res, error, 500);
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await UserService.update(req.params.id, req.body);
    return responses.success(res, user, 'User updated');
  } catch (error) {
    return responses.error(res, error, 500);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await UserService.delete(req.params.id);
    return responses.success(res, user, 'User deleted');
  } catch (error) {
    return responses.error(res, error, 500);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByUsername,
  createUser,
  updateUser,
  deleteUser,
};
