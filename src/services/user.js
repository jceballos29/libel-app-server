/** @format */

const { User } = require('../models');
const { hashPassword } = require('../utils/password');
const { generateFromEmail } = require('unique-username-generator');

class UserService {
  static async getAll() {
    try {
      const result = await User.find().select('-password');
      if (result.length > 0) {
        return result;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getById(id) {
    try {
      const result = await User.findById(id).select('-password');
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getByUsername(username) {
    try {
      const result = await User.findOne({ username }).select(
        '-password'
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getByEmail(email) {
    try {
      const result = await User.findOne({ email });
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async create(user) {
    try {
      const username = await this.#setUsername(user.email);
      const password = await hashPassword(user.password);
      const result = await User.create({
        ...user,
        password,
        username,
      });
      result.set('password', undefined, { strict: false });
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async update(id, user) {
    try {
      const result = await User.findByIdAndUpdate(id, user, {
        new: true,
      });
      delete result.password;
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      const result = await User.findByIdAndRemove(id);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async setPassword(id, password) {
    try {
      const result = await User.findByIdAndUpdate(id, {
        password: hashPassword(password),
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async changePassword(id, oldPassword, newPassword) {
    try {
      const result = await User.findById(id);
      if (await result.comparePassword(oldPassword)) {
        await result.setPassword(newPassword);
        return result;
      }
      throw new Error('Old password is incorrect');
    } catch (error) {
      throw error;
    }
  }

  static async #setUsername(email) {
    try {
      const users = await UserService.getAll();
      const usernames = users.map((user) => user.username);
      let username = email.split('@')[0];
      while (usernames.includes(username)) {
        username = generateFromEmail(email, 3);
      }
      return username;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;
