/** @format */

const { Category } = require('../models');

class CategoryService {
  static async getAll() {
    try {
      const result = await Category.find();
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
      console.log(id);
      const result = await Category.findById(id);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async create(category) {
    try {
      const result = await Category.create(category);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async update(id, category) {
    try {
      const result = await Category.findByIdAndUpdate(id, category);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      const result = await Category.findByIdAndRemove(id);
      return result;
    } catch (error) {
      throw error;
    }
  }
}


module.exports = CategoryService;