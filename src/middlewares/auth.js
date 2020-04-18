const jwt = require("jsonwebtoken");
const {ErrorHandler} = require('../error');

module.exports = function(req, res, next) {
  const token = req.header("Authorization");
  if (!token) throw new ErrorHandler(401, "Unauthorized (no token provided)");
  try {
    const decoded = jwt.verify(token, "secret");
    req.user = decoded.user;
    next();
  } catch (e) {
    throw new ErrorHandler(401, "Invalid token");
  }
};