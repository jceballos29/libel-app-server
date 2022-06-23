const bcryptjs = require('bcryptjs');
const { saltRounds } = require('../config');


const hashPassword = async (password) => { 
  const salt = await bcryptjs.genSalt(saltRounds);
  const hash =  await bcryptjs.hash(password, salt);
  return hash;
}


const comparePassword = async (password, hash) => {
  return await bcryptjs.compare(password, hash);
}


module.exports = { hashPassword, comparePassword };