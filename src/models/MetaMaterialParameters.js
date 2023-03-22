const mongoose = require("mongoose");

const MetaMaterialParametersSchema = new mongoose.Schema(
  {
    pk: {
      type: Number,
      required: true,
      unique: true,
    },
    key: {
      type: String,
      default: null,
    },
    value: {
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

MetaMaterialParametersSchema.index({ pk: 1 }, { unique: true });

const MetaMaterialParametersModel = mongoose.model(
  "meta-materials-parameters",
  MetaMaterialParametersSchema
);

module.exports = MetaMaterialParametersModel;
