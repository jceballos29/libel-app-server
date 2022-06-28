/** @format */

const { mongoose } = require('../config/database');
const Unit = require('./unit');


const lessonSchema = new mongoose.Schema(
  {
    _unit: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { 
      hours: { type: Number, required: true },
      minutes: { type: Number, required: true },
      seconds: { type: Number, required: true }
     },
    number: { type: Number, required: true },
    video: { type: String, required: true },
  },
  {
    collection: 'lessons',
    timestamps: true,
    versionKey: false,
  }
);



module.exports = mongoose.model('Lesson', lessonSchema);
