const mongoose = require("mongoose");

const MetaMaterialParametersSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      default: null,
    },
    value: {
      type: String,
      default: null,
    },
    texture: {
      type: String,
      default: null,
    },
    mapping: {
      type: String,
      default: null,
    },
    metaMaterial: {
      type: String,
      default: null,
    },
  },
  { timestamps: true, strict: true }
);

const MetaMaterialParametersModel = mongoose.model(
  "meta-materials-parameters",
  MetaMaterialParametersSchema
);

module.exports = MetaMaterialParametersModel;
