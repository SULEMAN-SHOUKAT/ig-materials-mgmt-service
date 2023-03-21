const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  textureName: {
    type: String,
  },
  fieldName: {
    type: String,
  },
  encoding: {
    type: String,
  },
  mimetype: {
    type: String,
  },
  size: {
    type: Number,
  },
  data: {
    type: Buffer,
    required: true,
  },
});

ImageSchema.path("name").validate(function (value) {
  const extension = value.substring(value.lastIndexOf(".") + 1);
  return (
    extension === "jpg" ||
    extension === "png" ||
    extension === "JPG" ||
    extension === "PNG"
  );
}, "Only JPG and PNG images are allowed");

const ImagesModel = mongoose.model("images", ImageSchema);

module.exports = ImagesModel;
