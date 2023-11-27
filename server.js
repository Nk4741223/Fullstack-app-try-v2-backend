const express = require("express");
const app = express();
const cardRouter = require("./routes/cards");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;
require("dotenv").config();

//CROS対策
const cors = require("cors");
const { deleteOne } = require("./models/Card");
app.use(cors());

//データベース接続
mongoose
  .connect(process.env.MONGO_HEROKU_URL || process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DBと接続中・・・");
  })
  .catch((err) => {
    console.log(err);
  });

//ミドルウェア
app.use(express.json());
app.use("/api/cards", cardRouter);

//表示を確認
app.get("/", (req, res) => {
  res.status(200).json("home express");
});

const server = app.listen(PORT, () => {
  console.log("サーバーが起動しました");
});

module.exports = { app, server };
