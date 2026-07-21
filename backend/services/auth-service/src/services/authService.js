const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const sanitizeUser = (user) => {
  const plain = user.toJSON ? user.toJSON() : user;
  const { password, ...safeUser } = plain;
  return safeUser;
};

exports.registerUser = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = await User.create({
    name: data.name,
    email: data.email,
    password: hashedPassword
  });
  return sanitizeUser(user);
};

exports.loginUser = async (data) => {
  const user = await User.findOne({ where: { email: data.email } });
  if (!user) throw new Error("User not found");
  const isMatch = await bcrypt.compare(data.password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");
  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  return { user: sanitizeUser(user), token };
};
