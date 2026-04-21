const bcrypt = require("bcrypt");
const User = require("../models/User");
const asyncHandler = require("../middleware/asyncHandler");
const generateToken = require("../utils/generateToken");

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  createdAt: user.createdAt
});

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(409).json({
      success: false,
      data: {},
      message: "Email already in use"
    });
  }

  const hashed = await bcrypt.hash(password, 12);
  const user = await User.create({ name, email, password: hashed });
  const token = generateToken({ id: user._id, role: user.role });

  return res.status(201).json({
    success: true,
    data: { token, user: sanitizeUser(user) },
    message: "Registration successful"
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({
      success: false,
      data: {},
      message: "Invalid credentials"
    });
  }

  const matches = await bcrypt.compare(password, user.password);
  if (!matches) {
    return res.status(401).json({
      success: false,
      data: {},
      message: "Invalid credentials"
    });
  }

  const token = generateToken({ id: user._id, role: user.role });
  return res.status(200).json({
    success: true,
    data: { token, user: sanitizeUser(user) },
    message: "Login successful"
  });
});

const me = asyncHandler(async (req, res) => {
  return res.status(200).json({
    success: true,
    data: { user: sanitizeUser(req.user) },
    message: "Authenticated user profile"
  });
});

module.exports = {
  register,
  login,
  me
};
