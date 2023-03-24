const { ObjectId } = require("mongodb");
const { MetaMaterialParametersModel } = require("../../models/index");

const create = async (metaMaterialParameters) => {
  const newMetaMaterialParameters = await MetaMaterialParametersModel.create(
    metaMaterialParameters
  );
  return newMetaMaterialParameters;
};

const findById = (id) =>
  MetaMaterialParametersModel.findOne({
    _id: new ObjectId(id),
  });
const getByMetaMaterialName = (metaMaterialName) =>
  MetaMaterialParametersModel.find({
    metaMaterial: metaMaterialName,
  });

const getAll = () => MetaMaterialParametersModel.find({});

const update = (id, update) =>
  MetaMaterialParametersModel.updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...update } }
  );

const remove = async (ids) =>
  await MetaMaterialParametersModel.deleteMany({
    _id: { $in: ids.map((id) => new ObjectId(id)) },
  });

const removeMetaMaterial = (metaMaterial) =>
  MetaMaterialParametersModel.updateMany(
    { metaMaterial },
    { $set: { metaMaterial: null } }
  );

const removeTexture = (texture) =>
  MetaMaterialParametersModel.updateMany(
    { texture },
    { $set: { texture: null } }
  );

const removeMapping = (mapping) =>
  MetaMaterialParametersModel.updateMany(
    { mapping },
    { $set: { mapping: null } }
  );

module.exports = {
  create,
  findById,
  getAll,
  update,
  remove,
  removeMetaMaterial,
  getByMetaMaterialName,
  removeTexture,
  removeMapping,
};
