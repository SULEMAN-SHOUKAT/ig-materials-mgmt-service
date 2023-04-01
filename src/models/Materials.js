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
    metaMaterial: {
      type: String,
      default: null,
    },
    images: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
    ],
  },
  { timestamps: true, strict: true }
);

MaterialsSchema.index({ name: 1 }, { unique: true });

const MaterialsModel = mongoose.model("materials", MaterialsSchema);

module.exports = MaterialsModel;
