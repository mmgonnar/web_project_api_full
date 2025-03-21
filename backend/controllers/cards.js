const Card = require("../models/card");

const getCards = async (req, res) => {
  try {
    const cards = await Card.find()
      .populate("owner")
      .populate("likes")
      .orFail(new Error("document not found"));
    res.json(cards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCardById = async (req, res) => {
  try {
    const card = await Card.findById(req.params.cardId)
      .populate("owner")
      .orFail(new Error("No card with that id has been found."));

    res.json(card);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//New Card
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
  await Card.findById(req.params.cardId)
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        return res.status(403).send({ message: "You can't delete this cards" });
      }
      return Card.findByIdAndDelete(req.params.cardId);
    })
    .then(() => {
      res.send({ message: "Card deleted" });
    });
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
