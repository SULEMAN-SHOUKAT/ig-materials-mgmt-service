const { MetaMaterialParametersModel } = require("../../models/index");

const create = async (metaMaterialParameters) => {
  const newMetaMaterialParameters = await MetaMaterialParametersModel.create(
    metaMaterialParameters
  );
  return newMetaMaterialParameters;
};

const findByKey = (pk) =>
  MetaMaterialParametersModel.findOne({
    pk: pk,
  });

const getAll = () => MetaMaterialParametersModel.find({});

const update = (pk, update) =>
  MetaMaterialParametersModel.updateOne({ pk: pk }, { $set: { ...update } });

const remove = async (pks) =>
  await MetaMaterialParametersModel.deleteMany({ pk: { $in: pks } });

const removeMetaMaterial = (metaMaterial) =>
  MetaMaterialParametersModel.updateMany(
    { metaMaterial },
    { $set: { metaMaterial: null } }
  );

module.exports = {
  create,
  findByKey,
  getAll,
  update,
  remove,
  removeMetaMaterial,
};
