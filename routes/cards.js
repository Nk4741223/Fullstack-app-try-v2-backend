const router = require("express").Router();
const Card = require("../models/Card");

//カードを作成する
router.post("/", async (req, res) => {
  const newCard = new Card(req.body);
  try {
    const savedCard = await newCard.save();
    return res.status(200).json(savedCard);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//カードを全て取得する
router.get("/", async (req, res) => {
  try {
    const allCards = await Card.find({});
    return res.status(200).json(allCards);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//カードを１つ取得する
router.get("/:id", async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    return res.status(200).json(card);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//カードを更新する
router.put("/:id", async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    await card.updateOne({
      $set: req.body,
    });
    return res.status(200).json("カードの更新に成功しました");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//カードを削除する
router.delete("/:id", async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    await card.deleteOne();
    return res.status(200).json("カードの削除に成功しました");
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
