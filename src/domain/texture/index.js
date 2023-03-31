const { ObjectId } = require("mongodb");
const { TextureModel } = require("../../models/index");
const parametersDomain = require("../parameters");
const imageHandlingDomain = require("../imageHandling");
const materialParametersDomain = require("../meta-materials-parameters");

const createTexture = async (texture) => {
  const newTexture = new TextureModel(texture);
  await newTexture.save();
  return newTexture;
};

const getTextures = () => TextureModel.find({}).sort({ createdAt: -1 });

const findTextureByName = async (name) => await TextureModel.findOne({ name });

const updateTexture = (name, update) =>
  TextureModel.updateOne({ name }, { $set: { ...update } });

const deleteTexture = async (name) => {
  const texture = await findTextureByName(name);
  if (!texture) {
    throw new Error(`Texture with name "${name}" not found`);
  }
  await imageHandlingDomain.deleteByIds(texture?.images);
  await parametersDomain.removeTexture(name);
  await materialParametersDomain.removeTexture(name);
  return await TextureModel.deleteOne({ name });
};

const deleteTextures = async (names) => {
  let deletedCount = 0;
  for (const textureName of names) {
    const result = await deleteTexture(textureName);
    deletedCount = deletedCount + result.deletedCount;
  }
  return { deletedCount };
};

const addImageToTexture = async (name, mode, image) => {
  const texture = await findTextureByName(name);
  if (!texture) {
    throw new Error(`Texture with name "${name}" not found`);
  }
  const imageId = await imageHandlingDomain.saveImage(image, mode);
  texture.images.push(imageId);
  return await texture.save();
};

const deleteImageFromTexture = async (textureName, imageIds) => {
  const texture = await findTextureByName(textureName);
  if (!texture) {
    throw new Error(`Texture with name "${textureName}" not found`);
  }
  await texture.images.pull(...imageIds.map((id) => new ObjectId(id)));
  await imageHandlingDomain.deleteByIds(imageIds.map((id) => new ObjectId(id)));
  return texture.save();
};

const getTextureImages = async (name) => {
  const texture = await findTextureByName(name);
  if (!texture) {
    throw new Error(`Texture with name "${textureName}" not found`);
  }
  return imageHandlingDomain.getByIds(texture.images);
};

module.exports = {
  createTexture,
  getTextures,
  findTextureByName,
  updateTexture,
  deleteTextures,
  addImageToTexture,
  deleteImageFromTexture,
  getTextureImages,
};
