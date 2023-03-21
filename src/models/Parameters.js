const mongoose = require("mongoose");

const ParametersSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    diffuseR: { type: Number, required: true, default: 1 },
    diffuseG: { type: Number, required: true, default: 1 },
    diffuseB: { type: Number, required: true, default: 1 },
    specularR: { type: Number, required: true, default: 0 },
    specularG: { type: Number, required: true, default: 0 },
    specularB: { type: Number, required: true, default: 0 },
    emissiveR: { type: Number, required: true, default: 0 },
    emissiveG: { type: Number, required: true, default: 0 },
    emissiveB: { type: Number, required: true, default: 0 },
    shininess: { type: Number, required: true, default: 0 },
    ambient: { type: Number, required: true, default: 0.4 },
    transparency: { type: Number, required: true, default: 0 },
    texture: { type: String, default: null },
    mapping: { type: String, default: null },
  },
  { timestamps: true }
);

ParametersSchema.index({ name: 1 }, { unique: true });

const ParametersModel = mongoose.model("parameters", ParametersSchema);

module.exports = ParametersModel;
