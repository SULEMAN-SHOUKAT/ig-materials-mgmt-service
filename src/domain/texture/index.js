const { TextureModel } = require("../../models/index");
const materialsDomain = require("../materials");
const parametersDomain = require("../parameters");
const imageHandlingDomain = require("../imageHandling");

const createTexture = async (name, images) => {
  const imagesIds = await imageHandlingDomain.saveImages(images, name);
  const newTexture = new TextureModel({
    name,
    images: imagesIds,
  });
  await newTexture.save();
  return newTexture;
};

const getTextures = () => TextureModel.find({});

const findTextureByName = (name) => TextureModel.find({ name });

const updateTexture = (name, update) =>
  TextureModel.updateOne({ name }, { $set: { ...update } });

const deleteTexture = async (name) => {
  await imageHandlingDomain.deleteImagesByTextureName(name);
  await materialsDomain.removeTexture(name);
  await parametersDomain.removeTexture(name);
  return await TextureModel.deleteOne({ name });
};

const deleteMultipleTextures = async (names) => {
  for (const textureName of names) {
    await imageHandlingDomain.deleteImagesByTextureName(textureName);
    await materialsDomain.removeTexture(textureName);
    await parametersDomain.removeTexture(textureName);
  }
  return await TextureModel.deleteMany({ name: { $in: names } });
};

module.exports = {
  createTexture,
  getTextures,
  findTextureByName,
  updateTexture,
  deleteTexture,
  deleteMultipleTextures,
};
