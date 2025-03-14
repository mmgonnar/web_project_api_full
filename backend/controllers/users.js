const User = require("../models/user");

const getUsers = async (req, res) => {
  console.log("get users");
  try {
    const users = await User.find().orFail(new Error("document not found"));
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserById = async (req, res) => {
  console.log("GET /users/" + req.params.userId);
  try {
    const user = await User.findById(req.params.userId).orFail(
      new Error("No user with that id has been found.")
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createUser = async (req, res) => {
  const { name, about, avatar } = req.body;
  const newUser = new User({
    name,
    about,
    avatar,
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  const { name, about } = req.body;
  try {
    const updateUser = await User.findByIdAndUpdate(req.user._id, {
      name,
      about,
    }).orFail(new Error("User not found"));
    res.json(updateUser);
  } catch (err) {
    if (err.message === "User not found") {
      return res.status(404).json({ message: err.message });
    }
    res.status(500).json({ message: err.message });
  }
};

const updateAvatar = async (req, res) => {
  const { avatar } = req.body;
  try {
    const updateAvatar = await User.findByIdAndUpdate(req.user._id, {
      avatar,
    }).orFail(new Error("Document not found)"));
    res.json(updateAvatar);
  } catch (err) {
    if (err.message === "User not found") {
      return res.status(404).json({ message: err.message });
    }
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
};
