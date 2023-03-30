const User = require("../models/user");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).send({ message: "Invalid request" });
  const isEmailExists = await User.findOne({ email });
  if (isEmailExists)
    return res.status(400).send({ message: "Email already exists" });
  const user = new User({
    name,
    email,
    password,
  });
  try {
    await user.save();
    return res.status(201).send({
      message: "User registered successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).send({ message: "Invalid request" });
  try {
    const user = await User.findOne({ email, password });
    if (!user)
      return res
        .status(400)
        .send({ message: "Email or password is incorrect" });
    res.send({
      message: "User logged-in successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = { registerUser, loginUser };
