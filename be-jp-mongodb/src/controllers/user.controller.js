const User = require("../models/UserSchema");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const d = new User({ name, email, password });
  try {
    await d.save();

    return res.status(200).json({
      success: true,
      msg: "Registered new user!",
      payload: d,
    });
  } catch (e) {
    return res.send(e);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const d = await User.findOne({
      email: email,
      password: password,
    });

    if (!d) {
      console.log("User not found!");
      return res.status(200).json({
        success: false,
        msg: "Mismatching email or password!",
        payload: d,
      });
    }

    return res.status(200).json({
      success: true,
      msg: `Login successful! Welcome, ${d.name}`,
      payload: d,
    });
  } catch (e) {
    return res.send(e);
  }
};

const getAll = async (req, res) => {
  try {
    const d = await User.find().lean();

    return res.status(200).json({
      success: true,
      msg: "Users retrieved!",
      payload: d,
    });
  } catch (e) {
    return res.send(e);
  }
};

module.exports = {
  register,
  login,
  getAll,
};
