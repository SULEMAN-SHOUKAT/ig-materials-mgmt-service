const mongoose = require("mongoose");

const TextureSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    images: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

TextureSchema.index({ name: 1 }, { unique: true });

const TextureModel = mongoose.model("texture", TextureSchema);

module.exports = TextureModel;
