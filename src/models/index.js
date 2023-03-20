const mongoose = require("mongoose");
const config = require("config");

const MaterialsModel = require("./Materials");

const connectDb = async () => {
  console.log("connecting to MongoDB");
  return mongoose
    .connect(config.db.url)
    .then(() => console.log("successfully connected to mongoDB"))
    .catch((error) => console.error("failed to connect to mongoDB", error));
};

module.exports = { connectDb, MaterialsModel };
