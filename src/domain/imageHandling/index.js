const { ImagesModel } = require("../../models/index");

const saveImage = async (img, mode) => {
  const image = {
    name: img.originalname,
    mode: mode,
    type: img.mimetype,
    size: img.size,
    data: img.buffer,
  };
  const newImagesRecord = await ImagesModel.create(image);
  return newImagesRecord._id;
};

const deleteByIds = (imageIds) =>
  ImagesModel.deleteMany({ _id: { $in: imageIds } });

const getByIds = (imageIds) => ImagesModel.find({ _id: { $in: imageIds } });

module.exports = {
  saveImage,
  deleteByIds,
  getByIds,
};
