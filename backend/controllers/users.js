const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Card = require("../models/card");
const { deleteCard } = require("./cards");

const getUsers = async (req, res) => {
  try {
    const users = await User.find().orFail(new Error("document not found"));
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).orFail(
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
  const { email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      const newUser = new User({
        email,
        password: hash,
        name,
        about,
        avatar,
      });
      return newUser;
    })
    .then(async (newUser) => {
      const savedUser = await newUser.save();
      //const defaultUser = new
      const defaultCard = new Card({
        name: "Welcome!",
        link: "https://www.pushengage.com/wp-content/uploads/2022/02/Best-Website-Welcome-Message-Examples.png",
        owner: savedUser._id,
      });

      await defaultCard.save();
      res.status(201).json(savedUser);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
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

const deleteUser = async (req, res) => {
  const userId = req.user._id;
  console.log(req.user._id, "user XXXXX");
  //deleteCard(param)
  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(400).json({ message: "Delete user failed " });
    }

    res.json({ message: "User info deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
  deleteUser,
};
