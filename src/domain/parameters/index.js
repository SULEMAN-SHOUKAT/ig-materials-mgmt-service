const { ParametersModel } = require("../../models/index");
const materialsDomain = require("../materials");

const createParameters = async (material) => {
  const newParameters = await ParametersModel.create(material);
  return newParameters;
};

const deleteParameters = async (name) => {
  await materialsDomain.removeParameters(name);
  return await ParametersModel.deleteOne({ name });
};

const deleteMultipleParameters = async (names) => {
  for (const name of names) {
    await materialsDomain.removeParameters(name);
  }
  return await ParametersModel.deleteMany({ name: { $in: names } });
};

const findParametersByName = (name) =>
  ParametersModel.findOne({
    name: name,
  });

const getParameters = () => ParametersModel.find({});

const updateParameters = (name, update) =>
  ParametersModel.updateOne({ name }, { $set: { ...update } });

const removeTexture = (texture) =>
  ParametersModel.updateMany({ texture }, { $set: { texture: null } });

module.exports = {
  createParameters,
  findParametersByName,
  deleteMultipleParameters,
  deleteParameters,
  getParameters,
  updateParameters,
  removeTexture,
};
