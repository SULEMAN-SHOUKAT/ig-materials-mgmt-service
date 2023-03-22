const mongoose = require("mongoose");

const MappingsSchema = new mongoose.Schema(
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
    translationS: {
      type: String,
      default: null,
    },
    translationT: {
      type: String,
      default: null,
    },
    rotation: {
      type: String,
      default: null,
    },
    scaleS: {
      type: String,
      default: null,
    },
    scaleT: {
      type: String,
      default: null,
    },
  },
  { timestamps: true, strict: true }
);

const MappingsModel = mongoose.model("mappings", MappingsSchema);

module.exports = MappingsModel;
