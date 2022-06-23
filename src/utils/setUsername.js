const { UserService } = require('../services');
const { generateFromEmail } = require("unique-username-generator")

const setUsername =  async (email) => {
  console.log(email);
  try {
    const users = await UserService.getAll()
    const usernames = users.map(user => user.username)
    let username = email.split('@')[0];
    while (usernames.includes(username)) {
      username = generateFromEmail(email, 3)
    }
    return username;
  } catch (error) {
    throw error;
  }
}


module.exports = setUsername;