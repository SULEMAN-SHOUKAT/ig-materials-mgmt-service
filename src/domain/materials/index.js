const { MaterialsModel } = require("../../models/index");

const createMaterial = async (material) => {
  const newMaterial = await MaterialsModel.create(material);
  return newMaterial;
};

const deleteMaterial = async (name) => MaterialsModel.deleteOne({ name });

const deleteMultipleMaterials = async (names) =>
  MaterialsModel.deleteMany({ name: { $in: names } });

const findMaterialByName = (name) =>
  MaterialsModel.findOne({
    name: name,
  });

const getMaterials = () => MaterialsModel.find({});

module.exports = {
  createMaterial,
  findMaterialByName,
  getMaterials,
  deleteMaterial,
  deleteMultipleMaterials,
};
