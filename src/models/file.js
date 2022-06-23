/** @format */

const { mongoose } = require('../config/database');

const fileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
  },
  {
    collection: 'storage',
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model('Storage', fileSchema);
