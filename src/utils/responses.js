const { production } = require('../config');

const error = (res, message, code = 500) => {
  res.status(code).json({
    success: false,
    error: message,
  });
};

const success = (res, data, message, code = 200) => {
  res.status(code).json({
    success: true,
    message,
    data,
  });
};

const login = async (res, token, user) => {
  res
    .status(200)
    .cookie('libelAcademyToken', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: production ? 'none' : 'strict',
      secure: production,
    })
    .json({
      success: true,
      message: 'Login successful',
      data: user,
    })
}


const logout = async (res) => {
  res
    .status(200)
    .clearCookie('libelAcademyToken')
    .json({
      success: true,
      message: 'Logout successful',
    })
}


module.exports = { error, success, login, logout };