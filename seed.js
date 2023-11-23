const mongoose = require("mongoose");
const Card = require("./models/Card");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_HEROKU_URL || process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("seedデータの挿入のため、DBと接続中・・・");
  })
  .catch((err) => {
    console.log(err);
  });

const seedData = [
  { title: "レストラン東京", content: "12/25に予約してます" },
  { title: "レストラン大阪", content: "12/24に予約してます" },
  {
    title: "レストラン京都おおおおおおおおおおおおおおおおお",
    content: "12/23に予約してます",
  },
  { title: "レストラン名古屋", content: "12/22に予約してます" },
];

// async function seedDatabase() {
const seedDatabase = async (req, res) => {
  try {
    await Card.deleteMany({}); // 既存のデータをクリア
    await Card.insertMany(seedData); // データを挿入
    console.log("seedデータの挿入に成功しました");
  } catch (err) {
    console.log(err);
  }
  // finally {
  //   mongoose.disconnect();
  // }
};

seedDatabase();
