const { ObjectId } = require("mongodb");
const { TextureModel } = require("../../models/index");
const materialsDomain = require("../materials");
const parametersDomain = require("../parameters");
const imageHandlingDomain = require("../imageHandling");

const createTexture = async (name, images) => {
  const imagesIds = await imageHandlingDomain.saveImages(images);
  const newTexture = new TextureModel({
    name,
    images: imagesIds,
  });
  await newTexture.save();
  return newTexture;
};

const getTextures = () => TextureModel.find({});

const findTextureByName = async (name) => await TextureModel.findOne({ name });

const updateTexture = (name, update) =>
  TextureModel.updateOne({ name }, { $set: { ...update } });

const deleteTexture = async (name) => {
  const texture = await findTextureByName(name);
  if (!texture) {
    throw new Error(`Texture with name "${name}" not found`);
  }
  await imageHandlingDomain.deleteByIds(texture?.images);
  await materialsDomain.removeTexture(name);
  await parametersDomain.removeTexture(name);
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

const addImagesToTexture = async (name, images) => {
  const texture = await findTextureByName(name);
  if (!texture) {
    throw new Error(`Texture with name "${name}" not found`);
  }
  const imagesIds = await imageHandlingDomain.saveImages(images);
  texture.images.push(...imagesIds);
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

module.exports = {
  createTexture,
  getTextures,
  findTextureByName,
  updateTexture,
  deleteTextures,
  addImagesToTexture,
  deleteImageFromTexture,
};
