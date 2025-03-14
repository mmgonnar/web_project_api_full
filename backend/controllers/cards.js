const Card = require("../models/card");

const getCards = async (req, res) => {
  try {
    const cards = await Card.find().populate("owner").populate("likes");
    orFail(new Error("document not found"));
    res.json(cards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCardById = async (req, res) => {
  console.log(req.params);
  try {
    const card = await Card.findById(req.params.cardsId)
      .populate("owner")
      .orFail(new Error("No card with that id has been found."));

    res.json(card);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createCard = async (req, res) => {
  const { name, link } = req.body;
  const userId = req.user._id;

  const createCard = new Card({
    name,
    link,
    owner: userId,
  });

  try {
    const savedCard = await createCard.save();
    res.status(201).json(savedCard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.cardId).orFail(
      new Error("document not found")
    );
    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }
    res.json({ message: "Card deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addLike = async (req, res) => {
  const addLike = await Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  );
  res.send(addLike);
};

const removeLike = async (req, res) => {
  const removeLike = await Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  );
  res.send(removeLike);
};

module.exports = {
  getCards,
  getCardById,
  createCard,
  deleteCard,
  addLike,
  removeLike,
};
