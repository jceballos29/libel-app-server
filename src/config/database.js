const mongoose = require('mongoose');
const { db } = require('./index');


const connect = () => {
  try {
    mongoose.connect(db.uri, db.options);
    console.log('MongoDB connected');
  } catch (err) {
    console.log(err);
  }
}


module.exports = {connect, mongoose};