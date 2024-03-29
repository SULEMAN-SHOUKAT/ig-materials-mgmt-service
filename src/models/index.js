const mongoose = require("mongoose");
const config = require("config");

const MaterialsModel = require("./Materials");
const ParametersModel = require("./Parameters");
const TextureModel = require("./Texture");
const ImagesModel = require("./Images");
const MappingsModel = require("./Mappings");
const MetaMaterialsModel = require("./MetaMaterials");
const MetaMaterialParametersModel = require("./MetaMaterialParameters");
const CategoriesModel = require("./Categories");

const connectDb = async () => {
  console.log("connecting to MongoDB", config.db.url);
  return mongoose
    .connect(config.db.url)
    .then(() => console.log("successfully connected to mongoDB"))
    .catch((error) => {
      console.error("failed to connect to mongoDB", error);
      setTimeout(connectDb, 5000);
    });
};

module.exports = {
  connectDb,
  MaterialsModel,
  ParametersModel,
  TextureModel,
  ImagesModel,
  MappingsModel,
  MetaMaterialsModel,
  MetaMaterialParametersModel,
  CategoriesModel,
};
