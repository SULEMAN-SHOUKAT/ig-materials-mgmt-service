const mongoose = require("mongoose");

const MaterialsSchema = new mongoose.Schema(
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
    resource: {
      type: String,
      default: null,
    },
    metaMaterial: {
      type: String,
      default: null,
    },
    texture: {
      type: String,
      default: null,
    },
    parameters: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

MaterialsSchema.index({ name: 1 }, { unique: true });

const MaterialsModel = mongoose.model("materials", MaterialsSchema);

module.exports = MaterialsModel;
