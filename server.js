const { application } = require("express");
const express = require("express");
const app = express();
const cardRouter = require("./routes/cards");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;
require("dotenv").config();

//CROS対策
const cors = require("cors");
app.use(cors());

//データベース接続
mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log("DBと接続中・・・");
  })
  .catch((err) => {
    console.log(err);
  });

//ミドルウェア
app.use(express.json());
app.use("/api/cards", cardRouter);

//http://localhost:5000で表示を確認
app.get("/", (req, res) => {
  res.send("home express");
});

app.listen(PORT, () => console.log("サーバーが起動しました"));
