const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');


const generate = (user) => {  
  try {
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };
    return jwt.sign(payload, jwtSecret, { expiresIn: '7d' });
  } catch (error) {
    throw error;
  }
}


const verify = (token) => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (error) {
    return null;
  }
}


module.exports = { generate, verify };