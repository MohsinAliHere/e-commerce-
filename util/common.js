const createResponseObject = (success, message ,) => {
  return (responseObject = {
    success: success,
    message: message,
  });
};

const jwt = require("jsonwebtoken");

function generateToken(payload) {
  return jwt.sign(payload, process.env.SecretKey);
}

module.exports = {
  createResponseObject,
  generateToken,
};
