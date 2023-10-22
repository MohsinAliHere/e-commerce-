const jwt = require("jsonwebtoken");
const { createResponseObject } = require("../utills/common");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, process.env.SecretKey);
    req.userId = decodedToken.id;
    next();
  } catch (error) {
    let responseObject = createResponseObject(false, error.message);
    return res.status(401).json(responseObject);
  }
};

module.exports = { verifyToken };
