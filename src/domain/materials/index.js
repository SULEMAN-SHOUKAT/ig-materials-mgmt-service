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

const getMaterials = () => MaterialsModel.find({}).sort({ createdAt: -1 });

const updateMaterial = (name, update) =>
  MaterialsModel.updateOne({ name }, { $set: { ...update } });

const removeMetaMaterial = (metaMaterial) =>
  MaterialsModel.updateMany({ metaMaterial }, { $set: { metaMaterial: null } });

module.exports = {
  createMaterial,
  findMaterialByName,
  getMaterials,
  deleteMaterials,
  updateMaterial,
  removeMetaMaterial,
};
