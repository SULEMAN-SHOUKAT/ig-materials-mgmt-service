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

const getByIds = async (imageIds) => {
  let images = await ImagesModel.find({ _id: { $in: imageIds } }).sort({
    createdAt: -1,
  });
  let formattedImages =
    images.length > 0
      ? images.map((img) => {
          const buffer = Buffer.from(img.data);
          const base64 = buffer.toString("base64");
          const dataUrl = `data:image/jpeg;base64,${base64}`;
          return {
            _id: img._id,
            name: img.name,
            mode: img.mode,
            type: img.type,
            size: img.size,
            createdAt: img.createdAt,
            updatedAt: img.updatedAt,
            data: dataUrl,
          };
        })
      : [];

  return formattedImages;
};

module.exports = {
  saveImage,
  deleteByIds,
  getByIds,
};
