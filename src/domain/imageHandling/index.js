const { ImagesModel } = require("../../models/index");

const saveImages = async (images, textureName) => {
  let imagesIds = [];
  for (const img of images) {
    const image = {
      name: img.originalname,
      textureName,
      fieldName: img.fieldname,
      encoding: img.encoding,
      mimetype: img.mimetype,
      size: img.size,
      data: img.buffer,
    };
    const newImagesRecord = await ImagesModel.create(image);
    imagesIds.push(newImagesRecord._id);
  }
  return imagesIds;
};

const deleteImagesByTextureName = (textureName) =>
  ImagesModel.deleteMany({ textureName });

module.exports = {
  saveImages,
  deleteImagesByTextureName,
};
