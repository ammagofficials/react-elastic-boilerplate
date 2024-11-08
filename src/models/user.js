// src/models/user.js

class User {
    constructor({ id, name, email, password } = {}) {
      this.id = id || '';
      this.name = name || 'Unknown';
      this.email = email || '';
      this.password = password || ''; // Store a hashed password here in real applications
    }
  }
  
module.exports = User;