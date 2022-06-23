/** @format */

const { mongoose } = require('../config/database');
const Course = require('./course');
const Lesson = require('./lesson');

const unitSchema = new mongoose.Schema(
  {
    _course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    title: { type: String, required: true },
    number: { type: Number, required: true },
    description: { type: String, required: true },
    lessons: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
    ],
  },
  {
    collection: 'units',
    timestamps: true,
    versionKey: false,
  }
);




module.exports = mongoose.model('Unit', unitSchema);
