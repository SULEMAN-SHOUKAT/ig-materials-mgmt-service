const { ImagesModel } = require("../../models/index");

const saveImages = async (images) => {
  let imagesIds = [];
  for (const img of images) {
    const image = {
      name: img.originalname,
      type: img.mimetype,
      size: img.size,
      data: img.buffer,
    };
    const newImagesRecord = await ImagesModel.create(image);
    imagesIds.push(newImagesRecord._id);
  }
  return imagesIds;
};

const deleteByIds = (imageIds) =>
  ImagesModel.deleteMany({ _id: { $in: imageIds } });

module.exports = {
  saveImages,
  deleteByIds,
};
