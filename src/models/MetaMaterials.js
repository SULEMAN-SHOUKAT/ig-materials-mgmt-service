const mongoose = require("mongoose");

const MetaMaterialsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      default: null,
    },
  },
  { timestamps: true, strict: true }
);

const MetaMaterialsModel = mongoose.model(
  "meta-materials",
  MetaMaterialsSchema
);

module.exports = MetaMaterialsModel;
