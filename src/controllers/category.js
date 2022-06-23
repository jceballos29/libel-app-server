/** @format */

const { CategoryService } = require('../services');
const responses = require('../utils/responses');

const getAll = async (req, res) => {
  try {
    const categories = await CategoryService.getAll();
    if (categories) {
      return responses.success(res, categories, 'Categories found');
    }
    return responses.error(res, 'No categories found', 404);
  } catch (error) {
    return responses.error(res, error, 500);
  }
};

const getById = async (req, res) => {
  try {
    const category = await CategoryService.getById(req.params.id);
    if (category) {
      return responses.success(res, category, 'Category found');
    }
    return responses.error(res, 'Category not found', 404);
  } catch (error) {
    return responses.error(res, error, 500);
  }
};

const create = async (req, res) => {
  try {
    const category = await CategoryService.create(req.body);
    return responses.success(res, category, 'Category created');
  } catch (error) {
    return responses.error(res, error, 500);
  }
};

const update = async (req, res) => {
  try {
    const category = await CategoryService.update(
      req.params.id,
      req.body
    );
    return responses.success(res, category, 'Category updated');
  } catch (error) {
    return responses.error(res, error, 500);
  }
};

const remove = async (req, res) => {
  try {
    const category = await CategoryService.delete(req.params.id);
    return responses.success(res, category, 'Category deleted');
  } catch (error) {
    return responses.error(res, error, 500);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
