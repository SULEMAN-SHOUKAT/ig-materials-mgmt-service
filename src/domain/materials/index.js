const { MaterialsModel } = require("../../models/index");

const createMaterial = async (material) => {
  const newMaterial = await MaterialsModel.create(material);
  return newMaterial;
};

const deleteMaterials = async (names) =>
  MaterialsModel.deleteMany({ name: { $in: names } });

const findMaterialByName = (name) =>
  MaterialsModel.findOne({
    name: name,
  });

const getMaterials = () => MaterialsModel.find({});

const updateMaterial = (name, update) =>
  MaterialsModel.updateOne({ name }, { $set: { ...update } });

const removeTexture = (texture) =>
  MaterialsModel.updateMany({ texture }, { $set: { texture: null } });

const removeParameters = (parameters) =>
  MaterialsModel.updateMany({ parameters }, { $set: { parameters: null } });

const removeMapping = (mapping) =>
  MaterialsModel.updateMany({ mapping }, { $set: { mapping: null } });

const removeMetaMaterial = (metaMaterial) =>
  MaterialsModel.updateMany({ metaMaterial }, { $set: { metaMaterial: null } });

module.exports = {
  createMaterial,
  findMaterialByName,
  getMaterials,
  deleteMaterials,
  updateMaterial,
  removeTexture,
  removeParameters,
  removeMapping,
  removeMetaMaterial,
};
