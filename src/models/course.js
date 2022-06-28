/** @format */

const { mongoose } = require('../config/database');

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    abstract: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    duration: {
      hours: { type: Number, required: true },
      minutes: { type: Number, required: true },
      seconds: { type: Number, required: true }
    },
    level: {
      type: String,
      enum: ['Principiante', 'Intermedio', 'Avanzado'],
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    certificate: { type: Boolean, required: true },
    featured: { type: Boolean, required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    whatYouLearns: [{ type: String }],
    requirements: [{ type: String }],
    materials: [{ type: String }],
    whoShouldTake: [{ type: String }],
    media: {
      thumbnail: { type: String, required: true },
      video: { type: String, required: true },
    },
    curriculum: {
      totalLessons: { type: Number, required: true, default: 0 },
      units: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Unit' },
      ],
    },
  },
  {
    collection: 'courses',
    timestamps: true,
    versionKey: false,
  }
);


module.exports = mongoose.model('Course', courseSchema);
