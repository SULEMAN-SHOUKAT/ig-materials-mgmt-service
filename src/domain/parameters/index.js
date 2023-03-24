const { ParametersModel } = require("../../models/index");

const createParameters = async (material) => {
  const newParameters = await ParametersModel.create(material);
  return newParameters;
};

const deleteParameters = async (names) =>
  ParametersModel.deleteMany({ name: { $in: names } });

const findParametersByName = (name) =>
  ParametersModel.findOne({
    name: name,
  });

const getParameters = () => ParametersModel.find({});

const updateParameters = (name, update) =>
  ParametersModel.updateOne({ name }, { $set: { ...update } });

const removeTexture = (texture) =>
  ParametersModel.updateMany({ texture }, { $set: { texture: null } });

const removeMapping = (mapping) =>
  ParametersModel.updateMany({ mapping }, { $set: { mapping: null } });

module.exports = {
  createParameters,
  findParametersByName,
  deleteParameters,
  getParameters,
  updateParameters,
  removeTexture,
  removeMapping,
};
