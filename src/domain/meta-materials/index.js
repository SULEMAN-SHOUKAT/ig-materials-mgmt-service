const { MetaMaterialsModel } = require("../../models/index");
const materialsDomain = require("../materials");
const metaMaterialParametersDomain = require("../meta-materials-parameters");

const createMetaMaterial = async (metaMaterial) => {
  const newMetaMaterial = await MetaMaterialsModel.create(metaMaterial);
  return newMetaMaterial;
};

const findMetaMaterialByName = (name) =>
  MetaMaterialsModel.findOne({
    name: name,
  });

const getMetaMaterials = () =>
  MetaMaterialsModel.find({}).sort({ createdAt: -1 });

const updateMetaMaterial = (name, update) =>
  MetaMaterialsModel.updateOne({ name }, { $set: { ...update } });

const removeMetaMaterials = async (names) => {
  for (const name of names) {
    await materialsDomain.removeMetaMaterial(name);
    await metaMaterialParametersDomain.removeMetaMaterial(name);
  }
  return await MetaMaterialsModel.deleteMany({ name: { $in: names } });
};

module.exports = {
  createMetaMaterial,
  findMetaMaterialByName,
  getMetaMaterials,
  updateMetaMaterial,
  removeMetaMaterials,
};
