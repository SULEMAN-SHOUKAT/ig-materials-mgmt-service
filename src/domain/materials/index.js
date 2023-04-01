const { ObjectId } = require("mongodb");
const { MaterialsModel } = require("../../models/index");
const imageHandlingDomain = require("../imageHandling");
const createMaterial = async (material) => {
  const newMaterial = await MaterialsModel.create(material);
  return newMaterial;
};

const findMaterialByName = (name) =>
  MaterialsModel.findOne({
    name: name,
  });

const deleteMaterial = async (name) => {
  const material = await findMaterialByName(name);
  if (!material) {
    throw new Error(`Material with name "${name}" not found`);
  }
  await imageHandlingDomain.deleteByIds(material?.images);
  return await MaterialModel.deleteOne({ name });
};

const deleteMaterials = async (names) => {
  let deletedCount = 0;
  for (const materialName of names) {
    const result = await deleteMaterial(materialName);
    deletedCount = deletedCount + result.deletedCount;
  }
  return { deletedCount };
};

const getMaterials = () => MaterialsModel.find({}).sort({ createdAt: -1 });

const updateMaterial = (name, update) =>
  MaterialsModel.updateOne({ name }, { $set: { ...update } });

const addImageToMaterial = async (name, mode, image) => {
  const material = await findMaterialByName(name);
  if (!material) {
    throw new Error(`Material with name "${name}" not found`);
  }
  const imageId = await imageHandlingDomain.saveImage(image, mode);
  material.images.push(imageId);
  return await material.save();
};

const deleteImageFromMaterial = async (materialName, imageIds) => {
  const material = await findMaterialByName(materialName);
  if (!material) {
    throw new Error(`Material with name "${materialName}" not found`);
  }
  await material.images.pull(...imageIds.map((id) => new ObjectId(id)));
  await imageHandlingDomain.deleteByIds(imageIds.map((id) => new ObjectId(id)));
  return material.save();
};

const getMaterialImages = async (name) => {
  const material = await findMaterialByName(name);
  if (!material) {
    throw new Error(`Material with name "${materialName}" not found`);
  }
  return imageHandlingDomain.getByIds(material.images);
};

const removeMetaMaterial = (metaMaterial) =>
  MaterialsModel.updateMany({ metaMaterial }, { $set: { metaMaterial: null } });

module.exports = {
  createMaterial,
  findMaterialByName,
  getMaterials,
  deleteMaterials,
  updateMaterial,
  removeMetaMaterial,
  addImageToMaterial,
  deleteImageFromMaterial,
  getMaterialImages,
};
