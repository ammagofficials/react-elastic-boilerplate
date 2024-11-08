// src/services/userService.js
const elasticsearchContext = require('../../context/elasticsearchContext');
const User = require('../models/user');

class UserService {
  async createUser(data) {
    const user = new User(data); // Create User instance
    await elasticsearchContext.create(user);
    await elasticsearchContext.saveChanges();
  }

  async findUserByEmail(email) {
    const users = await elasticsearchContext.search(User, {
      match: { email }
    });
    return users.length ? new User(users[0]) : null; // Return the first match as User instance
  }
}

module.exports = new UserService();
