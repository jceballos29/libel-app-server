/** @format */

const { mongoose } = require('../config/database');

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    collection: 'categories',
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model('Category', categorySchema);
