const Card = require("../models/card");

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find()
      .sort({ createdAt: -1 })
      .populate("owner")
      .populate("likes")
      .orFail(new Error("document not found"));
    res.json(cards);
  } catch (err) {
    req.type = "card";
    next(err);
  }
};

const getCardById = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId)
      .populate("owner")
      .orFail(new Error("No card with that id has been found."));

    res.json(card);
  } catch (err) {
    req.type = "card";
    next(err);
  }
};

const createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const userId = req.user._id;

    const newCard = new Card({
      name,
      link,
      owner: userId,
    });

    const savedCard = await newCard.save();
    //savedCard.owner = { _id: userId };
    const populatedCard = await Card.findById(savedCard._id).populate("owner");

    res.status(201).json(populatedCard);
  } catch (err) {
    req.type = "card";
    next(err);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId);

    if (!card) {
      const error = new Error("");
      error.status = 404;
      throw error;
    }

    if (!card.owner.equals(req.user._id)) {
      const error = new Error("");
      error.status = 403;
      throw error;
    }

    const deletedCard = await Card.findByIdAndDelete(req.params.cardId);
    res.json({ message: "Card deleted successfully" });
  } catch (err) {
    req.type = "card";
    next(err);
  }
};

const addLike = async (req, res, next) => {
  try {
    const addedLike = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
      .populate("likes")
      .orFail(new Error("Card not found"));

    res.json(addedLike);
  } catch (err) {
    req.type = "card";
    next(err);
  }
};

const removeLike = async (req, res, next) => {
  try {
    const removedLike = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true }
    ).orFail(new Error("Card not found"));

    res.json(removedLike);
  } catch (err) {
    req.type = "card";
    next(err);
  }
};

module.exports = {
  getCards,
  getCardById,
  createCard,
  deleteCard,
  addLike,
  removeLike,
};
