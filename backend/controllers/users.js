const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Card = require("../models/card");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.findById(req.user._id).orFail(
      new Error("document not found")
    );
    res.json(users);
  } catch (err) {
    req.type = "user";
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate()
      .orFail(() => {
        const error = new Error("");
        error.status = 404;
        throw error;
      });

    res.json(user);
  } catch (err) {
    req.type = "user";
    next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { email, password, name, about, avatar } = req.body;
    const hash = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hash,
      name,
      about,
      avatar,
    });

    const savedUser = await newUser.save();

    const defaultCard = new Card({
      name: "Welcome!",
      link: "https://www.pushengage.com/wp-content/uploads/2022/02/Best-Website-Welcome-Message-Examples.png",
      owner: savedUser._id,
    });

    await defaultCard.save();
    res.status(201).json(savedUser);
  } catch (err) {
    req.type = "user";
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { name, about } = req.body;
    const updateUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true }
    );

    if (!updateUser) {
      const error = new Error("");
      error.status = 404;
      throw error;
    }
    res.json(updateUser);
  } catch (err) {
    req.type = "user";
    next(err);
  }
};

const updateAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const updateAvatar = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true }
    ).orFail(new Error("Document not found"));

    res.json(updateAvatar);
  } catch (err) {
    req.type = "user";
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      const error = new Error("");
      error.status = 404;
      throw error;
    }

    res.json({ message: "User info deleted successfully" });
  } catch (err) {
    req.type = "user";
    next(err);
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
