// src/controllers/authController.js
const userService = require('../services/userService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ResponseHandler = require('../common/responseHandler');
const messages = require('../common/messageEnum');
require('dotenv').config();

exports.createAccount = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await userService.createUser({ ...req.body, password: hashedPassword });
    ResponseHandler.success(res, 201, messages.ACCOUNT_CREATED);
  } catch (error) {
    ResponseHandler.error(res, 500, messages.ERROR_WHILE_ACTION_PERFORMING, error.message);
  }
};

exports.loginAccount = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userService.findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return ResponseHandler.error(res, 401, messages.INVALID_CREDENTIALS);
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    ResponseHandler.success(res, 200, messages.LOGIN_SUCCESSFUL, { token });
  } catch (error) {
    ResponseHandler.error(res, 500, messages.ERROR_WHILE_ACTION_PERFORMING, error.message);
  }
};
