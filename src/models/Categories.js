const mongoose = require("mongoose");

const CategoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    material: {
      type: String,
    },
  },
  { timestamps: true, strict: true }
);

const CategoriesModel = mongoose.model("categories", CategoriesSchema);

module.exports = CategoriesModel;
