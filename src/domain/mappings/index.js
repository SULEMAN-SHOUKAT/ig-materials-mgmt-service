const { MappingsModel } = require("../../models/index");
const materialsDomain = require("../materials");
const parametersDomain = require("../parameters");

const createMapping = async (mapping) => {
  const newMapping = await MappingsModel.create(mapping);
  return newMapping;
};

const deleteMappings = async (names) => {
  for (const name of names) {
    await materialsDomain.removeMapping(name);
    await parametersDomain.removeMapping(name);
  }
  return await MappingsModel.deleteMany({ name: { $in: names } });
};

const findMappingByName = (name) =>
  MappingsModel.findOne({
    name: name,
  });

const getMappings = () => MappingsModel.find({});

const updateMapping = (name, update) =>
  MappingsModel.updateOne({ name }, { $set: { ...update } });

module.exports = {
  createMapping,
  findMappingByName,
  getMappings,
  updateMapping,
  deleteMappings,
};
