/** @format */

const {mongoose} =  require('../config/database');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['admin', 'teacher', 'student'],
      default: 'student',
    },
    provider: {
      type: String,
      enum: ['local', 'google', 'facebook'],
      default: 'local',
    },
    providerId: { type: String, default: null },
    avatar: { type: String, default: null },
    phone: { type: String, default: null },
    city: { type: String, default: null },
    country: { type: String, default: null },
    biography: { type: String, default: null },
    social: {
      website: { type: String, default: null },
      facebook: { type: String, default: null },
      twitter: { type: String, default: null },
      instagram: { type: String, default: null },
      linkedin: { type: String, default: null },
    },
  },
  {
    collection: 'users',
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model('User', userSchema);
