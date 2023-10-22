const { createResponseObject, generateToken } = require("../utills/common");
const Auth = require("../model/auth");
const bcrypt = require("bcrypt");
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // validate
    if (!username || !email || !password) {
      const responseObject = createResponseObject(
        false,
        "Please enter all required fields"
      );
      return res.status(401).json(responseObject);
    }

    // email check already exists
    const existsEmail = await Auth.exists({ email });
    if (existsEmail) {
      const responseObject = createResponseObject(
        false,
        "Email already exists trying another email address"
      );
      return res.status(401).json(responseObject);
    }

    const user = await Auth.create({
      username,
      email,
      password: await bcrypt.hash(password, 10),
    });

    if (user) {
      const token = generateToken({ id: user.id });
      responseObject = createResponseObject(true, "User created successfully");
      const data = {
        ...user.toObject(),
      };
      delete data.password;
      return res.status(200).json({ ...responseObject, token, ...data });
    }
  } catch (error) {
    const responseObject = createResponseObject(false, error.message);
    return res.status(error.status).json(responseObject);
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate
    if (!email || !password) {
      const responseObject = createResponseObject(
        false,
        "Please enter all required fields"
      );
      return res.status(401).json(responseObject);
    }

    // Find user by email
    const existsUser = await Auth.findOne({ email });
    if (!existsUser) {
      const responseObject = createResponseObject(false, "User not found!");
      return res.status(401).json(responseObject);
    }

    const matchPassword = await bcrypt.compare(password, existsUser.password);

    if (matchPassword) {
      const responseObject = createResponseObject(
        true,
        "User logged in successfully"
      );
      const token = generateToken({ id: existsUser.id });
      const data = { ...existsUser.toObject(), token };
      delete data.password;
      return res.status(200).json({ ...responseObject, data });
    } else {
      const responseObject = createResponseObject(false, "Incorrect password");
      return res.status(401).json(responseObject);
    }
  } catch (error) {
    const responseObject = createResponseObject(false, error.message);
    return res.status(400).json(responseObject);
  }
};
const checkAuth = async (req, res) => {
  try {
    const userData = await Auth.findById(req.userId).select("-password");
    let responseObject = createResponseObject(
      true,
      "User Details Fetch successfully"
    );
    return res.status(201).json({ ...responseObject, data: userData });
  } catch (error) {
    let responseObject = createResponseObject(false, error.message);
    return res.status(401).json(responseObject);
  }
};

module.exports = {
  login,
  register,
  checkAuth,
};
